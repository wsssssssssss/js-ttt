const canvas = document.querySelector("#root .canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 10;
ctx.lineCap = 'round';

let turn = 2;
let gameResult = false;
let linedelete = false;
let animation = false;
let checkBlock =  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

console.log(window.innerWidth);
console.log(window.innerHeight);

const player = document.querySelector("#root .player_box .player");
const root = document.querySelector("#root");
const boxSize = 130;
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
    if(num < 40){
        ctx.strokeStyle = color;
        num++;
        ctx.beginPath();
        ctx.clearRect(xPos - 56, yPos - 56, boxSize - 18, boxSize - 18);
        ctx.arc(xPos, yPos, 50, (Math.PI * 2 / 40) * num, 0, true);
        ctx.stroke();
        requestAnimationFrame(() => createCirlce(color, xPos, yPos));
    }
    
};

const createLine = function(color, startxPos1, startyPos1, xLength1, yLength1, startxPos2, startyPos2, xLength2, yLength2) {
    if(num < 20){
        ctx.strokeStyle = color;
        num++;
        ctx.clearRect(startxPos1 - 5, startyPos1 - 5, xLength1 + 10, yLength1 + 10);
        ctx.beginPath();
        ctx.moveTo(startxPos1, startyPos1);
        ctx.lineTo(startxPos1 + (xLength1/20 * num), startyPos1 + (yLength1/20 * num));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(startxPos2, startyPos2);
        ctx.lineTo(startxPos2 + (xLength2/20 * num), startyPos2 + (yLength2/20 * num));
        ctx.stroke();
        requestAnimationFrame(() => createLine(color, startxPos1, startyPos1, xLength1, yLength1, startxPos2, startyPos2, xLength2, yLength2));
    }

};

const createGameEndLine = function(color, startxPos, startyPos, xLength, yLength) {
    if(num < 45){
        ctx.strokeStyle = color;
        num++;
        ctx.beginPath();
        ctx.moveTo(startxPos, startyPos);
        ctx.lineTo(startxPos + (xLength/45 * num), startyPos + (yLength/45 * num));
        ctx.stroke();
        requestAnimationFrame(() => createGameEndLine(color, startxPos, startyPos, xLength, yLength));
    }
};

const setField = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#000";

    lineArr.forEach( (ele) => {
        ctx.beginPath();
        ctx.moveTo(ele.startXpos, ele.startYpos + filedHeight);
        ctx.lineTo(ele.endXpos, ele.endYpos + filedHeight);
        ctx.stroke();
    } )
};

const lineChk = function(obj) {
    const div = document.createElement("div");
    div.classList.add("game-over", "flex");

    const array = Array.from(new Set(obj.arr));
    if(array.length == 1 && array[0] !== 0 && !linedelete){
        gameResult = true;
        bool = true;
        div.innerHTML = `
            <h3 id="p_${array[0]}">${array[0]}P 승리!</h3>
            <button class="reset-btn">다시하기</button>
        `;
        root.append(div);
        
        num = 0;
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

        linedelete = true;
        gameResult = true;
    }
};

const gameOver = function() {
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

    if(!linedelete){
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

    if(turn === 1) {
        turn = 2;
        player.innerText = '2P';
        player.classList.add("second");
        player.classList.remove("first");
    } else {
        turn = 1;
        player.innerText = '1P';
        player.classList.add("first");
        player.classList.remove("second");
    }

    let color = "#ff0000";    
    checkBlock.forEach( (arr, i) => {
        arr.forEach( (ele, j) => {
            if(ele !== 0){
                if(ele === 1) {
                    color = '#ff0000';
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(filedStartX + (boxSize*j) + 20, filedStartY + (boxSize*i) + 20);
                    ctx.lineTo(filedStartX + (boxSize*(j+1)) - 20, filedStartY + (boxSize*(i+1)) - 20);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(filedStartX + (boxSize*j) + 20, filedStartY + (boxSize*(i+1)) - 20);
                    ctx.lineTo(filedStartX + (boxSize*(j+1)) - 20, filedStartY + (boxSize*i) + 20);
                    ctx.stroke();
                } else {
                    color = '#0000ff';
                    ctx.beginPath();
                    ctx.strokeStyle = color;
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
            let first = -1;
            let second = -1;
            if(e.layerY < lineArr[2].startYpos+filedHeight) first = 0;
            else if(e.layerY > lineArr[2].startYpos+filedHeight && e.layerY < lineArr[3].startYpos+filedHeight) first = 1;
            else if(e.layerY > lineArr[3].startYpos+filedHeight) first = 2;
        
            if(e.layerX < lineArr[0].startXpos) second = 0;
            else if(e.layerX > lineArr[0].startXpos && e.layerX < lineArr[1].startXpos) second = 1;
            else if(e.layerX > lineArr[2].startXpos) second = 2;
    
            if(checkBlock[first][second] === 0) {
                if(turn === 1) {
                    num = 0;
                    createLine('#ff0000', filedStartX + (boxSize*second) + 20, filedStartY + (boxSize*first) + 20, boxSize - 40, boxSize - 40,
                    filedStartX + (boxSize*(second+1)) - 20, filedStartY + (boxSize*first) + 20, -(boxSize - 40), boxSize - 40);
                } else {
                    num = 0;
                    createCirlce('#0000ff', filedStartX + (boxSize*second) + boxSize/2, filedStartY + (boxSize*first) + boxSize/2);
                }
                checkBlock[first][second] = turn;


                render();
                gameOver();
            }
        }
    }

});

canvas.addEventListener("mousemove", function({layerX, layerY}) {
    if(layerX > filedStartX && layerX < filedEndX && layerY > filedStartY && layerY < filedEndY){
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'auto';
    }
});

root.addEventListener("click", function({target}) {
    if(target.classList.contains("reset-btn")){
        document.querySelector("#root .game-over").remove();
        turn = 2;
        gameResult = false;
        linedelete = false;
        animation = false;
        checkBlock = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        render();
    }
});
