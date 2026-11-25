(() => {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hero = document.querySelector(".hero");
  const layer = document.querySelector(".sparkle-layer");
  const minimumDistance = 56;
  let lastPoint = null;

  if (!hero || !layer || !finePointer.matches || reducedMotion.matches) return;

  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const point = { x: event.clientX, y: event.clientY };
    if (lastPoint) {
      const distance = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
      if (distance < minimumDistance) return;
    }
    lastPoint = point;

    const sparkle = document.createElement("span");
    sparkle.className = "cursor-sparkle";
    sparkle.style.left = `${point.x}px`;
    sparkle.style.top = `${point.y}px`;
    sparkle.style.setProperty("--sparkle-size", `${10 + Math.random() * 9}px`);
    sparkle.style.setProperty("--sparkle-opacity", `${0.35 + Math.random() * 0.4}`);
    sparkle.style.setProperty("--sparkle-rotation", `${Math.round(Math.random() * 90 - 45)}deg`);
    layer.append(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
  });

  hero.addEventListener("pointerleave", () => { lastPoint = null; });
})();
