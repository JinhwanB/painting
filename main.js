const canvas = document.querySelector("#canvas");
const fillBtn = document.querySelector("#fill");
const destroyBtn = document.querySelector("#destroy");
const widthRange = document.querySelector("#width");
const eraseBtn = document.querySelector("#erase");
const colorBtn = document.querySelector("#color");
const text = document.querySelector("#text");
const fileInput = document.querySelector("#file");
const saveBtn = document.querySelector("#save");
const colorOptions = Array.from(
  document.getElementsByClassName("color_options")
);
const lineText = document.querySelector("#line_text");
const strokeBtn = document.querySelector("#stroke");

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let pencil = true;
let isPainting = false;
let isFilling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = 5;
ctx.lineCap = "round";

function onCancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onFill() {
  if (isFilling === true && pencil === true) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function startPainting() {
  isPainting = true;
}

function onMove(e) {
  if (isPainting === true && pencil === true) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}

function onFillClick() {
  pencil = true;
  isDraging = false;
  isFilling = true;
}

function onStrokeClick() {
  pencil = true;
  isDraging = false;
  isFilling = false;
}

function onDestroy() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onWidthChange(e) {
  ctx.lineWidth = e.target.value;
  lineText.innerText = `선 굵기 : ${e.target.value}`;
}

function onErase() {
  ctx.strokeStyle = "white";
  if (isFilling === true) {
    isFilling = false;
    fillBtn.innerText = "Fill";
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

function onClickColor(e) {
  const color = e.target.dataset.color;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  colorBtn.value = color;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", onCancelPainting);
canvas.addEventListener("mouseleave", onCancelPainting);
canvas.addEventListener("click", onFill);
canvas.addEventListener("dblclick", onDoubleClick);

fillBtn.addEventListener("click", onFillClick);
destroyBtn.addEventListener("click", onDestroy);
eraseBtn.addEventListener("click", onErase);
saveBtn.addEventListener("click", onSave);
strokeBtn.addEventListener("click", onStrokeClick);
colorOptions.forEach((color) => color.addEventListener("click", onClickColor));

widthRange.addEventListener("change", onWidthChange);
colorBtn.addEventListener("change", onColorChange);
fileInput.addEventListener("change", onFile);
