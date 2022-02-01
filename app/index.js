const canvas = document.querySelector("#root .canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 10;
ctx.lineCap = 'round';

let turn = false;
let gameResult = false;
let lineCom = false;
let animation = false;
let checkBlock =  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const player = document.querySelector("#root .player_box .player");
const root = document.querySelector("#root");
const boxSize = 130;
const filedWidth = window.innerWidth/2 - boxSize - (boxSize/2);
const filedHeight = window.innerHeight / 2 - boxSize;
const lineArr = [
    {
        startXpos: window.innerWidth/2 - (boxSize / 2),
        startYpos: 0,
        endXpos: (window.innerWidth/2 - (boxSize/2)),
        endYpos: boxSize*3,
    }, {
        startXpos: window.innerWidth/2 + (boxSize / 2),
        startYpos: 0,
        endXpos: window.innerWidth/2 + (boxSize / 2),
        endYpos: boxSize*3,
    }, {
        startXpos: window.innerWidth/2 - (boxSize*1.5),
        startYpos: boxSize,
        endXpos: window.innerWidth/2 + (boxSize*1.5),
        endYpos: boxSize,
    }, {
        startXpos: window.innerWidth/2 - (boxSize*1.5),
        startYpos: boxSize*2,
        endXpos: window.innerWidth/2 + (boxSize*1.5),
        endYpos: boxSize*2,
    }
];

const filedStartX = window.innerWidth/2 - (boxSize*3)/2;
const filedEndX = window.innerWidth/2 + (boxSize*3)/2;
const filedStartY = filedHeight;
const filedEndY = filedHeight + (boxSize*3);

let num = 0;

const createCirlce = function(color, xPos, yPos) {
    num = 0;

    const animationFun = () => {
        if(num < 40){
            num++;
            animation = true;
    
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.clearRect(xPos - 56, yPos - 56, boxSize - 18, boxSize - 18);
            ctx.arc(xPos, yPos, 50, (Math.PI * 2 / 40) * num, 0, true);
            ctx.stroke();
            
            requestAnimationFrame(animationFun);
    
        } else {
            animation = false;
        }
    }
    animationFun();
};

const createLine = function(color, startxPos1, startyPos1, xLength1, yLength1, startxPos2, startyPos2, xLength2, yLength2) {
    num = 0;

    const animationFun = () => {
        if(num < 20){
            num++;
            animation = true;
    
            ctx.strokeStyle = color;
            ctx.clearRect(startxPos1 - 5, startyPos1 - 5, xLength1 + 10, yLength1 + 10);
            ctx.beginPath();
            ctx.moveTo(startxPos1, startyPos1);
            ctx.lineTo(startxPos1 + (xLength1/20 * num), startyPos1 + (yLength1/20 * num));
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(startxPos2, startyPos2);
            ctx.lineTo(startxPos2 + (xLength2/20 * num), startyPos2 + (yLength2/20 * num));
            ctx.stroke();
    
            requestAnimationFrame(animationFun);
            
        } else {
            animation = false;
        }
    }
    animationFun();
};

const createGameEndLine = function(color, startxPos, startyPos, xLength, yLength) {
    num = 0;

    const animationFun = () => {
        if(num < 45){
            ctx.strokeStyle = color;
            num++;
            ctx.beginPath();
            ctx.moveTo(startxPos, startyPos);
            ctx.lineTo(startxPos + (xLength/45 * num), startyPos + (yLength/45 * num));
            ctx.stroke();
            requestAnimationFrame(animationFun);
        }
    }
    animationFun();
};

const turnChange = () => {
    if(turn) {
        turn = false;
        player.innerText = '1P';
    } else {
        turn = true;
        player.innerText = '2P';
    }
    player.classList.toggle("first");
    player.classList.toggle("second");
};

const setField = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#000";

    lineArr.forEach( (ele) => {
        ctx.moveTo(ele.startXpos, ele.startYpos + filedHeight);
        ctx.lineTo(ele.endXpos, ele.endYpos + filedHeight);
    } )

    ctx.stroke();
    
};

const lineChk = function(obj) {
    
    const array = Array.from(new Set(obj.arr));
    // obj.arr의 배열로 넘어온 값을 Set 함수로 중복 제거
    if(array.length === 1 && array[0] !== 0 && !lineCom){
        // 첫번째 조건 - 중복이 제거 된 값이 총 1개 일때
        // 두번째 조건 - 만약 중복 재거 된값이 0(초기값)이 아닐때
        // 세번째 조건 - 한꺼번에 두개의 라인이 생겨 오류 날수도 있으니 만들어 놓은 보험?
        const div = document.createElement("div");
        div.classList.add("game-over", "flex");

        gameResult = true;
        bool = true;
        div.innerHTML = `
            <h3 id="p_${array[0]}">${array[0]}P 승리!</h3>
            <button class="reset-btn">다시하기</button>
        `;
        root.append(div);
        
        if(obj.num === 1){
            createGameEndLine("#ff0000", filedStartX, filedStartY + (boxSize/2) + (boxSize*obj.idx), boxSize*3, 0);
        } else if(obj.num === 2){
            createGameEndLine("#ff0000", filedStartX + (boxSize/2) + (boxSize*obj.idx), filedStartY, 0, boxSize*3);
        } else {
            if(obj.idx === 0){
                createGameEndLine("#ff0000", filedStartX + 20, filedStartY + 20, boxSize*3 - 40, boxSize*3 - 40);
            } else {
                createGameEndLine("#ff0000", filedEndX - 20, filedStartY + 20, -boxSize*3 + 40, boxSize*3 - 40);
            }
        }

        lineCom = true;
        gameResult = true;
    }
};

const gameOverChk = function() {
    const div = document.createElement("div");
    div.classList.add("game-over", "flex");

    const checkBlock2 = [];
    const checkBlock3 = [];
    let count = 0;

    checkBlock.forEach( (arr, idx1) => {
        const array = [];
        arr.forEach( (ele, idx2) => {
            if(ele !== 0) count += 1;
            array.push(checkBlock[idx2][idx1]);
        } )
        checkBlock2.push(array);

        lineChk({arr, idx: idx1, num: 1});
    } )

    const subarr = [];
    const subarr2 = []
    const arr = [];

    for(let i=0; i<=2; i++){
        subarr.push(checkBlock[i][i]);
    }

    for(let j=2; j>=0; j--){
        arr.push(j);
    }

    arr.forEach( (ele, idx) => {
        subarr2.push(checkBlock[ele][idx]);
    } )

    checkBlock3.push(subarr);
    checkBlock3.push(subarr2);

    checkBlock2.forEach( (arr, idx) => {
        lineChk({arr, idx, num: 2});
    } )

    checkBlock3.forEach( (arr, idx) => {
        lineChk({arr, idx, num: 3});
    } )

    if(!lineCom){
        if(count === 9){
            div.innerHTML = `
                <h3>게임오버</h3>
                <button class="reset-btn">다시하기</button> `;
            root.append(div);
            gameResult = true;
        }
    }
};

const render = function(){
    setField();
    
    checkBlock.forEach( (arr, i) => {
        arr.forEach( (ele, j) => {
            if(ele !== 0){
                if(ele === 1) {
                    ctx.strokeStyle = '#ff0000';
                    ctx.beginPath();
                    ctx.moveTo(filedStartX + (boxSize*j) + 20, filedStartY + (boxSize*i) + 20);
                    ctx.lineTo(filedStartX + (boxSize*(j+1)) - 20, filedStartY + (boxSize*(i+1)) - 20);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(filedStartX + (boxSize*j) + 20, filedStartY + (boxSize*(i+1)) - 20);
                    ctx.lineTo(filedStartX + (boxSize*(j+1)) - 20, filedStartY + (boxSize*i) + 20);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.strokeStyle = '#0000ff';
                    ctx.arc(filedStartX + (boxSize*j) + boxSize/2, filedStartY + (boxSize*i) + boxSize/2, 50, 0, Math.PI * 2, true);
                    ctx.stroke();
                }
            }
        } )
    } )

};

render();


canvas.addEventListener("click", function(e) {
    if(!gameResult && !animation){
        if(e.layerX > filedStartX && e.layerX < filedEndX && e.layerY > filedStartY && e.layerY < filedEndY){
            const first = Math.floor((e.layerY - filedHeight) / boxSize);
            const second = Math.floor((e.layerX - filedWidth) / boxSize);
    
            if(checkBlock[first][second] === 0) {
                turnChange();
                if(turn) {
                    createLine('#ff0000', filedStartX + (boxSize*second) + 20, filedStartY + (boxSize*first) + 20, boxSize - 40, boxSize - 40,
                    filedStartX + (boxSize*(second+1)) - 20, filedStartY + (boxSize*first) + 20, -(boxSize - 40), boxSize - 40);
                    checkBlock[first][second] = 1;
                } else {
                    createCirlce('#0000ff', filedStartX + (boxSize*second) + boxSize/2, filedStartY + (boxSize*first) + boxSize/2);
                    checkBlock[first][second] = 2;
                }

                render();
                gameOverChk();
            }
        }
    }

});

canvas.addEventListener("mousemove", function({layerX, layerY}) {
    canvas.style.cursor = layerX > filedStartX && layerX < filedEndX && layerY > filedStartY && layerY < filedEndY ? 'pointer' : 'auto' ;
});

root.addEventListener("click", function({target}) {
    if(target.classList.contains("reset-btn")){
        document.querySelector("#root .game-over").remove();
        turn = false;
        gameResult = false;
        lineCom = false;
        animation = false;
        checkBlock = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        render();
    }
});
