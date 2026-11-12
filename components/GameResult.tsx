import { AnimatePresence, motion } from "framer-motion";
import { Handshake, Trophy } from "lucide-react";
import type { Player } from "@/lib/game";
import type { Status } from "@/hooks/useTicTacToe";

interface Props {
  status: Status;
  winner: Player | null;
  winnerName: string;
  winnerIsComputer: boolean;
  onPlayAgain: () => void;
}

export default function GameResult({ status, winner, winnerName, winnerIsComputer, onPlayAgain }: Props) {
  const won = status === "won" && winner;
  const tone = won
    ? winner === "X"
      ? "border-x/50 shadow-[0_0_40px_rgba(56,225,255,0.25)]"
      : "border-o/50 shadow-[0_0_40px_rgba(255,93,143,0.25)]"
    : "border-white/20";

  return (
    <div aria-live="polite" className="min-h-[1px]">
      <AnimatePresence>
        {status !== "playing" && (
          <motion.div
            key={status + winner}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={`mt-4 rounded-3xl border bg-white/[0.06] p-5 text-center backdrop-blur ${tone}`}
          >
            <motion.div
              initial={{ rotate: -20, scale: 0.4 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}
              className={`mx-auto mb-2 w-fit ${won ? (winner === "X" ? "text-x" : "text-o") : "text-white/70"}`}
            >
              {won ? <Trophy size={34} aria-hidden="true" /> : <Handshake size={34} aria-hidden="true" />}
            </motion.div>
            <h3 className="text-xl font-bold">{won ? `${winnerName} wins!` : "It's a Draw!"}</h3>
            <p className="mt-1 text-sm text-white/65">
              {won
                ? winnerIsComputer
                  ? "The computer takes this round. Ready for a rematch?"
                  : `Congratulations, ${winnerName}! Great game.`
                : "Nobody wins this one. Play another round?"}
            </p>
            <button
              type="button"
              onClick={onPlayAgain}
              className="mt-4 rounded-2xl bg-white px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-white/85 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Play again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
