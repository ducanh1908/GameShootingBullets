
class Enemy {
    colors = [
        "red",
        "blue",
        "pink",
        "green",
        "grey",
        "Aqua",
        "Aqua" ,
        "Silver" ,
        "Teal" ,
        "Purple"
    ];
    constructor(x, y, width, height,speed,health) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
        this.speed = speed;
        this.health = health;
        this.color = this.colors[Math.floor(Math.random()* this.colors.length)];
    }

    drawEnemy(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        /*if (this.health > 1) {
            ctx.strokeStyle = "white";
        } else {
            ctx.strokeStyle = this.color;
        }*/
        ctx.drawImage(enemyImg,this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "black"
        ctx.shadowColor = "black";
        ctx.font = "25px Arial";
        ctx.fillText(this.health, this.x + this.width/2.5, this.y+this.height/1.5);
        ctx.closePath();
    }

    update(){
        this.y = this.y + this.speed;
    }

    takeDamage(damage) {
        this.health -= damage;
    }

}
