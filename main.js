const canvas = document.querySelector("#canvas");
const mode = document.querySelector("#mode");
const destroyBtn = document.querySelector("#destroy");
const widthRange = document.querySelector("#width");
const eraseBtn = document.querySelector("#erase");
const colorBtn = document.querySelector("#color");
const text = document.querySelector("#text");
const fileInput = document.querySelector("#file");
const saveBtn = document.querySelector("#save");

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

function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}

function onDoubleClick(e) {
  const textValue = text.value;
  if (textValue !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "50px 맑은 고딕";
    ctx.fillText(textValue, e.offsetX, e.offsetY);
    ctx.restore();
  }
}

function onFile(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onSave() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myPng.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", onCancelPainting);
canvas.addEventListener("mouseleave", onCancelPainting);
canvas.addEventListener("click", onFill);
canvas.addEventListener("dblclick", onDoubleClick);

mode.addEventListener("click", onModeBtnClick);
destroyBtn.addEventListener("click", onDestroy);
eraseBtn.addEventListener("click", onErase);
saveBtn.addEventListener("click", onSave);

widthRange.addEventListener("change", onWidthChange);
colorBtn.addEventListener("change", onColorChange);
fileInput.addEventListener("change", onFile);
