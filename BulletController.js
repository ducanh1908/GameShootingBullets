class BulletController {
    bullets = [];
    thoigianviendantieptheo = 0;

    constructor(canvas) {
        this.canvas = canvas;
        this.sound = new Audio("sound/sounds_shoot.mp3")
    }

    shoot(x, y, speed, damage, delay) {
        if(this.thoigianviendantieptheo <= 0){
            this.bullets.push(new Bullet(x,y,speed,damage));
            this.thoigianviendantieptheo = delay;
            this.sound.play();
        }
        this.thoigianviendantieptheo--;
    }

    drawBulletController() {
        this.bullets.forEach((bullet) => {
            if (this.isBulletOffScreen(bullet)) {
                let index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
            }
            bullet.drawBullet(ctx);
        });
    }

    collideWith(sprite){
        return this.bullets.some(bullet => {
            if(bullet.collideWith(sprite)){
                this.bullets.splice(this.bullets.indexOf(bullet),1);
                return true;
            }
           return false;
        })
    }

    isBulletOffScreen(bullet) {
        return bullet.y <= bullet.height;
    }
}
