import { useCallback, useEffect, useRef } from "react";
import { PRIMARY_MOUSE_BUTTON } from "shared/constants";

const DEFAULT_TOTAL_MOVEMENT = { x: 0, y: 0 };
const MOVEMENT_THRESHOLD = 3;
const OPENING_DELAY = 300;

type TimerID = ReturnType<typeof setTimeout>;

export const useOpenViewer = ({
  enabled,
  handler,
}: {
  enabled: boolean;
  handler: (payload: HTMLImageElement) => void;
}) => {
  const timerID = useRef<TimerID>(undefined);
  const totalMovement = useRef(DEFAULT_TOTAL_MOVEMENT);

  const setTimer = useCallback((callback: () => void) => {
    timerID.current = setTimeout(callback, OPENING_DELAY);
  }, []);

  const reset = useCallback(() => {
    clearTimeout(timerID.current);
    timerID.current = undefined;
    totalMovement.current = DEFAULT_TOTAL_MOVEMENT;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const init = ({ button, target }: MouseEvent) => {
      if (
        button === PRIMARY_MOUSE_BUTTON &&
        target instanceof HTMLImageElement
      ) {
        setTimer(() => {
          handler(target);
          reset();
        });
      }
    };

    const resetOnPointerMove = ({ movementX, movementY }: MouseEvent) => {
      if (!timerID.current) return;

      totalMovement.current.x += Math.abs(movementX);
      totalMovement.current.y += Math.abs(movementY);

      if (
        Math.max(totalMovement.current.x, totalMovement.current.y) >
        MOVEMENT_THRESHOLD
      ) {
        reset();
      }
    };

    const resetOnPointerUp = ({ button }: MouseEvent) => {
      if (button === PRIMARY_MOUSE_BUTTON && timerID.current) {
        reset();
      }
    };

    document.addEventListener("mousedown", init);
    document.addEventListener("mousemove", resetOnPointerMove);
    document.addEventListener("mouseup", resetOnPointerUp);

    return () => {
      document.removeEventListener("mousedown", init);
      document.removeEventListener("mousemove", resetOnPointerMove);
      document.removeEventListener("mouseup", resetOnPointerUp);
    };
  }, [enabled, handler, reset, setTimer]);
};
