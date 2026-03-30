import { Injector, Trigger } from "scripts";

document.addEventListener("DOMContentLoaded", () => {
  const injector = new Injector();
  const trigger = new Trigger(injector);

  trigger.register();
});
