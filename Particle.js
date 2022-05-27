
class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.width = 150;
        this.height = 150;
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.drawImage(vuno,this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
    CollideParticle(enemy) {
        this.x = enemy.x - enemy.width/2.5 ;
        this.y = enemy.y - enemy.height/2;
    }

}