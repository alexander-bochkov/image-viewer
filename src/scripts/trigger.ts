import { PRIMARY_MOUSE_BUTTON } from "shared/constants";
import { parseSrc } from "./parse-src";

import type { Optional } from "shared/types";
import type { Injector } from "./injector";

const DEFAULT_MOUSE_MOVEMENT = { x: 0, y: 0 };
const DELAY = 300;
const MOUSE_MOVEMENT_THRESHOLD = 3;

type TimerID = ReturnType<typeof setTimeout>;

export class Trigger {
  private injector: Injector;

  private mouseMovement = DEFAULT_MOUSE_MOVEMENT;
  private preventDefaultAction = false;
  private timerID: Optional<TimerID>;

  constructor(injector: Injector) {
    this.injector = injector;

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  private setTimer(handler: TimerHandler) {
    this.timerID = setTimeout(handler, DELAY);
  }

  private clearTimer() {
    clearTimeout(this.timerID);
    this.timerID = undefined;
  }

  private trigger(src: string) {
    this.unregister();

    const onClose = () => {
      this.register();
    };

    this.injector.mount(src, onClose);
  }

  private handleMouseDown({ button, target }: MouseEvent) {
    if (button === PRIMARY_MOUSE_BUTTON && target instanceof HTMLElement) {
      const src = parseSrc(target);

      this.setTimer(() => {
        if (src) {
          this.trigger(src);
          this.clearTimer();
          this.mouseMovement = DEFAULT_MOUSE_MOVEMENT;
        } else {
          this.preventDefaultAction = true;
        }
      });
    }
  }

  private handleMouseMove({ movementX, movementY }: MouseEvent) {
    if (!this.timerID) return;

    this.mouseMovement.x += Math.abs(movementX);
    this.mouseMovement.y += Math.abs(movementY);

    if (
      Math.max(this.mouseMovement.x, this.mouseMovement.y) >
      MOUSE_MOVEMENT_THRESHOLD
    ) {
      this.clearTimer();
      this.mouseMovement = DEFAULT_MOUSE_MOVEMENT;
      this.preventDefaultAction = false;
    }
  }

  private handleClick(event: MouseEvent) {
    if (this.timerID) {
      this.clearTimer();
      this.mouseMovement = DEFAULT_MOUSE_MOVEMENT;
    }

    if (this.preventDefaultAction) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();

      this.preventDefaultAction = false;
    }
  }

  register() {
    document.addEventListener("click", this.handleClick, true);
    document.addEventListener("mousedown", this.handleMouseDown, true);
    document.addEventListener("mousemove", this.handleMouseMove, true);
  }

  unregister() {
    document.removeEventListener("click", this.handleClick, true);
    document.removeEventListener("mousedown", this.handleMouseDown, true);
    document.removeEventListener("mousemove", this.handleMouseMove, true);
  }
}
