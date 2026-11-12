import type { Difficulty } from "@/lib/game";
import Panel from "./Panel";
import Segmented from "./Segmented";

const HINTS: Record<Difficulty, string> = {
  easy: "The computer plays random moves.",
  medium: "Mixes smart and random moves. Beatable.",
  hard: "Minimax AI. The best you can get is a draw.",
};

export default function DifficultySelector({
  difficulty, onChange,
}: { difficulty: Difficulty; onChange: (d: Difficulty) => void }) {
  return (
    <Panel title="Difficulty">
      <Segmented<Difficulty>
        label="Difficulty"
        value={difficulty}
        onChange={onChange}
        options={[
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "hard", label: "Hard" },
        ]}
      />
      <p className="mt-3 text-sm text-white/55">{HINTS[difficulty]}</p>
    </Panel>
  );
}
