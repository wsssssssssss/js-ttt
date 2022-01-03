const canvas = document.querySelector("#root .canvas");
const ctx = canvas.getContext('2d');

let turn = 1;
const player = document.querySelector("#root .player_box .player");
const boxSize = 120;
const boradHeight = window.innerHeight / 2 - boxSize;
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


const checkBlock =  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const setField = function() {
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';

    player.innerText = '1P';
    player.classList.add("first");
    
    lineArr.forEach( (ele) => {
        ctx.beginPath();
        ctx.moveTo(ele.startXpos, ele.startYpos + boradHeight);
        ctx.lineTo(ele.endXpos, ele.endYpos + boradHeight);
        ctx.stroke();
    } )
}

setField();


canvas.addEventListener("click", function({layerX, layerY}) {
    const boradStartX = window.innerWidth/2 - (boxSize*3)/2;
    const boradEndX = window.innerWidth/2 + (boxSize*3)/2;
    const boradStartY = boradHeight;
    const boradEndY = boradHeight + (boxSize*3);

    // console.log(boradStartY, boradEndY);
    if(layerX > boradStartX && layerX < boradEndX && layerY > boradStartY && layerY < boradEndY){
        let first = -1;
        let second = -1;
        if(layerY < lineArr[2].startYpos+boradHeight) first = 0;
        else if(layerY > lineArr[2].startYpos+boradHeight && layerY < lineArr[3].startYpos+boradHeight) first = 1;
        else if(layerY > lineArr[3].startYpos+boradHeight) first = 2;
    
        if(layerX < lineArr[0].startXpos) second = 0;
        else if(layerX > lineArr[0].startXpos && layerX < lineArr[1].startXpos) second = 1;
        else if(layerX > lineArr[2].startXpos) second = 2;

        if(checkBlock[first][second] === 0) {
            checkBlock[first][second] = turn;

            if(turn === 1) turn = 2
            else if(turn === 2) turn = 1;
        }
        // console.log(first, second, turn);
        console.log(checkBlock[0]);
        console.log(checkBlock[1]);
        console.log(checkBlock[2]);
        console.log('--------');
    }


    // console.log(layerX, layerY);
    // console.log(lineArr[0].startXpos, lineArr[2].startYpos + window.innerHeight / 2 - boxSize);
    // console.log(lineArr[1].startXpos, lineArr[3].startYpos + window.innerHeight / 2 - boxSize);
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