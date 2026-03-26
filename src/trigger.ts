import { PRIMARY_MOUSE_BUTTON } from "shared/constants";

import type { Nullable, Optional } from "shared/types";
import type { Injector } from "./injector";

const getSrc = (target: EventTarget) =>
  target instanceof HTMLImageElement ? target.src : null;

const DEFAULT_MOVEMENT = { x: 0, y: 0 };
const DELAY = 300;
const MOVEMENT_THRESHOLD = 3;

type TimerID = ReturnType<typeof setTimeout>;

export class Trigger {
  private injector: Injector;

  private movement = DEFAULT_MOVEMENT;
  private timerID: Optional<TimerID>;

  constructor(injector: Injector) {
    this.injector = injector;

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.init = this.init.bind(this);
  }

  private register(src: Nullable<string>) {
    this.timerID = setTimeout(() => {
      src && this.render(src);
      this.unregister();
    }, DELAY);
  }

  private unregister() {
    clearTimeout(this.timerID);
    this.movement = DEFAULT_MOVEMENT;
    this.timerID = undefined;
  }

  private handleClick(event: MouseEvent) {
    if (this.timerID) {
      this.unregister();
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private handleMouseDown({ button, target }: MouseEvent) {
    if (button === PRIMARY_MOUSE_BUTTON && target) {
      const src = getSrc(target);
      this.register(src);
    }
  }

  private handleMouseMove({ movementX, movementY }: MouseEvent) {
    if (!this.timerID) return;

    this.movement.x += Math.abs(movementX);
    this.movement.y += Math.abs(movementY);

    if (Math.max(this.movement.x, this.movement.y) > MOVEMENT_THRESHOLD) {
      this.unregister();
    }
  }

  init() {
    document.addEventListener("click", this.handleClick, true);
    document.addEventListener("mousedown", this.handleMouseDown, true);
    document.addEventListener("mousemove", this.handleMouseMove, true);
  }

  destroy() {
    document.removeEventListener("click", this.handleClick, true);
    document.removeEventListener("mousedown", this.handleMouseDown, true);
    document.removeEventListener("mousemove", this.handleMouseMove, true);
  }

  private render(src: string) {
    this.destroy();
    this.injector.mount(src, this.init);
  }
}
