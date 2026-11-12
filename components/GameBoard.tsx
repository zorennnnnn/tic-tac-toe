import { useRef } from "react";
import type { KeyboardEvent } from "react";
import type { Board } from "@/lib/game";
import type { Status } from "@/hooks/useTicTacToe";
import GameCell from "./GameCell";

interface Props {
  board: Board;
  line: number[] | null;
  status: Status;
  locked: boolean; // computer's turn
  onSelect: (index: number) => void;
}

export default function GameBoard({ board, line, status, locked, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Arrow keys move focus between cells (wraps around).
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cell]");
    if (!target) return;
    const i = Number(target.dataset.cell);
    let row = Math.floor(i / 3);
    let col = i % 3;
    switch (e.key) {
      case "ArrowUp": row = (row + 2) % 3; break;
      case "ArrowDown": row = (row + 1) % 3; break;
      case "ArrowLeft": col = (col + 2) % 3; break;
      case "ArrowRight": col = (col + 1) % 3; break;
      default: return;
    }
    e.preventDefault();
    ref.current?.querySelector<HTMLElement>(`[data-cell="${row * 3 + col}"]`)?.focus();
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Game board"
      onKeyDown={onKeyDown}
      className="mx-auto grid w-full max-w-[26rem] grid-cols-3 gap-2.5 rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/40 sm:gap-3 sm:p-4"
    >
      {board.map((value, i) => {
        const isWinning = !!line?.includes(i);
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        return (
          <GameCell
            key={i}
            index={i}
            value={value}
            isWinning={isWinning}
            dimmed={status !== "playing" && !isWinning && status === "won"}
            disabled={value !== null || status !== "playing" || locked}
            label={`Row ${row}, column ${col}, ${value ?? "empty"}`}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
