import { useMemo, useReducer } from "react";

import type { Viewer, ViewerAction, ViewerState } from "../types";

const INITIAL_STATE: ViewerState = {
  fitScale: 0,
  offsetX: 0,
  offsetY: 0,
  rotation: 0,
  scale: 0,
};

const reducer = (state: ViewerState, action: ViewerAction): ViewerState => {
  switch (action.type) {
    case "RESET_OFFSET": {
      const { offsetX, offsetY } = INITIAL_STATE;
      return { ...state, offsetX, offsetY };
    }

    case "SET_FIT_SCALE": {
      return { ...state, fitScale: action.payload };
    }

    case "SET_OFFSET": {
      const { x, y } = action.payload;
      return { ...state, offsetX: x, offsetY: y };
    }

    case "SET_ROTATION": {
      return { ...state, rotation: action.payload };
    }

    case "SET_SCALE": {
      return { ...state, scale: action.payload };
    }

    default:
      return state;
  }
};

export const useViewer = (): Viewer => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return useMemo(() => ({ dispatch, state }), [state]);
};
