import { motion } from "framer-motion";
import type { Cell, Player } from "@/lib/game";

const draw = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.28, ease: "easeOut" },
} as const;

function Mark({ mark }: { mark: Player }) {
  if (mark === "X") {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={10}
        strokeLinecap="round" className="h-3/5 w-3/5 text-x drop-shadow-[0_0_12px_rgba(56,225,255,0.7)]">
        <motion.path d="M24 24 L76 76" {...draw} />
        <motion.path d="M76 24 L24 76" {...draw} transition={{ ...draw.transition, delay: 0.12 }} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={10}
      strokeLinecap="round" className="h-3/5 w-3/5 text-o drop-shadow-[0_0_12px_rgba(255,93,143,0.7)]">
      <motion.circle cx={50} cy={50} r={28} {...draw} />
    </svg>
  );
}

const WIN_STYLE: Record<Player, string> = {
  X: "border-x bg-x/15 shadow-[0_0_30px_rgba(56,225,255,0.5)]",
  O: "border-o bg-o/15 shadow-[0_0_30px_rgba(255,93,143,0.5)]",
};

interface Props {
  index: number;
  value: Cell;
  isWinning: boolean;
  dimmed: boolean;
  disabled: boolean;
  label: string;
  onSelect: (index: number) => void;
}

export default function GameCell({ index, value, isWinning, dimmed, disabled, label, onSelect }: Props) {
  const style = isWinning && value
    ? WIN_STYLE[value]
    : `border-white/10 bg-white/[0.04] ${disabled ? "" : "hover:border-white/30 hover:bg-white/10"}`;

  return (
    <motion.button
      type="button"
      data-cell={index}
      aria-label={label}
      aria-disabled={disabled}
      onClick={() => !disabled && onSelect(index)}
      animate={isWinning ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.5, delay: isWinning ? 0.15 : 0 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      className={`flex aspect-square items-center justify-center rounded-2xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${style} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${dimmed ? "opacity-45" : ""}`}
    >
      {value && <Mark mark={value} />}
    </motion.button>
  );
}
