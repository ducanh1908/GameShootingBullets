class Bullet {
    colors = [
        "red",
        "blue",
        "pink",
        "green",
        "grey"
    ];
    constructor(x,y,speed,damage) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;

        this.width = 5;
        this.height = 15;
        this.color = this.colors[Math.floor(Math.random()* this.colors.length)];
    }
    drawBullet(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.y -= this.speed;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "red";
        ctx.lineJoin = "bevel";
        ctx.lineWidth = 1;
        ctx.closePath();
    }

    collideWith(sprite){
        if(this.x  < sprite.x + sprite.width &&
            this.x + this.width > sprite.x &&
            this.y  < sprite.y + sprite.height &&
            this.y + this.height > sprite.y) {

            sprite.takeDamage(this.damage);
            return true;
        }
      return false;
    }
}