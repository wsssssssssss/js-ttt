const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const blockCount = 3; // 3x3
const blockSize = 100; // 한칸 사이즈 (100)
const boardSize = blockCount * blockSize; // 보드 사이즈
const radius = blockSize / 4; // 그려지는 X, O의 반지름 (25)
const checked = Array.from({ length: 9 }).fill(null); // 체크한 부분 저장하는 곳 [null * 9]
const element = []; // animate 완료된 array
let turn = true; // 어떤 유저의 턴인지 (true = X, false = O)
let gameEnd = false; // Game 종료 flag

canvas.width = boardSize;
canvas.height = boardSize;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 10;
ctx.strokeStyle = "#000";

const getCenterPos = (idx) => [idx % blockCount * blockSize + blockSize / 2, Math.floor(idx / blockCount) * blockSize + blockSize / 2]; // idx에 해당하는 x, y 좌표 가져오는 함수

const renderO = (idx, cnt) => { // O 그리는 함수
  const [x, y] = getCenterPos(idx); // idx에 맞는 x, y 좌표 가져옴

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2 / 100 * cnt);
  ctx.stroke();
};

const renderX = (idx, cnt) => { // X 그리는 함수
  const [x, y] = getCenterPos(idx); // idx에 맞는 x, y 좌표 가져옴

  ctx.beginPath();
  ctx.moveTo(x - radius, y - radius); // 좌측 상단
  ctx.lineTo(x - radius + (radius * 2 / 100 * cnt), y - radius + (radius * 2 / 100 * cnt)); // 우측 하단
  ctx.moveTo(x + radius, y - radius); // 우측 상단
  ctx.lineTo(x + radius - (radius * 2 / 100 * cnt), y - radius + (radius * 2 / 100 * cnt)); // 좌측 하단
  ctx.stroke();
};

const renderLine = (line, cnt) => {
  const [[sx, sy], [ex, ey]] = line.map(getCenterPos); // connectedLine = [x, y]; map돌면 [getCenterPos(x), getCenterPos(y)] 값이 return 됨 

  ctx.save(); // 이전의 canvas style을 저장
  ctx.strokeStyle = "#f00";
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo((sx + (ex - sx) / 100 * cnt), sy + (ey - sy) / 100 * cnt);
  ctx.stroke();
  ctx.restore(); // 저장한 style을 다시 적용
};

const renderBoard = () => { // 보드 그리는 함수
  ctx.clearRect(0, 0, boardSize, boardSize);

  ctx.beginPath();
  for (let i = 1; i <= 2; i++) {
    ctx.moveTo(blockSize * i, 0);
    ctx.lineTo(blockSize * i, boardSize);
    ctx.moveTo(0, blockSize * i);
    ctx.lineTo(boardSize, blockSize * i);
  }
  ctx.stroke();
};

const render = () => {
  requestAnimationFrame(render);

  renderBoard();

  element.forEach((ele) => ele());
};


const getConnectedLine = () => { // 체크한 부분을 확인해보고 완성된 라인이 있으면 해당 라인의 [시작 idx, 끝 idx]를 return 해줌
  for (let i = 0; i < blockCount; i++) {
     // slice(0, 3) slice(3, 6) slice(6, 9)
    if (checked.slice(i * blockCount, i * blockCount + blockCount).every((v) => v === turn)) {
      return [i * blockCount, i * blockCount + blockCount - 1];
    }

    // [0, 3, 6] [1, 4, 7] [2, 5, 8]
    if (Array.from({ length: blockCount }, (v, k) => checked[i + blockCount * k]).every((v) => v === turn)) {
      return [i, i + blockCount * (blockCount - 1)];
    }
  }

  // [0, 4, 8]
  if (Array.from({ length: blockCount }, (v, k) => checked[k * (blockCount + 1)]).every((v) => v === turn)) {
    return [0, Math.pow(blockCount, 2) - 1];
  }

  // [2, 4, 6]
  if (Array.from({ length: blockCount }, (v, k) => checked[(k + 1) * (blockCount - 1)]).every((v) => v === turn)) {
    return [blockCount - 1, blockCount * (blockCount - 1)];
  }

  return null;
};

const onClick = (e) => {
  const { x, y } = e.target.getBoundingClientRect();
  const idx = Math.floor((e.pageX - x) / blockSize) + Math.floor((e.pageY - y) / blockSize) * blockCount;

  if (checked[idx] !== null || gameEnd) {
    return;
  }

  element.push((() => {
    let cnt = 0;
    const func = turn ? renderO : renderX;

    return () => func(idx, cnt === 100 ? cnt : cnt = cnt + 2);
  })());

  checked[idx] = turn;

  const line = getConnectedLine();

  if (line) {
    element.push((() => {
      let cnt = 0;

      return () => renderLine(line, cnt === 100 ? cnt : cnt = cnt + 2);
    })());

    gameEnd = true;

    return;
  }

  turn = !turn;
};

const eve = () => {
  // eventListener 추가
  canvas.addEventListener("click", onClick);
};

const init = () => {
  eve();
  render();
};

window.onload = init;
