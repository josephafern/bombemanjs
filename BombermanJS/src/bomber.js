const Bomb = require('./bomb.js');

function Bomber(object){
    this.pos = object.pos;
    this.vel = object.vel;
    this.color = object.color;
    this.board = object.board;
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
    if (this.validMove([newX, newY])){
        this.pos[0] += pos[0];
        this.pos[1] += pos[1];
    }
   
}

Bomber.prototype.validMove = function(pos){
    return !this.board.field_blocks.some(blockPos => {
        let flag = true;
        pos.forEach((item, i) => {
            if (item !== blockPos[i]) flag = false;
        });
        return flag;
    });
}

Bomber.prototype.dropBomb = function(){
    let x = this.pos[0];
    let y = this.pos[1];
    let img = new Image();
    img.src = '../dist/bomb.png';
    this.board.bombs.push(new Bomb([x, y], img));
}

module.exports = Bomber;