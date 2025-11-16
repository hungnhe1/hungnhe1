const slider = document.getElementById("speed");
const label = document.getElementById("speedValue");

slider.oninput = function(){
    label.textContent = this.value;
}


const shark = document.getElementById("shark");
const container = document.getElementById("bgimage");

let x = 100, y = 100;
let vx = 2 * (Math.random() < 0.5 ? -1 : 1);
let vy = (Math.random()*2 - 1);
let moving = true;

let moveStartTime = Date.now();

function randomizeDirection() {
    vx = (Math.random()*2 + 1) * (Math.random() < 0.5 ? -1 : 1);
    vy = (Math.random()*2 - 1);
}

function stopAndTurn() {
    moving = false;

    // cá đứng yên
    setTimeout(() => {
        // quay đầu (đổi hướng)
        vx = -vx;
        vy = -vy;

        // lật ảnh theo hướng bơi mới
        shark.style.transform = vx > 0 ? "scaleX(1)" : "scaleX(-1)";

        // reset giờ
        moveStartTime = Date.now();
        moving = true;
    }, 5000); // đứng yên 5 giây
}

function moveShark() {
    const W = container.clientWidth - shark.clientWidth;
    const H = container.clientHeight - shark.clientHeight;

    if (moving) {

        x += vx;
        y += vy;

        // Đụng tường -> dừng + chờ + quay đầu
        if (x <= 0 || x >= W || y <= 0 || y >= H) {
            stopAndTurn();
        }

        // sau 10 giây bơi -> dừng + chờ + quay đầu
        if (Date.now() - moveStartTime >= 10000) {
            stopAndTurn();
        }

        shark.style.left = x + "px";
        shark.style.top = y + "px";

        // lật mặt khi bơi
        shark.style.transform = vx > 0 ? "scaleX(1)" : "scaleX(-1)";
    }

    requestAnimationFrame(moveShark);
}

moveShark();
