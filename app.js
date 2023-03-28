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
const textWidth = document.querySelector("#text_width");
const editText = document.querySelector("#edit_text");
const select = document.querySelector("select");
const strokeTextBtn = document.querySelector("#stroke_text");
const fillTextBtn = document.querySelector("#fill_text");
const previewImg = document.querySelector("#preview");
const imageInput = document.querySelector("#image_input");
const alertWindow = document.querySelector("#alert");
const alertConfirm = document.querySelector("#confirm");
const alertCancel = document.querySelector("#cancel");
const body = document.querySelector("body");

const ctx = canvas.getContext("2d");

const CANVAS_SIZE = 800;

const INVISIBLE_KEY = "invisible";
const POINTER_EVENT_NONE_KEY = "pointer_event_none";

canvas.width = CANVAS_SIZE; // 캔버스 크기 설정
canvas.height = CANVAS_SIZE;

let isPainting = false; // 캔버스에 mousedown 이벤트 확인

let mode = 0; // 도형 그리기, 펜 그리기 등 구분을 위한 변수 설정

let currentX = 0; // 현재 마우스 위치
let currentY = 0;

ctx.lineWidth = 5; // 펜의 기본 굵기 설정
ctx.lineCap = "round"; // 펜의 선 긋기 끝나는 지점 둥글게

// 마우스 눌림 감지
function startPainting(e) {
  isPainting = true;
  if (mode === 4 || mode === 5) {
    currentX = e.offsetX;
    currentY = e.offsetY;
  }
}

// 마우스를 움직이며 그리기
function mouseMove(e) {
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

// 마우스 버튼 땠을 때 감지
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

// 캔버스 채우기
function fillMode() {
  if (mode === 1) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

// 기본 선 그리기 모드로 변경
function strokeClick() {
  mode = 0;
  canvas.classList.add("pen");
  canvas.classList.remove("circle_shape");
  canvas.classList.remove("square_shape");
  canvas.classList.remove("eraser_shape");
  canvas.classList.remove("fill_shape");
}

// 펜 굵기 변화 감지
function penWidthChange(e) {
  ctx.lineWidth = e.target.value;
  lineText.innerText = `${e.target.value}`;
}

// 캔버스 채우기 모드
function fillClick() {
  mode = 1;
  canvas.classList.add("fill_shape");
  canvas.classList.remove("pen");
  canvas.classList.remove("circle_shape");
  canvas.classList.remove("square_shape");
  canvas.classList.remove("eraser_shape");
}

// 지우개 모드
function eraseClick() {
  mode = 2;
  ctx.strokeStyle = "white";
  canvas.classList.remove("pen");
  canvas.classList.remove("circle_shape");
  canvas.classList.add("eraser_shape");
  canvas.classList.remove("square_shape");
  canvas.classList.remove("fill_shape");
}

// 캔버스 내용 초기화
function resetClick() {
  alertWindow.classList.add("pointer_event_auto");
  alertWindow.classList.remove(INVISIBLE_KEY);
  body.classList.add(POINTER_EVENT_NONE_KEY);
}

function resetConfirm() {
  alertWindow.classList.add(INVISIBLE_KEY);
  body.classList.remove(POINTER_EVENT_NONE_KEY);
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.restore();
}

function resetCancel() {
  alertWindow.classList.add(INVISIBLE_KEY);
  body.classList.remove(POINTER_EVENT_NONE_KEY);
}
// 캔버스 내용 초기화 끝

// 사각형 그리기 모드
function squareClick() {
  mode = 4;
  canvas.classList.remove("pen");
  canvas.classList.remove("circle_shape");
  canvas.classList.remove("eraser_shape");
  canvas.classList.remove("fill_shape");
  canvas.classList.add("square_shape");
}

// 원 그리기 모드
function circleClick() {
  mode = 5;
  canvas.classList.remove("pen");
  canvas.classList.remove("square_shape");
  canvas.classList.remove("eraser_shape");
  canvas.classList.remove("fill_shape");
  canvas.classList.add("circle_shape");
}

// 캔버스에 텍스트 넣기
function strokeTextBtnClick() {
  mode = 6;
}

function fillTextBtnClick() {
  mode = 7;
}

function textWidthChange(e) {
  const sizeOfText = e.target.value;
  select.value = sizeOfText;
}

function textWidthSelect(e) {
  const sizeOfText = e.target.value;
  textWidth.value = sizeOfText;
}

function doubleClick(e) {
  const textValue = text.value;
  const textSize = textWidth.value;
  if (textValue !== "" && mode === 6) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${textSize}px 맑은 고딕`;
    ctx.strokeText(textValue, e.offsetX, e.offsetY);
    ctx.restore();
  } else if (textValue !== "" && mode === 7) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${textSize}px 맑은 고딕`;
    ctx.fillText(textValue, e.offsetX, e.offsetY);
    ctx.restore();
  }
}
// 캔버스에 텍스트 넣기 끝

// 컬러 바꾸기 기능
function colorClick(e) {
  if (mode !== 2) {
    const color = e.target.dataset.color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colorBtn.value = color;
  }
}

function colorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}
//컬러 바꾸기 기능 끝

// 불러온 이미지 미리보기 기능
function previewImage(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  previewImg.src = url;
  imageInput.onclick = function () {
    previewImg.src = "img/cat.jpg";
    ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  };
}

// 작업한 캔버스 내용 컴퓨터에 저장 기능
function saveImg() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myImg.png";
  a.target = "_blank";
  a.click();
}

canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("dblclick", doubleClick);
canvas.addEventListener("click", fillMode);

strokeBtn.addEventListener("click", strokeClick);
fillBtn.addEventListener("click", fillClick);
squareBtn.addEventListener("click", squareClick);
circleBtn.addEventListener("click", circleClick);
eraseBtn.addEventListener("click", eraseClick);
destroyBtn.addEventListener("click", resetClick);
strokeTextBtn.addEventListener("click", strokeTextBtnClick);
fillTextBtn.addEventListener("click", fillTextBtnClick);
saveBtn.addEventListener("click", saveImg);
alertConfirm.addEventListener("click", resetConfirm);
alertCancel.addEventListener("click", resetCancel);
colorOptions.forEach((color) => color.addEventListener("click", colorClick));

widthRange.addEventListener("input", penWidthChange);
textWidth.addEventListener("input", textWidthChange);

colorBtn.addEventListener("change", colorChange);
fileInput.addEventListener("change", previewImage);
select.addEventListener("change", textWidthSelect);

text.addEventListener("focusin", () => {
  text.setAttribute("placeholder", "Write and doubleclick in canvas");
});
text.addEventListener("focusout", () => {
  text.setAttribute("placeholder", "Write Here..");
});
