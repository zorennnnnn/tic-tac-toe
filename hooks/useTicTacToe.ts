"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  Board, Difficulty, Mode, Player,
  emptyBoard, getWinner, isFull, other, pickMove,
} from "@/lib/game";
import { playDraw, playMove, playWin } from "@/lib/sound";

export type Status = "playing" | "won" | "draw";
export interface Scores { X: number; O: number; draws: number }

interface State {
  board: Board;
  turn: Player;
  status: Status;
  winner: Player | null;
  line: number[] | null;
  lastMove: { index: number; mark: Player } | null;
  scores: Scores;
  mode: Mode;
  difficulty: Difficulty;
  humanMark: Player;
  names: { p1: string; p2: string };
}

type Action =
  | { type: "MOVE"; index: number }
  | { type: "RESTART_ROUND" }
  | { type: "NEW_GAME" }
  | { type: "RESET_SCORES" }
  | { type: "SET_MODE"; mode: Mode }
  | { type: "SET_DIFFICULTY"; difficulty: Difficulty }
  | { type: "SET_HUMAN_MARK"; mark: Player }
  | { type: "SET_NAME"; which: "p1" | "p2"; name: string };

const zeroScores: Scores = { X: 0, O: 0, draws: 0 };

const freshRound = () => ({
  board: emptyBoard(),
  turn: "X" as Player,
  status: "playing" as Status,
  winner: null,
  line: null,
  lastMove: null,
});

const initialState: State = {
  ...freshRound(),
  scores: zeroScores,
  mode: "pvp",
  difficulty: "medium",
  humanMark: "X",
  names: { p1: "Player 1", p2: "Player 2" },
};

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "MOVE": {
      if (s.status !== "playing" || s.board[a.index] !== null) return s;
      const board = [...s.board];
      board[a.index] = s.turn;
      const lastMove = { index: a.index, mark: s.turn };
      const result = getWinner(board);
      if (result) {
        return {
          ...s, board, lastMove, status: "won", winner: result.winner, line: result.line,
          scores: { ...s.scores, [result.winner]: s.scores[result.winner] + 1 },
        };
      }
      if (isFull(board)) {
        return { ...s, board, lastMove, status: "draw", scores: { ...s.scores, draws: s.scores.draws + 1 } };
      }
      return { ...s, board, lastMove, turn: other(s.turn) };
    }
    case "RESTART_ROUND":
      return { ...s, ...freshRound() };
    case "NEW_GAME":
      return { ...s, ...freshRound(), scores: zeroScores };
    case "RESET_SCORES":
      return { ...s, scores: zeroScores };
    case "SET_MODE":
      return a.mode === s.mode ? s : { ...s, ...freshRound(), scores: zeroScores, mode: a.mode };
    case "SET_DIFFICULTY":
      return a.difficulty === s.difficulty ? s : { ...s, ...freshRound(), difficulty: a.difficulty };
    case "SET_HUMAN_MARK":
      return a.mark === s.humanMark ? s : { ...s, ...freshRound(), scores: zeroScores, humanMark: a.mark };
    case "SET_NAME":
      return { ...s, names: { ...s.names, [a.which]: a.name } };
  }
}

export function useTicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(muted);

  const cpuMark: Player | null = state.mode === "cpu" ? other(state.humanMark) : null;
  const isCpuTurn = cpuMark !== null && state.status === "playing" && state.turn === cpuMark;

  const nameOf = useCallback(
    (mark: Player): string => {
      if (state.mode === "cpu") {
        return mark === state.humanMark ? state.names.p1.trim() || "Player 1" : "Computer";
      }
      return mark === "X" ? state.names.p1.trim() || "Player 1" : state.names.p2.trim() || "Player 2";
    },
    [state.mode, state.humanMark, state.names],
  );

  // Computer move: one timer per position; cleanup prevents duplicate moves.
  useEffect(() => {
    if (!isCpuTurn || cpuMark === null) return;
    const timer = setTimeout(
      () => dispatch({ type: "MOVE", index: pickMove(state.board, cpuMark, state.difficulty) }),
      550,
    );
    return () => clearTimeout(timer);
  }, [isCpuTurn, cpuMark, state.board, state.difficulty]);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    const move = state.lastMove;
    if (!move || mutedRef.current) return;
    if (state.status === "won") playWin();
    else if (state.status === "draw") playDraw();
    else playMove(move.mark);
  }, [state.lastMove, state.status]);

  const selectCell = useCallback(
    (index: number) => {
      if (state.status !== "playing" || isCpuTurn) return;
      dispatch({ type: "MOVE", index });
    },
    [state.status, isCpuTurn],
  );

  return {
    state,
    cpuMark,
    isCpuTurn,
    nameOf,
    muted,
    toggleMute: () => setMuted((m) => !m),
    selectCell,
    restartRound: () => dispatch({ type: "RESTART_ROUND" }),
    newGame: () => dispatch({ type: "NEW_GAME" }),
    resetScores: () => dispatch({ type: "RESET_SCORES" }),
    setMode: (mode: Mode) => dispatch({ type: "SET_MODE", mode }),
    setDifficulty: (difficulty: Difficulty) => dispatch({ type: "SET_DIFFICULTY", difficulty }),
    setHumanMark: (mark: Player) => dispatch({ type: "SET_HUMAN_MARK", mark }),
    setName: (which: "p1" | "p2", name: string) => dispatch({ type: "SET_NAME", which, name }),
  };
}
