import { Injector } from "./injector";
import { Trigger } from "./trigger";

document.addEventListener("DOMContentLoaded", () => {
  const trigger = new Trigger(new Injector());
  trigger.init();
});
