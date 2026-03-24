import type { ActionDispatch } from "react";

export type ViewerState = {
  fitScale: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  scale: number;
};

export type ViewerAction =
  | { type: "RESET_OFFSET" }
  | { type: "SET_FIT_SCALE"; payload: number }
  | { type: "SET_OFFSET"; payload: { x: number; y: number } }
  | { type: "SET_ROTATION"; payload: number }
  | { type: "SET_SCALE"; payload: number };

export type Viewer = {
  dispatch: ActionDispatch<[ViewerAction]>;
  state: ViewerState;
};
