"use client";

import { MotionConfig } from "framer-motion";
import DifficultySelector from "@/components/DifficultySelector";
import GameBoard from "@/components/GameBoard";
import GameControls from "@/components/GameControls";
import GameModeSelector from "@/components/GameModeSelector";
import GameResult from "@/components/GameResult";
import PlayerSetup from "@/components/PlayerSetup";
import ScoreBoard from "@/components/ScoreBoard";
import TurnIndicator from "@/components/TurnIndicator";
import { useTicTacToe } from "@/hooks/useTicTacToe";

export default function Page() {
  const g = useTicTacToe();
  const { state } = g;
  const names = { X: g.nameOf("X"), O: g.nameOf("O") };

  return (
    <MotionConfig reducedMotion="user">
      <main className="mx-auto min-h-dvh w-full max-w-5xl px-4 py-8 sm:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-[0.18em] sm:text-5xl">TIC TAC TOE</h1>
          <p className="mt-2 text-white/60">Challenge your mind. Make your move.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start">
          <div className="space-y-4">
            <TurnIndicator turn={state.turn} status={state.status} names={names} thinking={g.isCpuTurn} />
            <GameBoard
              board={state.board}
              line={state.line}
              status={state.status}
              locked={g.isCpuTurn}
              onSelect={g.selectCell}
            />
            <GameResult
              status={state.status}
              winner={state.winner}
              winnerName={state.winner ? names[state.winner] : ""}
              winnerIsComputer={state.winner !== null && state.winner === g.cpuMark}
              onPlayAgain={g.restartRound}
            />
            <div className="mx-auto max-w-[26rem]">
              <GameControls
                muted={g.muted}
                onRestart={g.restartRound}
                onNewGame={g.newGame}
                onResetScores={g.resetScores}
                onToggleMute={g.toggleMute}
              />
            </div>
          </div>

          <div className="space-y-4">
            <ScoreBoard scores={state.scores} names={names} />
            <GameModeSelector mode={state.mode} onChange={g.setMode} />
            {state.mode === "cpu" && (
              <DifficultySelector difficulty={state.difficulty} onChange={g.setDifficulty} />
            )}
            <PlayerSetup
              mode={state.mode}
              humanMark={state.humanMark}
              names={state.names}
              onName={g.setName}
              onHumanMark={g.setHumanMark}
            />
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}
