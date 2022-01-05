const canvas = document.querySelector("#root .canvas");
const ctx = canvas.getContext('2d');
ctx.lineWidth = 10;
ctx.lineCap = 'round';

let turn = 2;
let gameResult = false;
let linedelete = false;
let checkBlock =  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

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

// const createCirlce = function(color, xPos, Ypos) {
//     ctx.strokeStyle = color;
//     ctx.beginPath();
//     ctx.arc(filedStartX + (boxSize*second) + boxSize/2, filedStartY + (boxSize*first) + boxSize/2, 50, 0, Math.PI * 2, true);
//     ctx.stroke();
// };

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



const lineDel = function(obj) {
    const div = document.createElement("div");
    div.classList.add("game-over", "flex");

    const array = Array.from(new Set(obj.arr));
    if(array.length == 1 && array[0] !== 0 && !linedelete){
        div.innerHTML = `
            <h3 id="p_${array[0]}">${array[0]}P 승리!</h3>
            <button class="reset-btn">다시하기</button>
        `;
        root.append(div);
        render();
        
        ctx.strokeStyle = "#ff0000";
        if(obj.num === 1){
            ctx.beginPath();
            ctx.moveTo(filedStartX, filedStartY + (boxSize/2) + (boxSize*obj.idx));
            ctx.lineTo(filedEndX, filedStartY + (boxSize/2) + (boxSize*obj.idx));
            ctx.stroke();
        } else if(obj.num === 2){
            ctx.beginPath();
            ctx.moveTo(filedStartX + (boxSize/2) + (boxSize*obj.idx), filedStartY);
            ctx.lineTo(filedStartX + (boxSize/2) + (boxSize*obj.idx), filedEndY);
            ctx.stroke();
        } else {
            if(obj.idx === 0){
                ctx.beginPath();
                ctx.moveTo(filedStartX + 20, filedStartY + 20);
                ctx.lineTo(filedEndX - 20, filedEndY - 20);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(filedEndX - 20, filedStartY + 20);
                ctx.lineTo(filedStartX + 20, filedEndY - 20);
                ctx.stroke();
            }
        }
        
        linedelete = true;
        gameResult = true;
        
        return false;
    }
}

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

        lineDel({arr, idx: idx1, num: 1});
        
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
        lineDel({arr, idx, num: 2});
    } )

    checkBlock3.forEach( (arr, idx) => {
        lineDel({arr, idx, num: 3});
    } )

    if(!linedelete){
        if(count === 9){
            div.innerHTML = `
                <h3>게임오버</h3>
                <button class="reset-btn">다시하기</button> `;
            root.append(div);
            render();
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


canvas.addEventListener("click", function({layerX, layerY}) {
    if(!gameResult){
        if(layerX > filedStartX && layerX < filedEndX && layerY > filedStartY && layerY < filedEndY){
            let first = -1;
            let second = -1;
            if(layerY < lineArr[2].startYpos+filedHeight) first = 0;
            else if(layerY > lineArr[2].startYpos+filedHeight && layerY < lineArr[3].startYpos+filedHeight) first = 1;
            else if(layerY > lineArr[3].startYpos+filedHeight) first = 2;
        
            if(layerX < lineArr[0].startXpos) second = 0;
            else if(layerX > lineArr[0].startXpos && layerX < lineArr[1].startXpos) second = 1;
            else if(layerX > lineArr[2].startXpos) second = 2;
    
            if(checkBlock[first][second] === 0) {


                // if(turn === 1) {
                //     ctx.strokeStyle = '#ff0000';
                //     ctx.beginPath();
                //     ctx.moveTo(filedStartX + (boxSize*second) + 20, filedStartY + (boxSize*first) + 20);
                //     ctx.lineTo(filedStartX + (boxSize*(second+1)) - 20, filedStartY + (boxSize*(first+1)) - 20);
                //     ctx.stroke();
                //     ctx.beginPath();
                //     ctx.moveTo(filedStartX + (boxSize*second) + 20, filedStartY + (boxSize*(first+1)) - 20);
                //     ctx.lineTo(filedStartX + (boxSize*(second+1)) - 20, filedStartY + (boxSize*first) + 20);
                //     ctx.stroke();
                // } else {
                //     createCirlce('#0000ff', filedStartX + (boxSize*second) + boxSize/2, filedStartY + (boxSize*first) + boxSize/2);
                // }

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
        checkBlock = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        render();
    }
})



// ctx.fillStyle = "rgb(255, 0, 0)";
// ctx.fillRect(10, 10, 50, 50);

// ctx.fillRect(25, 25, 100, 100);
// ctx.clearRect(45, 45, 60, 60);
// ctx.storkeRect(50, 50, 50, 50);



// ctx.moveTo(50, 50);
// ctx.lineTo(100, 50);
// ctx.lineTo(100, 100);
// ctx.lineTo(50, 100);
// ctx.fill();

// console.log(Math.PI * 2);

// let pp = 0;

// function draw() {
//     ctx.beginPath();
//     ctx.arc(75, 75, 50, 0, ((Math.PI * 2) / 100) * pp, true);
//     ctx.stroke();
//     console.log(pp);
//     if(pp < 100){
//         pp += 1;
//         requestAnimationFrame(draw);
//     }
// }

// draw();

// ctx.beginPath();
// ctx.arc(75, 75, 50, 0, Math.PI * 1.5, true);
// ctx.stroke();
// let x = 0;
// function draw() {
//     ctx.beginPath();
//     ctx.arc(x, 150, 10, 0, Math.PI * 2, false);
//     ctx.closePath();
//     ctx.fill();
//     x += 2;

// requestAnimationFrame(draw);
// }

// draw();

// var start = Math.PI * 1.5 / 100;
// animate(start);


// function animate(current) {
//   var ctx = document.querySelector('requestCanvas');
//   requestAnimationFrame() {
//     ctx.arc(100, 100, 50, 0, current);
//     if (current < Math.PI * 1.5) {
//       current += current;
//       animate(current);
//     }
//   }
// }