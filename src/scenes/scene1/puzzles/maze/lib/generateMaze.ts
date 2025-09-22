import { mulberry32 } from "@/lib/numbers/randomNumberGenerator";

export const generateMaze = (
  width: number,
  height: number,
  seed = 1234,
): number[][] => {
  const rand = mulberry32(seed);

  const maze: number[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 1),
  );

  function carve(x: number, y: number) {
    maze[y][x] = 0;
    const dirs = [
      [2, 0],
      [-2, 0],
      [0, 2],
      [0, -2],
    ];

    for (let i = dirs.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
    }

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx > 0 && ny > 0 && nx < width - 1 && ny < height - 1) {
        if (maze[ny][nx] === 1) {
          maze[y + dy / 2][x + dx / 2] = 0;
          carve(nx, ny);
        }
      }
    }
  }

  carve(1, 1);

  return maze;
};
