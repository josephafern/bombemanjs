/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module) => {

eval("\n\nconst BOMB_VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];\nconst POWERED = [[100, 0], [-100, 0], [0, 100], [0, -100]];\nconst BRICK_PRESETS = {\n  one: [[50, 100], [50, 150], [50, 200], [100, 150], [150, 150], [100, 250],\n  [450, 500], [350, 400], [350, 50], [700, 150], [650, 150], [650, 100],\n  [150, 550], [150, 500], [150, 450], [200, 450], [50, 250], [250, 450],\n  [300, 250], [400, 250], [350, 200], [350, 300],\n  [500, 550], [550, 550], [450, 400], [450, 350], [500, 350],\n  [550, 350], [550, 300], [200,50], [250, 50], [250, 100], [250,150], [200, 150],\n  [350, 100], [750, 400], [550, 250], [600, 250],\n  [650, 250], [700,250], [750, 250]]\n};\nconst IMGS = ['./dist/game-over-1.png', './dist/game-over-2.png'];\n\nconst exp_sound1 = new Audio('./dist/exp_sound.mp3');\nexp_sound1.volume = 0.05;\n\n\nfunction Board(){\n  this.walls = [];\n  this.bombers = [];\n  this.bombs = [];\n  this.flames = [];\n  this.flamesIdx = [];\n  this.field_blocks = [];\n  this.powerUps = [[350, 250]];\n  this.unlimited = [];\n  this.bricks = BRICK_PRESETS.one;\n  this.gameOver = false;\n  this.finished = false;\n  this.instantiateFlames();\n  this.instantiateBrick();\n  this.instantiatePowerUp();\n  this.instantiateUnlimited();\n}\n\nBoard.prototype.draw = function(ctx){\n  ctx.clearRect(0, 0, 850, 650);\n  this.bombs.forEach(bomb => {\n    bomb.draw(ctx);\n  });\n  this.bricks.forEach(brick => {\n    ctx.drawImage(this.brickImg, brick[0], brick[1], 50, 50);\n  });\n  this.powerUps.forEach(powerUp => {\n    ctx.drawImage(this.powerUpImg, powerUp[0], powerUp[1], 50, 50);\n  });\n  this.unlimited.forEach(powerUp => {\n    ctx.drawImage(this.unlimitedImg, powerUp[0], powerUp[1], 50, 50);\n  });\n  if (this.flames.length){\n    this.flames.forEach(flame => {\n      \n      ctx.drawImage(this.flameImg, flame[0], flame[1], 50, 50);\n    });\n    \n    \n    setTimeout(() => {\n      let num = this.flamesIdx.shift();\n      this.flames = this.flames.slice(num);\n      this.draw(ctx);\n    }, 300);\n  }\n  this.bombers.forEach(bomber => {\n    bomber.draw(ctx);\n  });\n}\n\nBoard.prototype.instantiateBrick = function(){\n  let img = new Image();\n  img.src = './dist/brick.png';\n  this.brickImg = img;\n}\n\nBoard.prototype.instantiateFlames = function(){\n  let img = new Image();\n  img.src = './dist/explosion.png';\n  this.flameImg = img;\n}\n\nBoard.prototype.instantiatePowerUp = function(){\n  let img = new Image();\n  img.src = './dist/fire.png';\n  this.powerUpImg = img;\n}\n\nBoard.prototype.instantiateUnlimited = function(){\n  let img = new Image();\n  img.src = './dist/bomb-power.png';\n  this.unlimitedImg = img;\n}\n\nBoard.prototype.initializeBoard = function(ctx){\n  this.finished = false;\n  for (let i = 0; i < 16; i++) {\n    this.field_blocks.push([i * 50, 0]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, (50 * i), 0, 50, 50);\n    };\n    char.src = './dist/stone.png';\n  }\n  for (let i = 0; i < 17; i++) {\n    this.field_blocks.push([i * 50, 600]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, (50 * i), 600, 50, 50);\n    };\n    char.src = './dist/stone.png';\n  }\n  for (let i = 0; i < 12; i++) {\n    this.field_blocks.push([0, i * 50]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, 0, (50 * i), 50, 50);\n    };\n    char.src = './dist/stone.png';\n  }\n  for (let i = 0; i < 12; i++) {\n    this.field_blocks.push([800, i * 50]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, 800, (50 * i), 50, 50);\n    };\n    char.src = './dist/stone.png';\n  }\n  for (let i = 1; i < 8; i++) {\n    for (let j = 1; j < 6; j++) {\n    this.field_blocks.push([i * 100, j * 100]);\n      let char = new Image();\n      char.onload = function () {\n        ctx.drawImage(this, i * 100, j * 100, 50, 50);\n      };\n      char.src = './dist/stone.png';\n    }\n  }\n}\n\nBoard.prototype.addBomber = function(bomber){\n  this.bombers.push(bomber);\n  return this;\n}\n\nBoard.prototype.removeBomber = function(color){\n  this.bombers = this.bombers.filter(bomber => bomber.color !== color);\n}\n\n\n\nBoard.prototype.isExploded = function(bombPos, poweredUp) {\n  let dead = [];\n  let that = this;\n  let bombRange = this.calculateBombRange(bombPos, poweredUp);\n  this.removeBricks(bombRange);\n  bombRange.push(bombPos);\n  this.flames = this.flames.concat(bombRange);\n  this.flamesIdx.push(bombRange.length);\n  bombRange.forEach(pos => {\n    that.bombers.forEach(bomber => {\n      if (pos[0] === bomber.pos[0] && pos[1] === bomber.pos[1]) {\n        dead.push(bomber);\n      }\n    });\n  });\n  return dead;\n}\n\nBoard.prototype.removeBricks = function(bombRange){\n  this.bricks = this.bricks.filter(brick => {\n    let flag = true;\n    bombRange.forEach(pos => {\n      if (pos[0] === brick[0] && pos[1] === brick[1]){\n         flag = false;\n         \n      }\n    });\n    return flag;\n  });\n}\n\nBoard.prototype.removePowerUp = function(){\n  this.powerUps.pop();\n}\n\nBoard.prototype.removeUnlimited = function(){\n  this.unlimited.pop();\n}\n\nBoard.prototype.addUnlimited = function(){\n  this.unlimited.push([350, 250]);\n}\n\nBoard.prototype.isUnlimited = function(){\n  return this.unlimited.length > 0;\n}\n\nBoard.prototype.calculateBombRange = function(bombPos, poweredUp) {\n  let that = this;\n  let fullArr;\n  if (poweredUp) {\n    fullArr = this.powerUpPositions(bombPos);\n  } else {\n    fullArr = BOMB_VECS;\n  }\n  let newPosArr = fullArr.map(vec => {\n    let x = vec[0] + bombPos[0];\n    let y = vec[1] + bombPos[1];\n    return [x, y];\n  });\n  return newPosArr.filter(pos => that.validMove(pos));\n}\n\nBoard.prototype.powerUpPositions = function(bombPos){\n  let that = this;\n  let newPosArr = BOMB_VECS.filter(vec => {\n    let x = vec[0] + bombPos[0];\n    let y = vec[1] + bombPos[1];\n    return that.validMove([x, y]);\n  });\n  let res = newPosArr;\n  newPosArr.forEach(pos => {\n    if (pos[0] > 0){\n      res.push([pos[0] + 50, 0]);\n    } else if (pos[0] < 0) {\n      res.push([pos[0] - 50, 0]);\n    } else if (pos[1] > 0){\n      res.push([0, pos[1] + 50]);\n    } else {\n      res.push([0, pos[1] - 50]);\n    }\n  });\n  return res;\n}\n\nBoard.prototype.validMove = function(pos, bricks = [], bombs = []) {\n  if (pos[0] > 750 || pos[0] < 50 || pos[1] > 550 || pos[1] < 50) return false;\n  return !(this.field_blocks.concat(bricks, bombs)).some(blockPos => {\n    let flag = true;\n    pos.forEach((item, i) => {\n      if (item !== blockPos[i]) flag = false;\n    });\n    return flag;\n  });\n}\n \nBoard.prototype.endGame = function (bombers) {\n  this.gameOver = true;\n  let ele1 = document.getElementById('game-canvas');\n  let ele2 = document.getElementById('background');\n  let ele3 = document.getElementById('game-over');\n  ele1.style = 'display: none';\n  ele2.style = 'display: none';\n  ele3.style = 'display: block';\n  let words = document.createElement('p');\n  let OImg = document.createElement('img');\n  OImg.id = 'gameover-img'; \n  OImg.src = \"./dist/game-over-1.png\";\n  words.style = 'font-family: Noteworthy, sans-serif; font-size: 20px; color: teal;';\n  if (bombers.length > 1) {\n    words.innerText = 'It\\'s a draw!!'\n  } else {\n    words.innerText = this.oppositeColor(bombers[0].color) + ' Bomber is the winner!!';\n  }\n  if (!this.finished){\n    ele3.append(OImg);\n    ele3.append(words);\n    let replay = document.createElement('div');\n    replay.id = 'replay-btn';\n    replay.innerText = 'Play again?';\n    ele3.append(replay);\n    this.finished = true;\n  } \n}\n\nBoard.prototype.oppositeColor = function (color) {\n  switch (color) {\n    case 'White':\n      return 'Black';\n    case 'Black':\n      return 'White';\n  }\n}\n\nBoard.prototype.bombPositions = function () {\n    return this.bombs.map(bomb => bomb.pos);\n}\n  \nBoard.prototype.explosionPositions = function () {\n    let danger = [];\n    this.bombPositions().forEach(pos => {\n        danger = danger.concat(this.calculateBombRange(pos));\n    });\n    return danger;\n}\n\nBoard.prototype.inBombRange = function (nextPos) {\n  return this.explosionPositions().some(pos => {\n        return pos[0] === nextPos[0] && pos[1] === nextPos[1];\n    });\n}\n\nBoard.prototype.availableMoves = function (bomber) {\n    let moves = this.vectoredPositions(bomber);\n    return moves.filter(pos => {\n      return this.validMove(pos, this.bricks, this.bombPositions());\n    });\n}\n\nBoard.prototype.vectoredPositions = function(bomber){\n  return BOMB_VECS.map(pos => {\n    \n    let x = bomber.pos[0] + pos[0];\n    let y = bomber.pos[1] + pos[1];\n    return [x, y];\n  })\n}\n\nBoard.prototype.runLoop = function (bomber, ctx) {\n  setInterval(() => {\n    if (this.gameOver) return;\n    let moves = this.availableMoves(bomber);\n    let move;\n    for (let i = 0; i < 8; i++){\n      nextMove = moves[getRandomInt(moves.length)];\n      if (!this.inBombRange(nextMove)) {\n        move = nextMove;\n        break;\n      }\n    }\n    if (move) {\n      if (this.brickAdjacent(bomber)){\n        bomber.dropBomb(ctx);\n        this.draw(ctx);\n      }\n      bomber.move([move[0] - bomber.pos[0], move[1] - bomber.pos[1]]);\n      this.draw(ctx);\n    }\n  }, 500);\n}\n\nBoard.prototype.brickAdjacent = function(bomber){\n  let flag = false;\n  this.vectoredPositions(bomber).forEach(pos => {\n    this.bricks.forEach(brickPos => {\n      if (this.samePos(pos, brickPos)){\n        flag = true;\n      }\n    });\n  });\n  return flag;\n}\n\nBoard.prototype.samePos = function(pos1, pos2){\n  return pos1[0] === pos2[0] && pos1[1] === pos2[1];\n}\n\nfunction getRandomInt(max) {\n  return Math.floor(Math.random() * max);\n}\n  \n\n\nmodule.exports = Board;\n\n//# sourceURL=webpack://bombemanjs/./src/board.js?");

/***/ }),

/***/ "./src/bomb.js":
/*!*********************!*\
  !*** ./src/bomb.js ***!
  \*********************/
/***/ ((module) => {

eval("function Bomb(pos, img){\n    this.pos = pos;\n    this.img = img;\n}\n\nBomb.prototype.draw = function(ctx){\n    ctx.drawImage(this.img, this.pos[0], this.pos[1], 50, 50);\n}\n\nmodule.exports = Bomb;\n\n//# sourceURL=webpack://bombemanjs/./src/bomb.js?");

/***/ }),

/***/ "./src/bomber.js":
/*!***********************!*\
  !*** ./src/bomber.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Bomb = __webpack_require__(/*! ./bomb.js */ \"./src/bomb.js\");\n\nconst BOMB_VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];\n\n\nfunction Bomber(info){\n    this.pos = info.pos;\n    this.color = info.color;\n    this.board = info.board;\n    this.bombDropped = false;\n    this.poweredUp = false;\n    this.unlimited = false;\n    this.exp_sound = new Audio('./dist/exp_sound.mp3');\n    this.exp_sound.volume = 0.05;\n    this.alreadyPowered = false;\n    this.alreadyUnlimited = false;\n}\n\nBomber.prototype.draw = function(context){ \n    context.drawImage(this.img, this.pos[0], this.pos[1], 50, 50);\n}\n\nBomber.prototype.createBomber = function(url){\n    let img = new Image();\n    let x = this.pos[0];\n    let y = this.pos[1];\n    img.src = url;\n    this.img = img;\n}\n\nBomber.prototype.move = function(pos){\n    \n    let newX = this.pos[0] + pos[0];\n    let newY = this.pos[1] + pos[1];\n    if (this.board.validMove([newX, newY], this.board.bricks, this.board.bombPositions())){\n        this.pos = [newX, newY];\n        if (this.board.samePos(this.pos, [350, 250]) && !this.alreadyPowered){\n            this.poweredUp = true;\n            this.board.removePowerUp();\n            this.alreadyPowered = true;\n            setTimeout(() => {\n                this.poweredUp = false;\n            }, 30000);\n            setTimeout(() => {\n                this.board.addUnlimited();\n            }, 10000);\n        } \n        if (this.board.samePos(this.pos, [350, 250]) && !this.alreadyUnlimited && this.board.isUnlimited()){\n            this.unlimited = true;\n            this.board.removeUnlimited();\n            this.alreadyUnlimited = true;\n            setTimeout(() => {\n                this.unlimited = false;\n            }, 30000);\n        }\n        \n    }\n   \n}\n\nBomber.prototype.dropBomb = function(ctx){\n    if (!this.bombDropped){\n        let x = this.pos[0];\n        let y = this.pos[1];\n        let img = new Image();\n        let that = this;\n        img.src = './dist/bomb.png';\n        let bomb = new Bomb([x, y], img)\n        if (!this.unlimited) this.bombDropped = true;\n        this.board.bombs.push(bomb);\n        setTimeout(() => {\n            if (!that.board.gameOver){\n                let bomb = that.board.bombs.shift();\n                bomb.style = 'display:none';\n                let dead = that.board.isExploded(bomb.pos, this.poweredUp);\n                if (dead.length) {\n                    that.board.endGame(dead);\n                }\n                this.bombDropped = false;\n                that.board.draw(ctx);\n                let muteBtn = document.getElementById('mute');\n                if (muteBtn.innerText === 'Mute') this.exp_sound.play();\n            }\n        }, 3000);\n    }\n}\n\nBomber.prototype.audioObj = function () {\n    return this.exp_sound;\n}\n\nmodule.exports = Bomber;\n\n//# sourceURL=webpack://bombemanjs/./src/bomber.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\");\nconst Bomber = __webpack_require__(/*! ./bomber.js */ \"./src/bomber.js\");\nconst RobotBomber = __webpack_require__(/*! ./robot_bomber.js */ \"./src/robot_bomber.js\");\n\nlet board;\nlet bomber;\nlet robot;\nlet started;\nlet canvas;\nlet ctx;\nlet background;\nlet backCtx;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    canvas = document.getElementById(\"game-canvas\");\n    ctx = canvas.getContext(\"2d\");\n    canvas.width = 850;\n    canvas.height = 650;\n    background = document.getElementById(\"background\");\n    backCtx = background.getContext(\"2d\");\n    background.width = 850;\n    background.height = 650;\n    started = false;\n    board = new Board();\n    bomber = new Bomber({pos: [50, 50], color: 'White', board: board});\n    robot = new RobotBomber({ pos: [750, 550], color: 'Black', board: board});\n    bomber.createBomber('./dist/bomber.png');\n    robot.createBomber('./dist/bomber2.png');\n    board.addBomber(bomber).addBomber(robot);\n    board.initializeBoard(backCtx);\n    board.draw(ctx);\n});\n\n\n\ndocument.addEventListener(\"keydown\", (e) => {\n    e.preventDefault();\n    if (start){\n        let canvas = document.getElementById('game-canvas');\n        const ctx = canvas.getContext(\"2d\");\n        switch (e.key){\n            case 'ArrowDown':\n                bomber.move([0, 50]);\n                board.draw(ctx);\n                break;\n            case 'ArrowUp':\n                bomber.move([0, -50]);\n                board.draw(ctx);\n                break;\n            case 'ArrowLeft':\n                bomber.move([-50, 0]);\n                board.draw(ctx);\n                break;\n            case 'ArrowRight':\n                bomber.move([50, 0]);\n                board.draw(ctx);\n                break;\n            case \" \":\n                bomber.dropBomb(ctx);\n                board.draw(ctx);\n                break;\n        }\n    }\n});\n\ndocument.addEventListener('click', (e) => {\n    if (e.target.id === \"start-btn\") {\n        let ele = document.getElementById('instructions');\n        let ele2 = document.getElementById('game-canvas');\n        let ctx = ele2.getContext('2d');\n        let ele3 = document.getElementById('background');\n        ele.style = 'display: none';\n        ele2.style = 'display: block';\n        ele3.style = 'display: block';\n        start = true;\n        board.draw(ctx);\n        board.runLoop(robot, ctx);\n    } else if (e.target.id === 'mute') {\n        let ele = document.getElementById('theme-song');\n        let ele2 = bomber.audioObj();\n        let ele3 = robot.audioObj();\n        let vol = ele.volume;\n        let muteBtn = document.getElementById('mute');\n        if (muteBtn.innerText === 'Mute') {\n            ele.volume = 0.0;\n            ele2.volume = 0.0;\n            ele3.volume = 0.0;\n            muteBtn.innerText = 'Unmute'\n        } else {\n            ele.volume = 0.15;\n            ele2.volume = 0.05;\n            ele3.volume = 0.05;\n            muteBtn.innerText = 'Mute'\n        }\n    } else if (e.target.id === 'enter-btn'){\n        let ele = document.getElementById('splash-screen');\n        let ele2 = document.getElementById('instructions');\n        ele.style = 'display: none';\n        ele2.style = 'display: block';\n    } else if (e.target.id === 'replay-btn'){\n        let ele = document.getElementById('game-over');\n        let ele2 = document.getElementById('game-canvas');\n        let ele3 = document.getElementById('background');\n        \n        ele.innerHTML = null;\n        ctx.clearRect(0,0, canvas.width, canvas.height);\n        backCtx.clearRect(0, 0, canvas.width, canvas.height);\n        board = new Board();\n        bomber = new Bomber({ pos: [50, 50], color: 'White', board: board });\n        robot = new RobotBomber({ pos: [750, 550], color: 'Black', board: board });\n        bomber.createBomber('./dist/bomber.png');\n        robot.createBomber('./dist/bomber2.png');\n        board.addBomber(bomber).addBomber(robot);\n        board.initializeBoard(backCtx);\n        board.draw(ctx);\n        ele.style = 'display: none';\n        ele2.style = 'display: block';\n        ele3.style = 'display: block';\n        board.runLoop(robot, ctx);\n    }\n})\n\n//# sourceURL=webpack://bombemanjs/./src/index.js?");

/***/ }),

/***/ "./src/robot_bomber.js":
/*!*****************************!*\
  !*** ./src/robot_bomber.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Bomber = __webpack_require__(/*! ./bomber.js */ \"./src/bomber.js\");\n\nconst VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];\n\nfunction RobotBomber(info){\n    Bomber.call(this, info);\n}\n\nfunction inherits(ChildClass, ParentClass){\n    function Surrogate(){};\n    Surrogate.prototype = ParentClass.prototype;\n    ChildClass.prototype = new Surrogate();\n    ChildClass.prototype.constructor = ChildClass;\n}\n\ninherits(RobotBomber, Bomber);\n\nmodule.exports = RobotBomber;\n\n//# sourceURL=webpack://bombemanjs/./src/robot_bomber.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;