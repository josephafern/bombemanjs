function Bomber(object){
    this.pos = object.pos;
    this.vel = object.vel;
    this.color = object.color;
}

Bomber.prototype.draw = function(context){
    let char = new Image();
    let x = this.pos[0];
    let y = this.pos[1]
    char.onload = function(){
        context.drawImage(char, x, y, 80, 80);
    };
    char.src = '../dist/bomber.jpg';
}

module.exports = Bomber;