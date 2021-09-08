function Bomb(pos, img){
    this.pos = pos;
    this.img = img;
}

Bomb.prototype.draw = function(ctx){
    ctx.drawImage(this.img, this.pos[0], this.pos[1], 50, 50);
}

module.exports = Bomb;