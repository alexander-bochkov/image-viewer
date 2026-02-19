var images = document.querySelectorAll("img");

console.log("IMAGES:", images);

var customBehavior = false;

var changeBehaviorTimer;

images.forEach((item) => {
  item.addEventListener("mousedown", (e) => {
    console.log(e);
    console.log("DOWN", e.button);

    if (e.button !== 1) return;

    if (changeBehaviorTimer) {
      clearTimeout(changeBehaviorTimer);
      changeBehaviorTimer = undefined;
    }

    changeBehaviorTimer = setTimeout(() => {
      clearTimeout(changeBehaviorTimer);
      changeBehaviorTimer = undefined;
    }, 1000);
  });

  item.addEventListener("mouseup", (e) => {
    console.log("UP", e.button);

    if (e.button !== 1) return;

    if (changeBehaviorTimer) {
      clearTimeout(changeBehaviorTimer);
      changeBehaviorTimer = undefined;
      return;
    }

    window.open(item.src);
  });
});
