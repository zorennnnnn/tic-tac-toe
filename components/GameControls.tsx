import { Eraser, Plus, RotateCcw, Volume2, VolumeX } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  muted: boolean;
  onRestart: () => void;
  onNewGame: () => void;
  onResetScores: () => void;
  onToggleMute: () => void;
}

function Btn({
  onClick, children, pressed,
}: { onClick: () => void; children: ReactNode; pressed?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/15 hover:text-white active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      {children}
    </button>
  );
}

export default function GameControls({ muted, onRestart, onNewGame, onResetScores, onToggleMute }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Btn onClick={onRestart}><RotateCcw size={16} aria-hidden="true" />Restart round</Btn>
      <Btn onClick={onNewGame}><Plus size={16} aria-hidden="true" />New game</Btn>
      <Btn onClick={onResetScores}><Eraser size={16} aria-hidden="true" />Reset scores</Btn>
      <Btn onClick={onToggleMute} pressed={muted}>
        {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
        {muted ? "Unmute" : "Mute"}
      </Btn>
    </div>
  );
}
