const canvas = document.querySelector("canvas");

const WORD_2D = "2d";

const ctx = canvas.getContext(WORD_2D);

// 그림판 크기 설정
canvas.width = 800;
canvas.height = 700;

let isPainting = false;

// 마우스로 드래그하면 선이 그려지게
canvas.addEventListener("mousemove", (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
});

// 드래그를 시작할 때 정해진 색으로 선 긋기
canvas.addEventListener("mousedown", () => {
  isPainting = true;
  ctx.beginPath();
  ctx.strokeStyle = color;
});

// 드래그를 중단하면 선 긋기 중단
canvas.addEventListener("mouseup", () => {
  isPainting = false;
});

// 마우스가 그림판 밖으로 나가면 선 긋기 중단
canvas.addEventListener("mouseleave", () => {
  isPainting = false;
});
