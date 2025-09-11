import Phaser from "phaser";

import {
  mazeMap,
  MAZE_TILE_SIZE,
  MAZE_START,
  MAZE_GOAL,
} from "@/scenes/scene1/puzzles/maze/config";

export class MazeGame extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private graphics!: Phaser.GameObjects.Graphics;
  private lastMoveTime = 0;
  private moveDelay = 130;
  private pathGraphics!: Phaser.GameObjects.Graphics;

  constructor() {
    super("MazeScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.graphics = this.add.graphics();

    this.drawWalls();

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.add.circle(
      MAZE_GOAL.x * MAZE_TILE_SIZE + MAZE_TILE_SIZE / 2,
      MAZE_GOAL.y * MAZE_TILE_SIZE + MAZE_TILE_SIZE / 2,
      MAZE_TILE_SIZE / 2,
      0xff0000
    );

    this.player = this.add.rectangle(
      MAZE_START.x * MAZE_TILE_SIZE + MAZE_TILE_SIZE / 2,
      MAZE_START.y * MAZE_TILE_SIZE + MAZE_TILE_SIZE / 2,
      MAZE_TILE_SIZE * 0.8,
      MAZE_TILE_SIZE * 0.8,
      0x0000ff
    );

    this.pathGraphics = this.add.graphics().setDepth(-1);
    this.pathGraphics.fillStyle(0xffff00, 1);

    this.pathGraphics.fillRect(
      MAZE_START.x * MAZE_TILE_SIZE,
      MAZE_START.y * MAZE_TILE_SIZE,
      MAZE_TILE_SIZE,
      MAZE_TILE_SIZE
    );
  }

  update(time: number) {
    if (time < this.lastMoveTime + this.moveDelay) return;

    let dx = 0;
    let dy = 0;

    if (this.cursors.left.isDown) dx = -1;
    else if (this.cursors.right.isDown) dx = 1;
    else if (this.cursors.up.isDown) dy = -1;
    else if (this.cursors.down.isDown) dy = 1;

    if (dx !== 0 || dy !== 0) {
      const newX = this.player.x + dx * MAZE_TILE_SIZE;
      const newY = this.player.y + dy * MAZE_TILE_SIZE;
      const tileX = Math.floor(newX / MAZE_TILE_SIZE);
      const tileY = Math.floor(newY / MAZE_TILE_SIZE);

      if (mazeMap[tileY][tileX] === 0) {
        this.pathGraphics.fillRect(
          tileX * MAZE_TILE_SIZE,
          tileY * MAZE_TILE_SIZE,
          MAZE_TILE_SIZE,
          MAZE_TILE_SIZE
        );

        this.player.x = newX;
        this.player.y = newY;

        if (tileX === MAZE_GOAL.x && tileY === MAZE_GOAL.y) {
          this.events.emit("win");
        }
      }

      this.lastMoveTime = time;
    }
  }

  private drawWalls() {
    this.graphics.fillStyle(0x000000, 1);
    for (let y = 0; y < mazeMap.length; y++) {
      for (let x = 0; x < mazeMap[y].length; x++) {
        if (mazeMap[y][x] === 1) {
          this.graphics.fillRect(
            x * MAZE_TILE_SIZE,
            y * MAZE_TILE_SIZE,
            MAZE_TILE_SIZE,
            MAZE_TILE_SIZE
          );
        }
      }
    }
  }
}

export const mazeBaseConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: mazeMap[0].length * MAZE_TILE_SIZE,
  height: mazeMap.length * MAZE_TILE_SIZE,
  scene: MazeGame,
};
