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
    turn.innerText = turnState ? '1P' : '2P';
};

const render = () => {
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
}

// 그리기 
const init = () => {
    turnState = false;
    count = 0;
    gameBoard = [];
    // turnChange();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.innerText = 'tic tac toe';
    gameState.style.pointerEvents = 'none';
    canvas.style.pointerEvents = 'auto';
    render();
};
init();


let drawState = true;
const boardClick = (e) => {
    let xNum = Math.floor( e.offsetX/100);
    let yNum = Math.floor( e.offsetY/100);
    if (drawState) {
        if (gameBoard[yNum][xNum] === 0) {
            gameBoard[yNum][xNum] = turnState ? 'o' : 'x';
            let x = 100 * (xNum);
            let y = 100 * (yNum);
           
            if (turnState) {
                let count = -0.5;
                drawState = false;
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 10;
                const arcFrame = () => {
                    ctx.clearRect(x + 10, y + 10, 80, 80);
                    count += 0.04;
                    ctx.beginPath();
                    ctx.arc(50 + x, 50 + y, 35, -Math.PI * 0.5, Math.PI * count);
                    ctx.stroke();
                    if (count < 2) {
                        requestAnimationFrame(arcFrame);
                        return;
                    }
                    drawState = true;
                };
                requestAnimationFrame(arcFrame);
            } else {  
                let lineCount = 10;
                let lineCountTwo = 90;
                ctx.lineWidth = 10;
                ctx.strokeStyle = '#000';
                const lineFrame = () => {
                    drawState = false;
                    lineCount+= 5;
                    ctx.beginPath();
                    if(lineCount <= 80){
                        ctx.moveTo(20 + x, 20 + y);
                        ctx.lineTo(lineCount + x, lineCount + y);
                        ctx.stroke();
                    }else{
                        let lineCountTwos = lineCount - 70;
                        if(lineCountTwo >= 25){
                            lineCountTwo-=5;
                            ctx.moveTo(80 + x, 20 + y);
                            ctx.lineTo(x + lineCountTwo ,  y + lineCountTwos);
                            ctx.stroke();

                        }
                    }
                    if(lineCount <= 160){
                        requestAnimationFrame(lineFrame);
                        return;
                    }
                    drawState = true;
                }
                requestAnimationFrame(lineFrame);
            }
            turnChange();
            gameBoardChk(xNum, yNum);
        }
    }
};
const leftLineChk = [[0, 0],[1, 1],[2, 2]];
const rightLineChk = [[0, 2],[1, 1],[2, 0]];
const gameBoardChk = (x, y) => {
    count++;
   
    const valueChkX = [];
    for (let i = 0; i < 3; i++) {
       valueChkX.push(gameBoard[y][i] == gameBoard[y][x]);
    }

    const valueChkY = [];
    for (let i = 0; i < 3; i++) {
        valueChkY.push(gameBoard[i][x] == gameBoard[y][x]);
    }

    let valueChkDiagonalLeft = [];
  
    gameBoard.forEach((arr, idx) => {
        let i = leftLineChk[idx];
        valueChkDiagonalLeft.push(gameBoard[i[0]][i[1]] == gameBoard[y][x]);
        
    })

    let valueChkDiagonalRight = [];
   
    gameBoard.forEach((arr, idx) => {
        let i = rightLineChk[idx];
        valueChkDiagonalRight.push(gameBoard[i[0]][i[1]] == gameBoard[y][x]);
    });

    if (count == 9) {
        gameEnd('over', x, y);
    }
    if (!new Set(valueChkX).has(false) || !new Set(valueChkY).has(false) || !new Set(valueChkDiagonalLeft).has(false) || !new Set(valueChkDiagonalRight).has(false)) {
        let lineValues = {startX: 0,startY: 0,endX: 0,endY: 0};
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
    gameState.style.pointerEvents = 'auto';
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

canvas.addEventListener('click', boardClick);
gameState.addEventListener('click', init);