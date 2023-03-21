const squareBtn = document.querySelector("#square");

let onDrag = false;
let isDraging = false;
let lastX, lastY;

function move(e) {
  if (!pencil && onDrag) {
    isDraging = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
}

function startDraw(e) {
  if (!isDraging) {
    return;
  }
  if (!pencil && onDrag) {
    ctx.clearRect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
    ctx.strokeRect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
  }
}

squareBtn.addEventListener("click", () => {
  pencil = false;
  onDrag = true;
});

canvas.addEventListener("mousedown", move);
canvas.addEventListener("mousemove", startDraw);
canvas.addEventListener("mouseup", () => {
  isDraging = false;
});
canvas.addEventListener("mouseleave", () => {
  isDraging = false;
});
