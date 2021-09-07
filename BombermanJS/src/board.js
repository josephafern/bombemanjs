const Block = require("./block.js");

function Board(){
  this.walls = [];
}

const WALL_CORD = [[0,0], [0,1], [0,2], [0,3], [0,4]];

Board.prototype.draw = function(ctx){
  // let x = 0;
  // let y = -80;
  // for (let i = 0; i < 8; i++){
  //   y += 80;
  //   let img = new Image();
  //   img.onload = function(){
  //       ctx.drawImage(img, x, y, 80, 80);
  //   };
  //   img.src = '../dist/stone.png';
  // }
    for (let i=0; i< this.walls.length; i++){
      let char = new Image();
      console.log(char);
      char.onload = function(){
        ctx.drawImage(char, this.walls[i].pos[0], this.walls[i].pos[1], 80, 80);
      };
      char.src = '../dist/stone.png';
    }
}
  Board.prototype.buildWall = function(ctx){
    for (let i = 0; i < WALL_CORD.length; i++){
      this.walls.push(new Block(WALL_CORD[i], false));
    }
  }
  
    
    
  


module.exports = Board;