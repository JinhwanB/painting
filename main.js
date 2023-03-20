const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

isPainting = false;

canvas.addEventListener("mousemove", (e) => {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousedown", () => {
  isPainting = true;
});

canvas.addEventListener("mouseup", () => {
  isPainting = false;
});

canvas.addEventListener("mouseleave", () => {
  isPainting = false;
});
