const black = document.querySelector("#black");
const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const pink = document.querySelector("#pink");
const erase = document.querySelector("button");

const blackCtx = black.getContext(WORD_2D);
const redCtx = red.getContext(WORD_2D);
const blueCtx = blue.getContext(WORD_2D);
const pinkCtx = pink.getContext(WORD_2D);

black.width = 100;
black.height = 100;

red.width = 100;
red.height = 100;

blue.width = 100;
blue.height = 100;

pink.width = 100;
pink.height = 100;

let color = "white"; // 기본 색

blackCtx.arc(50, 50, 30, 0, 2 * Math.PI); // 검정 색
blackCtx.fill();

redCtx.arc(50, 50, 30, 0, 2 * Math.PI); // 빨간 색
redCtx.fillStyle = "red";
redCtx.fill();
redCtx.beginPath();

blueCtx.arc(50, 50, 30, 0, 2 * Math.PI); // 파랑색
blueCtx.fillStyle = "blue";
blueCtx.fill();
blueCtx.beginPath();

pinkCtx.arc(50, 50, 30, 0, 2 * Math.PI); // 핑크색
pinkCtx.fillStyle = "pink";
pinkCtx.fill();

black.addEventListener("click", () => {
  // 검정색 클릭 시 선 색을 검정색으로 변경
  color = "black";
});

red.addEventListener("click", () => {
  // 빨간색 클릭 시 선 색을 검정색으로 변경
  color = "red";
});

blue.addEventListener("click", () => {
  // 파랑색 클릭 시 선 색을 검정색으로 변경
  color = "blue";
});

pink.addEventListener("click", () => {
  // 핑크색 클릭 시 선 색을 검정색으로 변경
  color = "pink";
});

erase.addEventListener("click", () => {
  // 지우개 클릭 시 선 색을 하얀색으로 변경해서 그림 지우는 효과
  ctx.lineWidth = 5;
  color = "white";
});
