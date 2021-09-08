const Block = require("./block.js");


function Board(){
  this.walls = [];
  this.bombers = [];
  this.bombs = [];
  this.field_blocks = [];
}

Board.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, 850, 650);
  this.bombs.forEach(bomb => {
    bomb.draw(ctx);
  });
  this.bombers.forEach(bomber => {
    bomber.draw(ctx);
  });
  // for (let i = 0; i < 16; i ++ ){
  //   if (!this.bool) this.field_blocks.push([i * 50, 0]);
  //   let char = new Image();
  //   char.onload = function () {
  //     ctx.drawImage(this, (50 * i), 0, 50, 50);
  //   };
  //   char.src = '../dist/stone.png';
  // }
  // for (let i = 0; i < 17; i++) {
  //   if (!this.bool) this.field_blocks.push([i * 50, 600]);
  //   let char = new Image();
  //   char.onload = function () {
  //     ctx.drawImage(this, (50 * i), 600, 50, 50);
  //   };
  //   char.src = '../dist/stone.png';
  // }
  // for (let i = 0; i < 12; i++) {
  //   if (!this.bool) this.field_blocks.push([0, i * 50]);
  //   let char = new Image();
  //   char.onload = function () {
  //     ctx.drawImage(this, 0, (50 * i), 50, 50);
  //   };
  //   char.src = '../dist/stone.png';
  // }
  // for (let i = 0; i < 12; i++) {
  //   if (!this.bool) this.field_blocks.push([800, i * 50]);
  //   let char = new Image();
  //   char.onload = function () {
  //     ctx.drawImage(this, 800, (50 * i), 50, 50);
  //   };
  //   char.src = '../dist/stone.png';
  // }
  // for (let i = 1; i < 8; i ++){
  //   for (let j = 1; j < 6; j ++){
  //     if (!this.bool) this.field_blocks.push([i * 100, j * 100]);
  //     let char = new Image();
  //     char.onload = function () {
  //       ctx.drawImage(this, i * 100, j * 100, 50, 50);
  //     };
  //     char.src = '../dist/stone.png';
  //   }
  // }
  
  // if (!this.bool) this.bool = true;
  
}

Board.prototype.initializeBoard = function(ctx){
  for (let i = 0; i < 16; i++) {
    this.field_blocks.push([i * 50, 0]);
    let char = new Image();
    char.onload = function () {
      ctx.drawImage(this, (50 * i), 0, 50, 50);
    };
    char.src = '../dist/stone.png';
  }
  for (let i = 0; i < 17; i++) {
    this.field_blocks.push([i * 50, 600]);
    let char = new Image();
    char.onload = function () {
      ctx.drawImage(this, (50 * i), 600, 50, 50);
    };
    char.src = '../dist/stone.png';
  }
  for (let i = 0; i < 12; i++) {
    this.field_blocks.push([0, i * 50]);
    let char = new Image();
    char.onload = function () {
      ctx.drawImage(this, 0, (50 * i), 50, 50);
    };
    char.src = '../dist/stone.png';
  }
  for (let i = 0; i < 12; i++) {
    this.field_blocks.push([800, i * 50]);
    let char = new Image();
    char.onload = function () {
      ctx.drawImage(this, 800, (50 * i), 50, 50);
    };
    char.src = '../dist/stone.png';
  }
  for (let i = 1; i < 8; i++) {
    for (let j = 1; j < 6; j++) {
    this.field_blocks.push([i * 100, j * 100]);
      let char = new Image();
      char.onload = function () {
        ctx.drawImage(this, i * 100, j * 100, 50, 50);
      };
      char.src = '../dist/stone.png';
    }
  }
}

Board.prototype.addBomber = function(bomber){
  this.bombers.push(bomber);
}
  
    
    
  


module.exports = Board;