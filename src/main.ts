import { Injector, Trigger } from "scripts";

const init = () => {
  const injector = new Injector();
  const trigger = new Trigger(injector);

  trigger.register();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
