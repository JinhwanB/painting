const canvas = document.querySelector("#canvas");
const mode = document.querySelector("#mode");
const destroyBtn = document.querySelector("#destroy");

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let isPainting = false;
let isFilling = false;

// 페인트 붓 굵기를 유저가 원하는 값으로 변경 가능한 코드 작성

function onCancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onFill() {
  if (isFilling) {
    ctx.fillStyle = "black";
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

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", onCancelPainting);
canvas.addEventListener("mouseleave", onCancelPainting);
canvas.addEventListener("click", onFill);

mode.addEventListener("click", onModeBtnClick);
destroyBtn.addEventListener("click", onDestroy);
