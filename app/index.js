const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const turn = document.querySelector(".turn");
const gameState = document.querySelector('.changeTxt');
canvas.width = 310;
canvas.height = 310;
let gameBoard = [];
let count = 0;
// true = 0
// false = x
let turnState = false;
const turnChange = () => {
    turnState = !turnState;
    if (turnState) {
        turn.innerText = '1P';
        return;
    }
    turn.innerText = '2P';
};

// 그리기 
const init = () => {
    turnState = false;
    count = 0;
    gameBoard = [];
    turnChange();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.innerText = 'tic tac toe';
    canvas.style.pointerEvents = 'auto';
    ctx.beginPath();
    for (let i = 1; i < 3; i++) {
        ctx.moveTo(5, 100 * i);
        ctx.lineTo(300, 100 * i);
        ctx.moveTo(100 * i, 5);
        ctx.lineTo(100 * i, 300);
    }
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    for (let i = 0; i < 3; i++) {
        gameBoard.push([]);
        for (let j = 0; j < 3; j++) {
            gameBoard[i].push(0);
        }
    }
};
init();

const listener = (e) => {
    const setX = e.offsetX;
    const setY = e.offsetY;
    let xNum = 0;
    let yNum = 0;
    if (setX < 300) xNum = 2;
    if (setX < 200) xNum = 1;
    if (setX < 100) xNum = 0;
    if (setY < 300) yNum = 2;
    if (setY < 200) yNum = 1;
    if (setY < 100) yNum = 0;
    boardClick(xNum, yNum);
};

let drawState = true;
const boardClick = (xNum, yNum) => {
    console.log(drawState);
    if (drawState) {
        if (gameBoard[yNum][xNum] == 0) {
            if(turnState) gameBoard[yNum][xNum] = 'o';
            else          gameBoard[yNum][xNum] = 'x';
            let x = 100 * (xNum);
            let y = 100 * (yNum);
            let count = -0.5;
            if (turnState) {
                drawState = false;
                const arcFrame = () => {
                    ctx.clearRect(x + 10, y + 10, 80, 80);
                    count += 0.04;
                    ctx.beginPath();
                    ctx.arc(50 + x, 50 + y, 35, -Math.PI * 0.5, Math.PI * count);
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 10;
                    ctx.stroke();
                    if (count <= 2) {
                        requestAnimationFrame(arcFrame);
                        return;
                    }
                    drawState = true;
                };
                requestAnimationFrame(arcFrame);
            } else {
                const lineFrame = () => {
                    ctx.beginPath();
                    ctx.moveTo(10 + x, 10 + y);
                    ctx.lineTo(90 + x, 90 + y);
                    ctx.moveTo(10 + x, 90 + y);
                    ctx.lineTo(90 + x, 10 + y);
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = '#000';
                    ctx.stroke();
                    count += 0.05;
                    if (count < 2) {
                    requestAnimationFrame(lineFrame);
                    }
                }
                requestAnimationFrame(lineFrame);
            }
            turnChange();
            gameBoardChk(xNum, yNum, gameBoard);
        }
    }
};

const gameBoardChk = (x, y, gameArray) => {
    count++;
    let lineValues = {startX: 0,startY: 0,endX: 0,endY: 0};
    let valueChkX = [];
    for (let i = 0; i < 3; i++) {
        if (gameArray[y][i] == gameArray[y][x])valueChkX.push(true);
        else                                   valueChkX.push(false);
    }

    let valueChkY = [];
    for (let i = 0; i < 3; i++) {
        if (gameArray[i][x] == gameArray[y][x])valueChkY.push(true);
        else                                   valueChkY.push(false);
    }

    let valueChkDiagonalLeft = [];
    let leftLineChk = [[0, 0],[1, 1],[2, 2]]
    gameBoard.forEach((arr, idx) => {
        let i = leftLineChk[idx];
        if (gameBoard[i[0]][i[1]] == gameArray[y][x])valueChkDiagonalLeft.push(true);
        else                                         valueChkDiagonalLeft.push(false);
        
    })

    let valueChkDiagonalRight = [];
    let rightLineChk = [[0, 2],[1, 1],[2, 0]]
    gameBoard.forEach((arr, idx) => {
        let i = rightLineChk[idx];
        if (gameBoard[i[0]][i[1]] == gameArray[y][x])valueChkDiagonalRight.push(true);
        else                                         valueChkDiagonalRight.push(false);
        
    });

    if (count == 9) {
        gameEnd('over', x, y);
    }
    if (!new Set(valueChkX).has(false) || !new Set(valueChkY).has(false) || !new Set(valueChkDiagonalLeft).has(false) || !new Set(valueChkDiagonalRight).has(false)) {
        if (!new Set(valueChkX).has(false)) {
            lineValues.startX = 5;
            lineValues.endX = 290;
            if (y == 0) {
                lineValues.startY = 50;
                lineValues.endY = 50;
            } else if (y == 1) {
                lineValues.startY = 150;
                lineValues.endY = 150;
            } else {
                lineValues.startY = 250;
                lineValues.endY = 250;
            }
        }
        if (!new Set(valueChkY).has(false)) {
            if (x == 0) {
                lineValues.startX = 50;
                lineValues.endX = 50;
            } else if (x == 1) {
                lineValues.startX = 150;
                lineValues.endX = 150;
            } else {
                lineValues.startX = 250;
                lineValues.endX = 250;
            }
            lineValues.startY = 5;
            lineValues.endY = 290;
        }
        if (!new Set(valueChkDiagonalLeft).has(false)) {
            lineValues.startX = 5;
            lineValues.startY = 5;
            lineValues.endX = 290;
            lineValues.endY = 290;
        }
        if (!new Set(valueChkDiagonalRight).has(false)) {
            lineValues.startX = 290;
            lineValues.startY = 5;
            lineValues.endX = 5;
            lineValues.endY = 290;
        }
        gameEnd(turnState, x, y);
        createLine(lineValues.startX, lineValues.startY, lineValues.endX, lineValues.endY);
    }
};

const gameEnd = (action, x, y) => {
    switch (action) {
        case true:
            gameState.innerHTML = `<span class="player2">2P</span>승리<br><button class="btn">다시하기</button>`;
            break;
        case false:
            gameState.innerHTML = `<span class="player1">1P</span>승리<br><button class="btn">다시하기</button>`;
            break;
        case 'over':
            gameState.innerHTML = `게임 오버<br><button class="btn">다시하기</button>`;
            break;
    }
    canvas.style.pointerEvents = 'none';
};

const createLine = (startX, startY, endX, endY) => {
    console.log(startY, endY);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000';
    ctx.stroke();
};

canvas.addEventListener('click', (e) => listener(e));
gameState.addEventListener('click', init);