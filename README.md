# Tic Tac Toe

Next.js (App Router) + React + TypeScript + Tailwind CSS + Framer Motion + Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (Vercel-ready)
```

- Player vs Player, or Player vs Computer (Easy: random, Medium: win/block/center with some randomness, Hard: unbeatable Minimax with alpha-beta pruning).
- Game logic lives in `lib/game.ts`, state in `hooks/useTicTacToe.ts`, sound (Web Audio, no files) in `lib/sound.ts`.
- Keyboard: Tab to a cell, arrow keys move between cells, Enter/Space plays.
