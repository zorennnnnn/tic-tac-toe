import { motion, AnimatePresence } from "framer-motion";
import type { Scores } from "@/hooks/useTicTacToe";
import Panel from "./Panel";

function Tile({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className={`rounded-2xl border bg-black/25 p-3 text-center ${tone}`}>
      <div className="h-8 overflow-hidden text-2xl font-bold tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={value}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-1 truncate text-xs text-white/60">{label}</div>
    </div>
  );
}

export default function ScoreBoard({
  scores, names,
}: { scores: Scores; names: { X: string; O: string } }) {
  return (
    <Panel title="Scoreboard">
      <div className="grid grid-cols-3 gap-2" aria-live="polite">
        <Tile label={`${names.X} (X) wins`} value={scores.X} tone="border-x/40 text-x" />
        <Tile label={`${names.O} (O) wins`} value={scores.O} tone="border-o/40 text-o" />
        <Tile label="Draws" value={scores.draws} tone="border-white/15 text-white" />
      </div>
    </Panel>
  );
}
