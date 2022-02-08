const arr = document.querySelector(".list").getElementsByTagName("li");
const list = document.querySelector(".list");
const item1 = document.querySelector(".list > li:nth-child(1)");
const item2 = document.querySelector(".list > li:nth-child(2)");
const item3 = document.querySelector(".list > li:nth-child(3)");
const item4 = document.querySelector(".list > li:nth-child(4)");
const item5 = document.querySelector(".list > li:nth-child(5)");
const item6 = document.querySelector(".list > li:nth-child(6)");
const item7 = document.querySelector(".list > li:nth-child(7)");
const item8 = document.querySelector(".list > li:nth-child(8)");
const item9 = document.querySelector(".list > li:nth-child(9)");
const body = document.body;
const msg = document.querySelector(".win-msg");
let trun = "O"

for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", () => {
        if (arr[i].className == "X" || arr[i].className == "O") return;
        if (trun == "X") {
            trun = "O";
            arr[i].className = trun;
            startCanvas(0, arr[i]);
            printResult(trun);
        } else {
            trun = "X";
            arr[i].className = trun;
            startCanvas(1, arr[i]);
            printResult(trun);
        }
    })
    function printResult(x) {
        if (item1.className == x && item2.className == x && item3.className == x) {
            startResult(1);
        } else if (item4.className == x && item5.className == x && item6.className == x) {
            startResult(2);
        } else if (item7.className == x && item8.className == x && item9.className == x) {
            startResult(3);
        } else if (item1.className == x && item4.className == x && item7.className == x) {
            startResult(4);
        } else if (item2.className == x && item5.className == x && item8.className == x) {
            startResult(5);
        } else if (item3.className == x && item6.className == x && item9.className == x) {
            startResult(6);
        } else if (item1.className == x && item5.className == x && item9.className == x) {
            startResult(7);
        } else if (item3.className == x && item5.className == x && item7.className == x) {
            startResult(8);
        } else if(
            (item1.className == "X" || item1.className == "O") &&
            (item2.className == "X" || item2.className == "O") && 
            (item3.className == "X" || item3.className == "O") &&
            (item4.className == "X" || item4.className == "O") &&
            (item5.className == "X" || item5.className == "O") &&
            (item6.className == "X" || item6.className == "O") &&
            (item7.className == "X" || item7.className == "O") &&
            (item8.className == "X" || item8.className == "O") &&
            (item9.className == "X" || item.className == "O")) {
            startResult(9);
        }
    }
}

let userCanvas;
function startCanvas(x, y) {
    userCanvas = document.createElement("canvas");
    userCanvas.setAttribute("width", 200)
    userCanvas.setAttribute("height", 200)
    userCanvas.className = "canvas";
    const line = userCanvas.getContext("2d");
    y.appendChild(userCanvas);
    line.lineWidth = 10;
    const PI = Math.PI * 2;
    let num = 0;
    if (x) {
        function oneFunc1() {
            line.beginPath();
            line.arc(num, num, 8, 0, PI);
            line.fill();
            line.closePath();
            num = num + 3;
            if (num > 200) return;
            requestAnimationFrame(oneFunc1);
        }
        oneFunc1();
        let a = userCanvas.width / 200;
        let b = userCanvas.height;
        let dx = 4;
        let dy = -4;
        function oneFunc2() {
            line.beginPath();
            line.arc(a, b, 8, 0, Math.PI * 2);
            line.fill();
            line.closePath();
            a += dx;
            b += dy;
            if (a > 200) return;
            requestAnimationFrame(oneFunc2);
        }
        setTimeout(() => {
            oneFunc2();
        }, 1000)
    } else {
        for (let i = 0; i < 100; i++) {
            twoFunc(i);
        }
        function twoFunc(time) {
            setTimeout(() => {
                line.clearRect(0, 0, 200, 200);
                line.beginPath();
                line.arc(100, 100, 90, 0, Math.PI * Math.PI / 100 * time);
                line.stroke();
            }, time * 10)
        }
    }
}

let resultCanvas;
function startResult(x) {
    resultCanvas = document.createElement("canvas");
    resultCanvas.setAttribute("width", 900);
    resultCanvas.setAttribute("height", 900);
    resultCanvas.className = "result";
    body.appendChild(resultCanvas);
    const line = resultCanvas.getContext("2d");
    line.lineWidth = 10;
    const PI = Math.PI * 2;
    let num = 0;
    let a = resultCanvas.width / 900;
    let b = resultCanvas.height;
    let dx = 4;
    let dy = -4;
    line.fillStyle = "red";
    switch (x) {
        case 1:
            function funcResult1() {
                line.beginPath();
                line.arc(num, 150, 8, 0, PI);
                line.fill();
                line.closePath();
                num = num + 3;
                if (num > 900) return;
                requestAnimationFrame(funcResult1);
            }
            funcResult1(); msg.innerText = `${trun}님 우승`; break;
        case 2:
            function funcResult2() {
                line.beginPath();
                line.arc(num, 450, 8, 0, PI);
                line.fill();
                line.closePath();
                num = num + 3;
                if (num > 900) return;
                requestAnimationFrame(funcResult2);
            }
            funcResult2(); msg.innerText = `${trun}님 우승`; break;
        case 3:
            function funcResult3() {
                line.beginPath();
                line.arc(num, 750, 8, 0, PI);
                line.fill();
                line.closePath();
                num = num + 3;
                if (num > 900) return;
                requestAnimationFrame(funcResult3);
            }
            funcResult3(); msg.innerText = `${trun}님 우승`; break;
        case 4:
            function funcResult4() {
                line.beginPath();
                line.arc(150, num, 8, 0, PI);
                line.fill()
                line.closePath();
                num = num + 3;
                if (num > 900) return;
                requestAnimationFrame(funcResult4);
            }
            funcResult4(); msg.innerText = `${trun}님 우승`; break;
        case 5:
            function funcResult5() {
                line.beginPath();
                line.arc(450, num, 8, 0, PI);
                line.fill()
                line.closePath();
                num = num + 3;
                if (num > 900)  return;
                requestAnimationFrame(funcResult5);
            }
            funcResult5(); msg.innerText = `${trun}님 우승`; break;
        case 6:
            function funcResult6() {
                line.beginPath();
                line.arc(750, num, 8, 0, PI);
                line.fill()
                line.closePath();
                num = num + 3;
                if (num > 900) return;
                requestAnimationFrame(funcResult6);
            }
            funcResult6(); msg.innerText = `${trun}님 우승`; break;
        case 7:
            function funcResult7() {
                line.beginPath();
                line.arc(num, num, 8, 0, PI);
                line.fill();
                line.closePath();
                num = num + 3;
                if (num > 900) return;
                requestAnimationFrame(funcResult7);
            }
            funcResult7(); msg.innerText = `${trun}님 우승`; break;
        case 8:
            function funcResult8() {
                line.beginPath();
                line.arc(a, b, 8, 0, Math.PI * 2);
                line.fill();
                line.closePath();
                a += dx;
                b += dy;
                if (a > 900) return;
                requestAnimationFrame(funcResult8);
            }
            funcResult8(); msg.innerText = `${trun}님 우승`; break;
        case 9: resetGame(); msg.innerText = "무승부";
    }
    resetGame();
}

function resetGame() {
    const createBtn = document.createElement("button");
    const btnText = document.createTextNode("다시하기");
    createBtn.className = "btn"
    createBtn.appendChild(btnText)
    body.appendChild(createBtn);
    createBtn.addEventListener("click", () => {
        location.reload();
    })
}