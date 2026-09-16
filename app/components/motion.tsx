"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
export const MotionContext = createContext(false);
const subscribe = (callback: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
export function useSystemReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
export function useReducedMotion() {
  return useContext(MotionContext);
}
