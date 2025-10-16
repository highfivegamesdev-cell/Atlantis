import { useRef } from "react";

export type TailwindBreakpoint = "base" | "md" | "lg" | "xl" | "2xl" | "3xl";

function compute(width: number): TailwindBreakpoint {
  if (width >= 1920) return "3xl";
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  return "base";
}

export function useTailwindBreakpoint(): TailwindBreakpoint {
  const ref = useRef<TailwindBreakpoint>(compute(window.innerWidth));
  return ref.current;
}

export function getTailwindBreakpoint(): TailwindBreakpoint {
  return compute(window.innerWidth);
}
