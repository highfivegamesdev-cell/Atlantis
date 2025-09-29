import { useEffect, useState } from "react";
import { PuzzleWrapper } from "@/components/layout/PuzzleWrapper";
import { useGame } from "@/scenes/config/useGame";
import { Puzzles } from "@/scenes/config/scenesConfig";
import { GameEventTypes } from "@/scenes/config/gameMachine";
import { puzzleConfig } from "@/scenes/scene1/config";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { Shape } from "@/scenes/scene1/puzzles/shapeMatcher/Shape";
import { shapesConfig } from "@/scenes/scene1/puzzles/shapeMatcher/config";
import { ShapeDrop } from "@/scenes/scene1/puzzles/shapeMatcher/ShapeDrop";
import { SortableContext } from "@dnd-kit/sortable";

type Props = {
  close: () => void;
};

const correctShapes = ["moon", "triangle", "sphere"];

export const ShapeMatcher = ({ close }: Props) => {
  const [pool, setPool] = useState(["sun", "oval", "rectangle"]);
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const { send, state } = useGame();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const { solvedPuzzles } = state.context;

    const updatedPool = ["sun", "oval", "rectangle"];

    if (solvedPuzzles.maze) {
      updatedPool.push("moon");
    }
    if (solvedPuzzles.sudoku) {
      updatedPool.push("triangle");
    }

    if (solvedPuzzles.riddle) {
      updatedPool.push("sphere");
    }

    setPool(updatedPool.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (correctShapes.every((el) => slots.includes(el))) {
      send({
        type: GameEventTypes.solvePuzzle,
        puzzleId: Puzzles.shapeMatcher.name,
        answer: Puzzles.shapeMatcher.answer,
      });
    }
  }, [slots]);

  const returnItemToPool = (item: string, slotIndex: number) => {
    setSlots((prev) =>
      prev.map((val, idx) => (idx === slotIndex ? null : val)),
    );
    setPool((prev) => (prev.includes(item) ? prev : [...prev, item]));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    const item = active.id as string;
    setActiveId(null);

    if (!over) {
      const fromSlotIndex = slots.findIndex((val) => val === item);
      if (fromSlotIndex !== -1) {
        setSlots((prev) =>
          prev.map((val, idx) => (idx === fromSlotIndex ? null : val)),
        );
        setPool((prev) => (prev.includes(item) ? prev : [...prev, item]));
      }
      return;
    }

    const overId = over.id as string;

    if (overId.startsWith("slot-")) {
      const index = parseInt(overId.split("-")[1], 10);
      const fromSlotIndex = slots.findIndex((val) => val === item);

      if (slots[index] === null && !pool.includes(item)) {
        setSlots((prev) =>
          prev.map((val, idx) => (idx === fromSlotIndex ? null : val)),
        );
        setSlots((prev) =>
          prev.map((val, idx) => (idx === index ? item : val)),
        );
        return;
      }

      if (slots[index] === null && pool.includes(item)) {
        setPool((prev) => prev.filter((i) => i !== item));
        setSlots((prev) =>
          prev.map((val, idx) => (idx === index ? item : val)),
        );
        return;
      }
      return;
    }

    if (overId === "pool") {
      const fromSlotIndex = slots.findIndex((val) => val === item);
      if (fromSlotIndex !== -1) {
        setSlots((prev) =>
          prev.map((val, idx) => (idx === fromSlotIndex ? null : val)),
        );
        setPool((prev) => (prev.includes(item) ? prev : [...prev, item]));
      }
      return;
    }
  };

  return (
    <PuzzleWrapper backgroundUrl={puzzleConfig.shapeMatcher.background}>
      <button
        onClick={close}
        className="absolute top-[1%] right-[3%] text-white hover:text-black text-4xl font-bold hover:cursor-pointer"
      >
        ×
      </button>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col items-center justify-center h-full p-4 gap-10">
          <div className="flex gap-4">
            {slots.map((item, idx) => {
              const itemObj = shapesConfig.find((shape) => shape.id === item);
              const shapeNode = item && (
                <div className="relative group">
                  <Shape
                    id={item}
                    backgroundUrl={itemObj?.backgroundUrl || ""}
                  />
                  <button
                    onClick={() => returnItemToPool(item, idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black"
                    aria-label="Usuń z slotu"
                  >
                    ×
                  </button>
                </div>
              );
              return (
                <ShapeDrop key={idx} id={`slot-${idx}`}>
                  {shapeNode}
                </ShapeDrop>
              );
            })}
          </div>

          <div
            id="pool"
            className="flex flex-wrap gap-2 min-w-[180px] min-h-[120px] p-4 border-2 border-gray-300 rounded-lg mb-6 empty:invisible"
          >
            <SortableContext items={pool}>
              {pool.map((id) => {
                const item = shapesConfig.find((shape) => shape.id === id);

                return (
                  <Shape
                    key={id}
                    id={id}
                    backgroundUrl={item?.backgroundUrl || ""}
                  />
                );
              })}
            </SortableContext>
          </div>
          <DragOverlay>
            {activeId
              ? (() => {
                  const shape = shapesConfig.find((s) => s.id === activeId);
                  if (!shape) return null;
                  return (
                    <div
                      className="w-[60px] lg:w-[70px] xl:w-[80px] 2xl:w-[100px] h-[60px] lg:h-[70px] xl:h-[80px] 2xl:h-[100px] bg-cover rounded-md shadow-xl border border-white/40"
                      style={{ backgroundImage: `url(${shape.backgroundUrl})` }}
                    />
                  );
                })()
              : null}
          </DragOverlay>
        </div>
      </DndContext>
    </PuzzleWrapper>
  );
};
