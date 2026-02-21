import { useCallback, useEffect } from "react";

import type { Optional } from "types/utility-types";

const LEFT_MOUSE_BUTTON = 0;
const MOVEMENT_THRESHOLD = 3;
const TRIGGER_DELAY = 500;

type TimerID = ReturnType<typeof setTimeout>;

let timerID: Optional<TimerID>;

let totalMovementX = 0;
let totalMovementY = 0;

export const useTriggerViewer = (
  onTrigger: (imageEl: HTMLImageElement) => void,
) => {
  const setTimer = useCallback((callback: () => void) => {
    timerID = setTimeout(callback, TRIGGER_DELAY);
  }, []);

  const clearTimer = useCallback(() => {
    clearTimeout(timerID);
    timerID = undefined;
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    totalMovementX = 0;
    totalMovementY = 0;
  }, [clearTimer]);

  useEffect(() => {
    const handleMouseDown = ({ button, target }: MouseEvent) => {
      if (button === LEFT_MOUSE_BUTTON && target instanceof HTMLImageElement) {
        setTimer(() => {
          onTrigger(target);
          reset();
        });
      }
    };

    const handleMouseMove = ({ movementX, movementY }: MouseEvent) => {
      if (!timerID) return;

      totalMovementX += Math.abs(movementX);
      totalMovementY += Math.abs(movementY);

      if (Math.max(totalMovementX, totalMovementY) > MOVEMENT_THRESHOLD) {
        reset();
      }
    };

    const handleMouseUp = ({ button }: MouseEvent) => {
      if (button === LEFT_MOUSE_BUTTON && timerID) {
        reset();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onTrigger, reset, setTimer]);
};
