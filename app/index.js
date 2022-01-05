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
const turnChange = () =>{
    turnState = !turnState;
    if(turnState){
        turn.innerText = '1P'
        return;
    }
    turn.innerText = '2P'   
}
turnChange();

// 그리기 
const init = () => {
    count = 0;
    gameBoard = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for(let i = 1; i < 3; i++){
        ctx.moveTo(5, 100 * i);
        ctx.lineTo(300 , 100 * i);
        ctx.moveTo(100 * i, 5 );
        ctx.lineTo(100 * i, 300);
    }
    ctx.lineCap = 'round'; 
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000'; 
    ctx.stroke();
    for(let i = 0; i < 3; i++){
        gameBoard.push([]);
        for(let j = 0; j < 3; j++){
            gameBoard[i].push(0); 
        }
    }
};
init();

// X좌표찾기 및 함수호출
const listener = (e) => {
    const setX = e.offsetX;
    const setY = e.offsetY;
    let xNum = 0;
    let yNum = 0;
    if(setX < 300){
        xNum = 2;
    }
    if(setX < 200){
        xNum = 1;
    }
    if(setX < 100){
        xNum = 0;
    }
    if(setY < 300){
        yNum = 2;
    }
    if(setY < 200){
        yNum = 1;
    }
    if(setY < 100){
        yNum = 0;
    }
    boardClick(xNum, yNum);
};


const boardClick = (xNum, yNum) => {  
    if(gameBoard[yNum][xNum] == 0){
        
        if(turnState) gameBoard[yNum][xNum] = 'o';
        else gameBoard[yNum][xNum] = 'x';
        let x =  100 * (xNum); 
        let y =  100 * (yNum); 
        let count = -0.5;
        if(turnState){
            const arcFrame = () =>{
                count += 0.05;
                if(count <= 2){
                    ctx.clearRect(x + 10, y + 10, 80, 80);
                    ctx.beginPath();
                    ctx.arc(50 + x , 50 + y , 35, -Math.PI * 0.5, Math.PI * count);
                    ctx.strokeStyle = 'red'; 
                    ctx.lineWidth = 10;
                    ctx.stroke();
                    requestAnimationFrame(arcFrame);
                    return;
                }   
            };
            requestAnimationFrame(arcFrame);
        }else{
            const lineFrame = () => {
                count += 0.05;
                ctx.beginPath();
                if(count){
                    ctx.moveTo(10 + x  , 10 + y );
                    ctx.lineTo(90 + x  , 90 + y );
                    ctx.moveTo(10 + x  , 90 + y );
                    ctx.lineTo(90 + x  , 10 + y );
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = '#000'; 
                    ctx.stroke();
                    requestAnimationFrame(lineFrame);
                    return;
                }
            };
            requestAnimationFrame(lineFrame);
        }
        turnChange();
        gameBoardChk(xNum, yNum, gameBoard);
    }
};

const gameBoardChk = (x, y, gameArray) => {
    count++;
    let postionLine = 1;
    let valueChkX = [];
    for(let i = 0; i < 3; i++) {
        if(gameArray[y][i] == gameArray[y][x]){
            valueChkX.push(true);
        }else{
            valueChkX.push(false);
        }
    }

    let valueChkY = [];
    for(let i = 0; i < 3; i++) {
        if(gameArray[i][x] == gameArray[y][x]){
            valueChkY.push(true);
        }else{
            valueChkY.push(false);
        }
    }
    
    let valueChkDiagonalLeft = []; 
    let leftLineChk = [[0,0],[1,1],[2,2]]
    gameBoard.forEach((arr, idx) => {
        let i = leftLineChk[idx];
        if(gameBoard[i[0]][i[1]] == gameArray[y][x]){
            valueChkDiagonalLeft.push(true);
        }else{
            valueChkDiagonalLeft.push(false);
        }
    })

    let valueChkDiagonalRight = []; 
    let rightLineChk = [[0,2],[1,1],[2,0]]
    gameBoard.forEach((arr, idx) => {
        let i = rightLineChk[idx];
        if(gameBoard[i[0]][i[1]] == gameArray[y][x]){
            valueChkDiagonalRight.push(true);
        }else{
            valueChkDiagonalRight.push(false);
        }
    })

    if(count == 9){
        gameEnd('over', x, y);
    }
    if(!new Set(valueChkX).has(false) || !new Set(valueChkY).has(false) || !new Set(valueChkDiagonalLeft).has(false) || !new Set(valueChkDiagonalRight).has(false)){
        gameEnd(turnState, x, y);
        createLine
    }
}




const gameEnd = (action, x, y) => {
    console.log(action);
    switch (action) {
        case true:
            gameState.innerHTML = `<span class="player2">2P</span> 승리 <br><button class="btn">다시하기</button>`
            break;
        case false:
            gameState.innerHTML = `<span class="player1">1P</span>  승리 <br> <button class="btn">다시하기</button>`
            break;
        case 'over':
            gameState.innerHTML = `게임 오버 <button class="btn">다시하기</button>`
            break;
    }
    canvas.style.pointerEvents = 'none';
}

const createLine = (ex, ey, x, y) => {
    ctx.beginPath();
    ctx.moveTo(5, 50 );
    ctx.lineTo(295, 50 );
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000'; 
    ctx.stroke();
}

canvas.addEventListener('click', (e) => listener(e));
gameState.addEventListener('click', init);