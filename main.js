const canvas = document.querySelector("#canvas");
const mode = document.querySelector("#mode");
const destroyBtn = document.querySelector("#destroy");
const widthRange = document.querySelector("#width");
const eraseBtn = document.querySelector("#erase");

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let isPainting = false;
let isFilling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = 5;

function onCancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onFill() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function startPainting() {
  isPainting = true;
}

function onMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}

function onModeBtnClick() {
  if (isFilling) {
    isFilling = false;
    mode.innerText = "Fill";
  } else {
    isFilling = true;
    mode.innerText = "Stroke";
  }
}

function onDestroy() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onWidthChange(e) {
  ctx.lineWidth = e.target.value;
}

function onErase() {
  ctx.strokeStyle = "white";
  if (isFilling === true) {
    isFilling = false;
    mode.innerText = "Fill";
  }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", onCancelPainting);
canvas.addEventListener("mouseleave", onCancelPainting);
canvas.addEventListener("click", onFill);

mode.addEventListener("click", onModeBtnClick);
destroyBtn.addEventListener("click", onDestroy);
eraseBtn.addEventListener("click", onErase);

widthRange.addEventListener("change", onWidthChange);
