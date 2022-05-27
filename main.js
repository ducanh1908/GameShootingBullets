let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const enemyImg = document.getElementById("enemy");
let playerImg = document.getElementById('player');
let vuno = document.getElementById('vu_no');
canvas.width = 1000;
canvas.height = 600;

let img = new Image();
img.src = "img/space.png";
let explosion = new Audio("sound/bomno1.mp3");
let soundTrack = new Audio("sound/nhac_nen.mp3");

let bulletController = new BulletController(canvas);
let player = new Player(canvas.width / 2, canvas.height / 1.3, bulletController);
let particle = new Particle(50,50);



let scores = 0;
let enemies = [];
let speed = 2;
document.getElementById('btn_reset').addEventListener('click',function (){
    location.reload();
});
document.getElementById('btn_start').addEventListener('click',function (){
    creatEnemy();
    loadEnemy();
});
function creatEnemy() {
    setInterval(() => {
        let w = 100;
        let h = 50;
        let y = 0;
        let x = Math.random() * Math.abs(canvas.width - h);
        let health = Math.floor(Math.random() *10);
        enemies.push(new Enemy(x, y, w, h, speed, health));

    }, 500);
}

function gameLoad() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    player.drawPlayer(ctx);
    bulletController.drawBulletController(ctx);
    gameOver();

}

let isGameOver = false;

function loadEnemy() {
    let enemyID = requestAnimationFrame(loadEnemy);
    for(let enemy of enemies) {
        if (bulletController.collideWith(enemy)) {
            if (enemy.health <= 0) {
                let index = enemies.indexOf(enemy);
                enemies.splice(index, 1);
                explosion.play();
                scores++;
                particle.CollideParticle(enemy);
                particle.draw(ctx);

            }
            document.getElementById('scores').innerHTML = `${scores}`;
            if(scores > 10) {

                speed = 5;
            }
        } else {
            enemy.drawEnemy(ctx);
            enemy.update();
            soundTrack.play();
        }
    }

    /*enemies.forEach((enemy) => {
        if (bulletController.collideWith(enemy)) {
            if (enemy.health <= 0) {
                let index = enemies.indexOf(enemy);
                enemies.splice(index, 1);
                scores++;

            }
            document.getElementById('scores').innerHTML = `${scores}`;
            if(scores > 10) {
                speed = 10;
            }
        } else {
            enemy.drawEnemy(ctx);
            enemy.update();
            soundTrack.play();
        }
    });*/
    enemies.forEach((enemy) => {
        if (player.handleCollide(enemy)) {
            isGameOver = true;
            cancelAnimationFrame(enemyID);
        }
    });

}
function gameOver() {
    if (isGameOver) {
        ctx.fillStyle = "white";
        ctx.font = "90px Verdana";
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;
        ctx.fillText(`Scores:${scores}`, canvas.width / 5, canvas.height/3);

        ctx.fillText("Game Over!", canvas.width / 5, canvas.height / 1.8);
    }
}


setInterval(gameLoad, 1000 / 60);