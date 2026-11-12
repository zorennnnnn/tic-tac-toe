import type { Player } from "@/lib/game";
import type { Status } from "@/hooks/useTicTacToe";

interface Props {
  turn: Player;
  status: Status;
  names: { X: string; O: string };
  thinking: boolean;
}

const ACTIVE: Record<Player, string> = {
  X: "border-x/70 text-x shadow-[0_0_26px_rgba(56,225,255,0.35)] bg-x/10",
  O: "border-o/70 text-o shadow-[0_0_26px_rgba(255,93,143,0.35)] bg-o/10",
};

export default function TurnIndicator({ turn, status, names, thinking }: Props) {
  const text =
    status !== "playing" ? "Round over" : thinking ? `${names[turn]} is thinking…` : `${names[turn]}'s turn`;
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        {(["X", "O"] as const).map((mark) => {
          const active = status === "playing" && turn === mark;
          return (
            <div
              key={mark}
              aria-current={active ? "true" : undefined}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold transition duration-300 ${
                active ? ACTIVE[mark] : "border-white/10 text-white/40"
              }`}
            >
              <span className="text-lg font-extrabold">{mark}</span>
              <span className="truncate">{names[mark]}</span>
            </div>
          );
        })}
      </div>
      <p className="text-center text-sm text-white/65" role="status" aria-live="polite">{text}</p>
    </div>
  );
}
