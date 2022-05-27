
class Player {
    x;
    y;

    constructor(x, y, bulletController) {
        this.x = x;
        this.y = y;
        this.bulletController = bulletController;

        this.width = 80;
        this.height = 60;
        this.speed = 10;

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    drawPlayer(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.drawImage(playerImg,this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 20;
        ctx.shadowColor = "yellow";
        ctx.lineJoin = "bevel"
        ctx.lineWidth = 1;
        this.move();
        this.handlePlayer();
        this.shoot();
        ctx.closePath();
    }

    shoot() {
        if(this.shootPressed){
            let speed = 10;
            let delay = 5;
            let damage = 1;
            let bulletX = this.x + this.width/2;
            let bulletY =  this.y;
            this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
        }
    }
    handleCollide(enemy) {
       if(this.x  < enemy.x + enemy.width -20 &&
           this.x + this.width > enemy.x-20 &&
           this.y  < enemy.y + enemy.height -20 &&
           this.y + this.height > enemy.y -20) {
           return true;
       }
       return false;
    }
    handlePlayer() {
        if (this.x < 0) {
            this.x = 5;
        }
        if (this.x > canvas.width - this.width - 5) {
            this.x = canvas.width - this.width - 5;
        }
        if (this.y > canvas.height - this.height - 5) {
            this.y = canvas.height - this.height - 5;
        }
    }
    move() {
        if (this.upPressed) {
            this.y -= this.speed;
        }
        if (this.downPressed) {
            this.y += this.speed;
        }
        if (this.leftPressed) {
            this.x -= this.speed;
        }
        if (this.rightPressed) {
            this.x += this.speed;
        }
    }

    keydown = (event) => {
        if (event.code === "ArrowUp") {
            this.upPressed = true;
        }
        if (event.code === "ArrowDown") {
            this.downPressed = true;
        }
        if (event.code === "ArrowLeft") {
            this.leftPressed = true;
        }
        if (event.code === "ArrowRight") {
            this.rightPressed = true;
        }
        if(event.code === "Space") {
            this.shootPressed = true;
        }
    }
    keyup = (event) => {
        if (event.code === "ArrowUp") {
            this.upPressed = false;
        }
        if (event.code === "ArrowDown") {
            this.downPressed = false;
        }
        if (event.code === "ArrowLeft") {
            this.leftPressed = false;
        }
        if (event.code === "ArrowRight") {
            this.rightPressed = false;
        }
        if(event.code === "Space") {
            this.shootPressed = false;
        }
    }
}