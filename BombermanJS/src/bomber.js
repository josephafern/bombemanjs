const Bomb = require('./bomb.js');

const BOMB_VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];

function Bomber(info){
    this.pos = info.pos;
    this.color = info.color;
    this.board = info.board;
    this.bombDropped = false;
}

Bomber.prototype.draw = function(context){ 
    context.drawImage(this.img, this.pos[0], this.pos[1], 50, 50);
}

Bomber.prototype.createBomber = function(){
    let img = new Image();
    let x = this.pos[0];
    let y = this.pos[1];
    img.src = '../dist/bomber.png';
    this.img = img;
}

Bomber.prototype.move = function(pos){
    let newX = this.pos[0] + pos[0];
    let newY = this.pos[1] + pos[1];
    if (this.board.validMove([newX, newY], this.board.bricks)){
        this.pos[0] += pos[0];
        this.pos[1] += pos[1];
    }
   
}

Bomber.prototype.dropBomb = function(ctx){
    if (!this.bombDropped){
        let x = this.pos[0];
        let y = this.pos[1];
        let img = new Image();
        let that = this;
        img.src = '../dist/bomb.png';
        let bomb = new Bomb([x, y], img)
        this.bombDropped = true;
        this.board.bombs.push(bomb);
        setTimeout(() => {
            let bomb = that.board.bombs.shift();
            bomb.style = 'display:none';
            that.board.isExploded(bomb.pos);
            this.bombDropped = false;
            that.board.draw(ctx);
        }, 3000);
    }
}

module.exports = Bomber;