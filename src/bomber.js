const Bomb = require('./bomb.js');

const BOMB_VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];


function Bomber(info){
    this.pos = info.pos;
    this.color = info.color;
    this.board = info.board;
    this.bombDropped = false;
    this.poweredUp = false;
    this.unlimited = false;
    this.exp_sound = new Audio('./dist/exp_sound.mp3');
    this.exp_sound.volume = 0.05;
    this.alreadyPowered = false;
    this.alreadyUnlimited = false;
}

Bomber.prototype.draw = function(context){ 
    context.drawImage(this.img, this.pos[0], this.pos[1], 50, 50);
}

Bomber.prototype.createBomber = function(url){
    let img = new Image();
    let x = this.pos[0];
    let y = this.pos[1];
    img.src = url;
    this.img = img;
}

Bomber.prototype.move = function(pos){
    
    let newX = this.pos[0] + pos[0];
    let newY = this.pos[1] + pos[1];
    if (this.board.validMove([newX, newY], this.board.bricks, this.board.bombPositions())){
        this.pos = [newX, newY];
        if (this.board.samePos(this.pos, [350, 250]) && !this.alreadyPowered){
            this.poweredUp = true;
            this.board.removePowerUp();
            this.alreadyPowered = true;
            setTimeout(() => {
                this.poweredUp = false;
            }, 30000);
            setTimeout(() => {
                this.board.addUnlimited();
            }, 10000);
        } 
        if (this.board.samePos(this.pos, [350, 250]) && !this.alreadyUnlimited && this.board.isUnlimited()){
            this.unlimited = true;
            this.board.removeUnlimited();
            this.alreadyUnlimited = true;
            setTimeout(() => {
                this.unlimited = false;
            }, 30000);
        }
        
    }
   
}

Bomber.prototype.dropBomb = function(ctx){
    if (!this.bombDropped){
        let x = this.pos[0];
        let y = this.pos[1];
        let img = new Image();
        let that = this;
        img.src = './dist/bomb.png';
        let bomb = new Bomb([x, y], img)
        if (!this.unlimited) this.bombDropped = true;
        this.board.bombs.push(bomb);
        setTimeout(() => {
            let bomb = that.board.bombs.shift();
            bomb.style = 'display:none';
            let dead = that.board.isExploded(bomb.pos, this.poweredUp);
            if (dead.length) {
                that.board.endGame(dead);
            }
            this.bombDropped = false;
            that.board.draw(ctx);
            let muteBtn = document.getElementById('mute');
            if (muteBtn.innerText === 'Mute') this.exp_sound.play();
        }, 3000);
    }
}

Bomber.prototype.audioObj = function () {
    return this.exp_sound;
}

module.exports = Bomber;