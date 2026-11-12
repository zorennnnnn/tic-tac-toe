import { Bot, Users } from "lucide-react";
import type { Mode } from "@/lib/game";
import Panel from "./Panel";
import Segmented from "./Segmented";

export default function GameModeSelector({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <Panel title="Game mode">
      <Segmented<Mode>
        label="Game mode"
        value={mode}
        onChange={onChange}
        options={[
          { value: "pvp", label: "Two players", icon: <Users size={16} aria-hidden="true" /> },
          { value: "cpu", label: "Vs computer", icon: <Bot size={16} aria-hidden="true" /> },
        ]}
      />
    </Panel>
  );
}
