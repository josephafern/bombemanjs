

const BOMB_VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];
const BRICK_PRESETS = {
  one: [[50, 100], [50, 150], [50, 200], [100, 150], [150, 150], [100, 250],
  [450, 500], [350, 450], [350, 50], [700, 150], [650, 150], [650, 100],
  [150, 550], [150, 500], [150, 450], [200, 450], [50, 250], [250, 450],
  [300, 250], [350, 250], [400, 250], [350, 200], [350, 300], [450, 550],
  [500, 550], [550, 550], [600, 550], [450, 400], [450, 350], [500, 350],
  [550, 350], [550, 300]]
};

function Board(){
  this.walls = [];
  this.bombers = [];
  this.bombs = [];
  this.flames = [];
  this.field_blocks = [];
  this.bricks = BRICK_PRESETS.one;
  this.instantiateFlames();
  this.instantiateBrick();
}

Board.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, 850, 650);
  this.bombs.forEach(bomb => {
    bomb.draw(ctx);
  });
  this.bombers.forEach(bomber => {
    bomber.draw(ctx);
  });
  this.bricks.forEach(brick => {
    ctx.drawImage(this.brickImg, brick[0], brick[1], 50, 50);
  });
  if (this.flames.length){
    this.flames.forEach(flame => {
      ctx.drawImage(this.flameImg, flame[0], flame[1], 50, 50);
    });
    setTimeout(() => {
      this.flames = [];
      this.draw(ctx);
    }, 500);
  }
}

Board.prototype.instantiateBrick = function(){
  let img = new Image();
  img.src = '../dist/brick.png';
  this.brickImg = img;
}

Board.prototype.instantiateFlames = function(){
  let img = new Image();
  img.src = '../dist/explosion.png';
  this.flameImg = img;
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
  return this;
}



Board.prototype.isExploded = function(bombPos) {
  let dead = [];
  let that = this;
  let bombRange = this.calculateBombRange(bombPos)
  this.removeBricks(bombRange);
  this.flames = bombRange;
  bombRange.push(bombPos);
  bombRange.forEach(pos => {
    that.bombers.forEach(bomber => {
      if (pos[0] === bomber.pos[0] && pos[1] === bomber.pos[1]) {
        dead.push(bomber);
      }
    });
  });
  return dead;
}

Board.prototype.removeBricks = function(bombRange){
  this.bricks = this.bricks.filter(brick => {
    let flag = true;
    bombRange.forEach(pos => {
      if (pos[0] === brick[0] && pos[1] === brick[1]){
         flag = false;
         
      }
    });
    return flag;
  });
}

Board.prototype.calculateBombRange = function(bombPos) {
  let that = this;
  let newPosArr = BOMB_VECS.map(vec => {
    let x = vec[0] + bombPos[0];
    let y = vec[1] + bombPos[1];
    return [x, y];
  });
  return newPosArr.filter(pos => that.validMove(pos));
}

Board.prototype.validMove = function(pos, bricks = [], bombs = []) {
  if (pos[0] > 750 || pos[0] < 50 || pos[1] > 550 || pos[1] < 50) return false;
  return !(this.field_blocks.concat(bricks, bombs)).some(blockPos => {
    let flag = true;
    pos.forEach((item, i) => {
      if (item !== blockPos[i]) flag = false;
    });
    return flag;
  });
}
 
Board.prototype.endGame = function (bombers) {
  let ele1 = document.getElementById('game-canvas');
  let ele2 = document.getElementById('background');
  let ele3 = document.getElementById('game-over');
  ele1.style = 'display: none';
  ele2.style = 'display: none';
  ele3.style = 'display: block';
  let words = document.createElement('p');
  if (bombers.length > 1) {
    words.innerText = 'It\'s a draw!!'
  } else {
    words.innerText = this.oppositeColor(bombers[0].color) + ' Bomber is the winner!!';
  }
  ele3.append(words);
}

Board.prototype.oppositeColor = function (color) {
  switch (color) {
    case 'White':
      return 'Black';
    case 'Black':
      return 'White';
  }
}

Board.prototype.bombPositions = function () {
    return this.bombs.map(bomb => bomb.pos);
}
  
Board.prototype.explosionPositions = function () {
    let danger = [];
    this.bombPositions().forEach(pos => {
        danger.concat(this.calculateBombRange(pos));
    });
    return danger;
}

Board.prototype.inBombRange = function (nextPos) {
    return this.explosionPositions().some(pos => {
        return pos[0] === nextPos[0] && pos[1] === nextPos[1];
    });
}

Board.prototype.availableMoves = function (bomber) {
    let moves = this.vectoredPositions(bomber);
    return moves.filter(pos => {
      return this.validMove(pos, this.bricks, this.bombPositions());
    });
}

Board.prototype.vectoredPositions = function(bomber){
  return BOMB_VECS.map(pos => {
    
    let x = bomber.pos[0] + pos[0];
    let y = bomber.pos[1] + pos[1];
    return [x, y];
  })
}

Board.prototype.runLoop = function (bomber, ctx) {
  setInterval(() => {
    let moves = this.availableMoves(bomber);
    let move;
    while (true) {
      move = moves[getRandomInt(moves.length)]
      if (!this.inBombRange(move)) {
        break;
      }
    }
    if (move) {
      if (this.brickAdjacent(bomber)){
        bomber.dropBomb(ctx);
        this.draw(ctx);
      }
      bomber.move([move[0] - bomber.pos[0], move[1] - bomber.pos[1]]);
      this.draw(ctx);
    }
  }, 500);
}

Board.prototype.brickAdjacent = function(bomber){
  let flag = false;
  this.vectoredPositions(bomber).forEach(pos => {
    this.bricks.forEach(brickPos => {
      if (this.samePos(pos, brickPos)){
        flag = true;
      }
    });
  });
  return flag;
}

Board.prototype.samePos = function(pos1, pos2){
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
  


module.exports = Board;