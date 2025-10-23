  import { GRID_SIZE } from "./config";
import {type Tile } from "./types";
  
 const shuffle = (arr: Tile[]): Tile[] => {
    const copy = [...arr];
    for (let i = copy.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

    const countInversions = (arr: number[]): number => {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) inv++;
      }
    }
    return inv;
  };

    const isSolvable = (tiles: Tile[], size: number): boolean => {
    const values = tiles.filter(t => t.id !== -1).map(t => t.id);
    const inversions = countInversions(values);

    if (size % 2 === 1) {
      return inversions % 2 === 0;
    } else {
      const emptyRowFromBottom =
        size - Math.floor(tiles.findIndex(t => t.id === -1) / size);
      if (emptyRowFromBottom % 2 === 0) {
        return inversions % 2 === 1;
      } else {
        return inversions % 2 === 0;
      }
    }
  };

export const generateSolvableShuffle = (arr: Tile[]): Tile[] => {
  const shuffled = shuffle([...arr]);
  if (isSolvable(shuffled, GRID_SIZE)) return shuffled;

  const copy = [...shuffled];
  const a = copy.findIndex(t => t.id !== -1);
  const b = copy.findIndex((t, i) => t.id !== -1 && i !== a);
  [copy[a], copy[b]] = [copy[b], copy[a]];
  return copy;
};
