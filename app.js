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
const squareBtn = document.querySelector("#square");
const circleBtn = document.querySelector("#circle");
const editBtn = document.querySelector("#edit");

const ctx = canvas.getContext("2d");

const CANVAS_SIZE = 800;
const INVISIBLE_KEY = "invisible";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let isPainting = false;

let mode = 0;

let currentX = 0;
let currentY = 0;

ctx.lineWidth = 5;
ctx.lineCap = "round";

function onMove(e) {
  if (isPainting) {
    if (mode === 0 || mode === 2) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      return;
    } else if (mode === 4) {
      const x = e.offsetX;
      const y = e.offsetY;
      const width = x - currentX;
      const height = y - currentY;
      ctx.moveTo(x, y);
      ctx.fillRect(currentX, currentY, width, height);
    } else if (mode === 5) {
      const circleX = e.offsetX;
      const circleWidth = circleX - currentX;
      ctx.arc(currentX, currentY, circleWidth, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.moveTo(e.offsetX, e.offsetY);
  }
}

function startPainting(e) {
  isPainting = true;
  if (mode === 4 || mode === 5) {
    currentX = e.offsetX;
    currentY = e.offsetY;
  }
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onFill() {
  if (mode === 1) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function strokeClick() {
  mode = 0;
}

function fillClick() {
  mode = 1;
}

function eraseClick() {
  mode = 2;
  ctx.strokeStyle = "white";
}

function resetClick() {
  mode = 3;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function squareClick() {
  mode = 4;
}

function circleClick() {
  mode = 5;
}

function editMode() {
  text.classList.remove(INVISIBLE_KEY);
}

function colorClick(e) {
  if (mode !== 2) {
    const color = e.target.dataset.color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colorBtn.value = color;
  }
}

function onWidthChange(e) {
  ctx.lineWidth = e.target.value;
  lineText.innerText = `${e.target.value}`;
}

function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}

function doubleClick(e) {
  const textValue = text.value;
  if (textValue !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "50px 맑은 고딕";
    ctx.fillText(textValue, e.offsetX, e.offsetY);
    text.value = "";
    text.classList.add(INVISIBLE_KEY);
  }
}

function uploadFile(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  };
}

function onSave() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myPng.png";
  a.click();
}

function cancelText(e) {
  const keyCode = e.keyCode;
  if (keyCode == 27) {
    text.classList.add(INVISIBLE_KEY);
  }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onFill);
canvas.addEventListener("dblclick", doubleClick);

fillBtn.addEventListener("click", fillClick);
destroyBtn.addEventListener("click", resetClick);
eraseBtn.addEventListener("click", eraseClick);
saveBtn.addEventListener("click", onSave);
strokeBtn.addEventListener("click", strokeClick);
colorOptions.forEach((color) => color.addEventListener("click", colorClick));
squareBtn.addEventListener("click", squareClick);
circleBtn.addEventListener("click", circleClick);
editBtn.addEventListener("click", editMode);

widthRange.addEventListener("change", onWidthChange);
colorBtn.addEventListener("change", onColorChange);
fileInput.addEventListener("change", uploadFile);

document.addEventListener("keydown", cancelText);
