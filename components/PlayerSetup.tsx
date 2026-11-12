import type { Mode, Player } from "@/lib/game";
import Panel from "./Panel";
import Segmented from "./Segmented";

interface Props {
  mode: Mode;
  humanMark: Player;
  names: { p1: string; p2: string };
  onName: (which: "p1" | "p2", name: string) => void;
  onHumanMark: (mark: Player) => void;
}

function NameField({
  id, label, value, onChange, accent,
}: { id: string; label: string; value: string; onChange: (v: string) => void; accent: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-white/60">{label}</label>
      <input
        id={id}
        value={value}
        maxLength={14}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 ${accent}`}
      />
    </div>
  );
}

export default function PlayerSetup({ mode, humanMark, names, onName, onHumanMark }: Props) {
  return (
    <Panel title="Players">
      <div className="space-y-3">
        {mode === "cpu" && (
          <div>
            <p className="mb-1 text-sm text-white/60">You play as</p>
            <Segmented<Player>
              label="Choose your mark"
              value={humanMark}
              onChange={onHumanMark}
              options={[
                { value: "X", label: "X (goes first)" },
                { value: "O", label: "O" },
              ]}
            />
          </div>
        )}
        <NameField
          id="name-p1"
          label={mode === "pvp" ? "Player 1 name (X)" : `Your name (${humanMark})`}
          value={names.p1}
          onChange={(v) => onName("p1", v)}
          accent={mode === "pvp" || humanMark === "X" ? "focus-visible:ring-x" : "focus-visible:ring-o"}
        />
        {mode === "pvp" && (
          <NameField
            id="name-p2"
            label="Player 2 name (O)"
            value={names.p2}
            onChange={(v) => onName("p2", v)}
            accent="focus-visible:ring-o"
          />
        )}
      </div>
    </Panel>
  );
}
