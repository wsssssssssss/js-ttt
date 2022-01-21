console.log('hello world');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const h1 = document.querySelector("h1");
const btn = document.querySelector("button");
const cover = document.getElementById("cover");
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let player = 1;
drawBoard();
canvas.onclick = event => {
    let x = event.clientX - ctx.canvas.offsetLeft;
    let y = event.clientY - ctx.canvas.offsetTop;
    let boxNum; // 클릭한 위치의 칸
    if (x < 200) {
        x = 100;
    } else if (x > 200 && x < 400) {
        x = 300;
    } else if (x > 400 && x < 600) {
        x = 500;
    }
    if (y < 200) {
        y = 100;
    } else if (y > 200 && y < 400) {
        y = 300;
    } else if (y > 400 && y < 600) {
        y = 500;
    }
    boxNum = boxIdx(x, y);
    for (let i = 0; i < 9; i++) {
        if (boxNum == i) {
            if (board[i] == 0) { // 빈 칸
                if (player) {
                    requestAnimationFrame(drawO);
                    board[i] = 1;
                        check(1);
                } else {
                    requestAnimationFrame(drawX);
                    board[i] = 2;
                        check(2);
                }
                player = player == 1 ? 0 : 1;
            }
        }
    }

    let count = 0;
    function drawO() {
        count += 2;
        ctx.strokeStyle = "black";
        if (count <= 100) {
            ctx.beginPath();
            ctx.clearRect(x - 90, y - 90, 180, 180);
            ctx.arc(x, y, 80, 0, (Math.PI * 2 / 100) * count);
            ctx.stroke();

            requestAnimationFrame(drawO);
        }
    }

    let cnt = 0;
    function drawX() {
        cnt += 4;
        ctx.strokeStyle = "black";
        if (cnt <= 160) {
            ctx.beginPath();
            ctx.clearRect(x - 90, y - 90, 180, 180);
            ctx.moveTo(x - 80, y - 80);
            ctx.lineTo(x - 80 + cnt, y - 80 + cnt);
            ctx.moveTo(x + 80, y - 80);
            ctx.lineTo(x + 80 - cnt, y - 80 + cnt);
            ctx.stroke();

            requestAnimationFrame(drawX);
        }
    }
}


function drawBoard() { // 3 X 3 게임판
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(200, 5);
    ctx.lineTo(200, 600);
    ctx.moveTo(400, 5);
    ctx.lineTo(400, 600);
    ctx.moveTo(5, 200);
    ctx.lineTo(600, 200);
    ctx.moveTo(5, 400);
    ctx.lineTo(600, 400);
    ctx.stroke();
}
function boxIdx(x, y) {
    if (x == 100 && y == 100) {
        return "0";
    } else if (x == 300 && y == 100) {
        return "1";
    } else if (x == 500 && y == 100) {
        return "2";
    } else if (x == 100 && y == 300) {
        return "3";
    } else if (x == 300 && y == 300) {
        return "4";
    } else if (x == 500 && y == 300) {
        return "5";
    } else if (x == 100 && y == 500) {
        return "6";
    } else if (x == 300 && y == 500) {
        return "7";
    } else if (x == 500 && y == 500) {
        return "8";
    }
}
function win(x, y, z, p) {
    if (p == board[x] && p == board[y] && p == board[z]) {
        return true;
    }
}
function check(p) {
    let user;
    user = p == 1 ? "O" : "X";
    setTimeout(() => {
        switch (true) {
            case win(0, 1, 2, p):
                winner1();
                h1.innerText = `${user} 승리`;
                btn.classList.remove("hide");
                cover.classList.replace("open", "close");
                break;
            case win(3, 4, 5, p):
                winner2();
                h1.innerText = `${user} 승리`;
                btn.classList.remove("hide");
                cover.classList.replace("open", "close");
                break;
            case win(6, 7, 8, p):
                winner3();
                h1.innerText = `${user} 승리`;
                btn.classList.remove("hide");
                cover.classList.replace("open", "close");
                break;
            case win(0, 3, 6, p):
                winner4();
                h1.innerText = `${user} 승리`;
                btn.classList.remove("hide");
                cover.classList.replace("open", "close");
                break;
            case win(1, 4, 7, p):
                winner5();
                h1.innerText = `${user} 승리`;
                btn.classList.remove("hide");
                cover.classList.replace("open", "close");
                break;
            case win(2, 5, 8, p):
                winner6();
                h1.innerText = `${user} 승리`;
                btn.classList.remove("hide");
                cover.classList.replace("open", "close");
                break;
            case win(0, 4, 8, p):
                winner7();
                h1.innerText = `${user} 승리`;
                btn.classList.remove("hide");
                cover.classList.replace("open", "close");
                break;
            case win(2, 4, 6, p):
                winner8();
                h1.innerText = `${user} 승리`;
                btn.classList.remove("hide");
                cover.classList.replace("open", "close");
                break;
            default:
                if(board.indexOf(0) === -1) {
                    h1.innerText = `무승부`;
                    btn.classList.remove("hide");
                    cover.classList.replace("open", "close");
                }
                break;
        }
    }, 1000);
}
let num = 0;
function winner1() {
    num += 6;
    if(num <= 600) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(num, 100);
        ctx.stroke();
        
        requestAnimationFrame(winner1);
    }
}
function winner2() {
    num += 6;
    if(num <= 600) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 300);
        ctx.lineTo(num, 300);
        ctx.stroke();
    
        requestAnimationFrame(winner2);
    }
}
function winner3() {
    num += 6;
    if(num <= 600) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 500);
        ctx.lineTo(num, 500);
        ctx.stroke();
    
        requestAnimationFrame(winner3);
    }
}
function winner4() {
    num += 6;
    if(num <= 600) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, num);
        ctx.stroke();
    
        requestAnimationFrame(winner4);
    }
}
function winner5() {
    num += 6;
    if(num <= 600) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(300, 0);
        ctx.lineTo(300, num);
        ctx.stroke();
    
        requestAnimationFrame(winner5);
    }
}
function winner6() {
    num += 6;
    if(num <= 600) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(500, 0);
        ctx.lineTo(500, num);
        ctx.stroke();
    
        requestAnimationFrame(winner6);
    }
}
function winner7() { // 0, 0, 600, 600
    num += 6;
    if(num <= 600) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(num, num);
        ctx.stroke();
    
        requestAnimationFrame(winner7);
    }
}
function winner8() { // 600, 0, 0, 600
    num += 6;
    if(num <= 600) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(600, 0);
        ctx.lineTo(600 - num, num);
        ctx.stroke();
    
        requestAnimationFrame(winner8);
    }
}
btn.addEventListener("click", () => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    player = 1;
    num = 0;
    h1.innerText = "";
    btn.classList.add("hide");
    cover.classList.replace("close", "open");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.stroke();
    drawBoard();
});