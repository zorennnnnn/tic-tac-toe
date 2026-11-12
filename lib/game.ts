export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];
export type Mode = "pvp" | "cpu";
export type Difficulty = "easy" | "medium" | "hard";

export const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const;

export const emptyBoard = (): Board => Array<Cell>(9).fill(null);
export const other = (p: Player): Player => (p === "X" ? "O" : "X");

export function getWinner(board: Board): { winner: Player; line: number[] } | null {
  for (const [a, b, c] of WIN_LINES) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return { winner: v, line: [a, b, c] };
  }
  return null;
}

export const emptyCells = (board: Board): number[] =>
  board.flatMap((c, i) => (c === null ? [i] : []));

export const isFull = (board: Board): boolean => board.every((c) => c !== null);

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

function minimax(
  board: Board, turn: Player, ai: Player, depth: number, alpha: number, beta: number,
): number {
  const result = getWinner(board);
  if (result) return result.winner === ai ? 10 - depth : depth - 10;
  const empties = emptyCells(board);
  if (empties.length === 0) return 0;

  const maximizing = turn === ai;
  let best = maximizing ? -Infinity : Infinity;
  for (const i of empties) {
    board[i] = turn;
    const score = minimax(board, other(turn), ai, depth + 1, alpha, beta);
    board[i] = null;
    if (maximizing) {
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);
    } else {
      best = Math.min(best, score);
      beta = Math.min(beta, best);
    }
    if (beta <= alpha) break;
  }
  return best;
}

/** Optimal move via Minimax (ties broken randomly so games vary). */
export function bestMove(board: Board, ai: Player): number {
  const empties = emptyCells(board);
  if (empties.length === 9) return pick([0, 2, 4, 6, 8]);

  const work = [...board];
  let bestScore = -Infinity;
  let moves: number[] = [];
  for (const i of empties) {
    work[i] = ai;
    const score = minimax(work, other(ai), ai, 1, -Infinity, Infinity);
    work[i] = null;
    if (score > bestScore) { bestScore = score; moves = [i]; }
    else if (score === bestScore) moves.push(i);
  }
  return pick(moves);
}

function findWinningMove(board: Board, mark: Player): number | null {
  for (const i of emptyCells(board)) {
    const test = [...board];
    test[i] = mark;
    if (getWinner(test)) return i;
  }
  return null;
}

function mediumMove(board: Board, ai: Player): number {
  const empties = emptyCells(board);
  if (Math.random() < 0.3) return pick(empties);
  const win = findWinningMove(board, ai);
  if (win !== null) return win;
  const block = findWinningMove(board, other(ai));
  if (block !== null) return block;
  if (board[4] === null) return 4;
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  return corners.length ? pick(corners) : pick(empties);
}

export function pickMove(board: Board, ai: Player, difficulty: Difficulty): number {
  if (difficulty === "easy") return pick(emptyCells(board));
  if (difficulty === "medium") return mediumMove(board, ai);
  return bestMove(board, ai);
}
