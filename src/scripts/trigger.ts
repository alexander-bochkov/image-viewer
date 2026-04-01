import { MOUSE_BUTTON_CODES } from "shared/constants";
import { getMedia } from "./get-media";

import type { Optional } from "shared/types";
import type { Injector } from "./injector";
import type { Media } from "./types";

const TRIGGER_DELAY = 300;

type TimerID = ReturnType<typeof setTimeout>;

export class Trigger {
  private injector: Injector;
  private preventClick = false;
  private timerID: Optional<TimerID>;

  constructor(injector: Injector) {
    this.injector = injector;

    this.handleClick = this.handleClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  private setTimer(handler: TimerHandler) {
    this.timerID = setTimeout(handler, TRIGGER_DELAY);
  }

  private clearTimer() {
    clearTimeout(this.timerID);
    this.timerID = undefined;
  }

  private trigger(media: Media) {
    this.unregister();

    const onClose = () => {
      this.register();
    };

    this.injector.mount(media, onClose);
  }

  private handleMouseDown({ button, target }: MouseEvent) {
    if (button === MOUSE_BUTTON_CODES.LEFT && target instanceof HTMLElement) {
      const media = getMedia(target);

      this.setTimer(() => {
        if (media?.url) {
          this.trigger(media);
          this.clearTimer();
        } else {
          this.preventClick = true;
        }
      });
    }
  }

  private handleDragStart() {
    this.clearTimer();
    this.preventClick = false;
  }

  private handleClick(event: MouseEvent) {
    if (this.timerID) {
      this.clearTimer();
    }

    if (this.preventClick) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();

      this.preventClick = false;
    }
  }

  register() {
    document.addEventListener("click", this.handleClick, true);
    document.addEventListener("dragstart", this.handleDragStart, true);
    document.addEventListener("mousedown", this.handleMouseDown, true);
  }

  unregister() {
    document.removeEventListener("click", this.handleClick, true);
    document.removeEventListener("dragstart", this.handleDragStart, true);
    document.removeEventListener("mousedown", this.handleMouseDown, true);
  }
}
