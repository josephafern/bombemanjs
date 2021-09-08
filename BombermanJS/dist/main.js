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

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/***/ ((module) => {

eval("function Block(pos, passible){\n    this.pos = pos;\n    this.passible = passible;\n}\n\nmodule.exports = Block;\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Block = __webpack_require__(/*! ./block.js */ \"./src/block.js\");\n\nconst BOMB_VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];\nconst BRICK_PRESETS = {\n  one: [[50, 100], [50, 150], [50, 200], [100, 150], [150, 150], [100, 250],\n  [450, 500], [350, 450], [350, 50], [700, 150], [650, 150], [650, 100],\n  [150, 550], [150, 500], [150, 450], [200, 450], [50, 250], [250, 450],\n  [300, 250], [350, 250], [400, 250], [350, 200], [350, 300], [450, 550],\n  [500, 550], [550, 550], [600, 550], [450, 400], [450, 350], [500, 350],\n  [550, 350], [550, 300]]\n};\n\nfunction Board(){\n  this.walls = [];\n  this.bombers = [];\n  this.bombs = [];\n  this.flames = [];\n  this.field_blocks = [];\n  this.bricks = BRICK_PRESETS.one;\n  this.instantiateFlames();\n  this.instantiateBrick();\n}\n\nBoard.prototype.draw = function(ctx){\n  ctx.clearRect(0, 0, 850, 650);\n  this.bombs.forEach(bomb => {\n    bomb.draw(ctx);\n  });\n  this.bombers.forEach(bomber => {\n    bomber.draw(ctx);\n  });\n  this.bricks.forEach(brick => {\n    ctx.drawImage(this.brickImg, brick[0], brick[1], 50, 50);\n  });\n  if (this.flames.length){\n    this.flames.forEach(flame => {\n      ctx.drawImage(this.flameImg, flame[0], flame[1], 50, 50);\n    });\n    setTimeout(() => {\n      this.flames = [];\n      this.draw(ctx);\n    }, 500);\n  }\n}\n\nBoard.prototype.instantiateBrick = function(){\n  let img = new Image();\n  img.src = '../dist/brick.png';\n  this.brickImg = img;\n}\n\nBoard.prototype.instantiateFlames = function(){\n  let img = new Image();\n  img.src = '../dist/explosion.png';\n  this.flameImg = img;\n}\n\nBoard.prototype.initializeBoard = function(ctx){\n  for (let i = 0; i < 16; i++) {\n    this.field_blocks.push([i * 50, 0]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, (50 * i), 0, 50, 50);\n    };\n    char.src = '../dist/stone.png';\n  }\n  for (let i = 0; i < 17; i++) {\n    this.field_blocks.push([i * 50, 600]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, (50 * i), 600, 50, 50);\n    };\n    char.src = '../dist/stone.png';\n  }\n  for (let i = 0; i < 12; i++) {\n    this.field_blocks.push([0, i * 50]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, 0, (50 * i), 50, 50);\n    };\n    char.src = '../dist/stone.png';\n  }\n  for (let i = 0; i < 12; i++) {\n    this.field_blocks.push([800, i * 50]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, 800, (50 * i), 50, 50);\n    };\n    char.src = '../dist/stone.png';\n  }\n  for (let i = 1; i < 8; i++) {\n    for (let j = 1; j < 6; j++) {\n    this.field_blocks.push([i * 100, j * 100]);\n      let char = new Image();\n      char.onload = function () {\n        ctx.drawImage(this, i * 100, j * 100, 50, 50);\n      };\n      char.src = '../dist/stone.png';\n    }\n  }\n}\n\nBoard.prototype.addBomber = function(bomber){\n  this.bombers.push(bomber);\n  return this;\n}\n\n\n\nBoard.prototype.isExploded = function(bombPos) {\n  let that = this;\n  let bombRange = this.calculateBombRange(bombPos)\n  this.removeBricks(bombRange);\n  this.flames = bombRange;\n  bombRange.push(bombPos);\n  let hit = false;\n  bombRange.forEach(pos => {\n    that.bombers.forEach(bomber => {\n      if (pos[0] === bomber.pos[0] && pos[1] === bomber.pos[1]) {\n        alert('HIT!!');\n        hit = true;\n      }\n    });\n  });\n  return hit;\n}\n\nBoard.prototype.removeBricks = function(bombRange){\n  this.bricks = this.bricks.filter(brick => {\n    let flag = true;\n    bombRange.forEach(pos => {\n      if (pos[0] === brick[0] && pos[1] === brick[1]){\n         flag = false;\n         \n      }\n    });\n    return flag;\n  });\n}\n\nBoard.prototype.calculateBombRange = function(bombPos) {\n  let that = this;\n  let newPosArr = BOMB_VECS.map(vec => {\n    let x = vec[0] + bombPos[0];\n    let y = vec[1] + bombPos[1];\n    return [x, y];\n  });\n  return newPosArr.filter(pos => that.validMove(pos));\n}\n\nBoard.prototype.validMove = function(pos, bricks = []) {\n  return !(this.field_blocks.concat(bricks)).some(blockPos => {\n    let flag = true;\n    pos.forEach((item, i) => {\n      if (item !== blockPos[i]) flag = false;\n    });\n    return flag;\n  });\n}\n  \n    \n    \n  \n\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/bomb.js":
/*!*********************!*\
  !*** ./src/bomb.js ***!
  \*********************/
/***/ ((module) => {

eval("function Bomb(pos, img){\n    this.pos = pos;\n    this.img = img;\n}\n\nBomb.prototype.draw = function(ctx){\n    ctx.drawImage(this.img, this.pos[0], this.pos[1], 50, 50);\n}\n\nmodule.exports = Bomb;\n\n//# sourceURL=webpack:///./src/bomb.js?");

/***/ }),

/***/ "./src/bomber.js":
/*!***********************!*\
  !*** ./src/bomber.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Bomb = __webpack_require__(/*! ./bomb.js */ \"./src/bomb.js\");\n\nconst BOMB_VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];\n\nfunction Bomber(info){\n    this.pos = info.pos;\n    this.color = info.color;\n    this.board = info.board;\n    this.bombDropped = false;\n}\n\nBomber.prototype.draw = function(context){ \n    context.drawImage(this.img, this.pos[0], this.pos[1], 50, 50);\n}\n\nBomber.prototype.createBomber = function(){\n    let img = new Image();\n    let x = this.pos[0];\n    let y = this.pos[1];\n    img.src = '../dist/bomber.png';\n    this.img = img;\n}\n\nBomber.prototype.move = function(pos){\n    let newX = this.pos[0] + pos[0];\n    let newY = this.pos[1] + pos[1];\n    if (this.board.validMove([newX, newY], this.board.bricks)){\n        this.pos[0] += pos[0];\n        this.pos[1] += pos[1];\n    }\n   \n}\n\nBomber.prototype.dropBomb = function(ctx){\n    if (!this.bombDropped){\n        let x = this.pos[0];\n        let y = this.pos[1];\n        let img = new Image();\n        let that = this;\n        img.src = '../dist/bomb.png';\n        let bomb = new Bomb([x, y], img)\n        this.bombDropped = true;\n        this.board.bombs.push(bomb);\n        setTimeout(() => {\n            let bomb = that.board.bombs.shift();\n            bomb.style = 'display:none';\n            that.board.isExploded(bomb.pos);\n            this.bombDropped = false;\n            that.board.draw(ctx);\n        }, 3000);\n    }\n}\n\nmodule.exports = Bomber;\n\n//# sourceURL=webpack:///./src/bomber.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\");\nconst Bomber = __webpack_require__(/*! ./bomber.js */ \"./src/bomber.js\");\nconst RobotBomber = __webpack_require__(/*! ./robot_bomber.js */ \"./src/robot_bomber.js\");\n\nlet board;\nlet bomber;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvas = document.getElementById(\"game-canvas\");\n    const ctx = canvas.getContext(\"2d\");\n    canvas.width = 850;\n    canvas.height = 650;\n    const background = document.getElementById(\"background\");\n    const backCtx = background.getContext(\"2d\");\n    background.width = 850;\n    background.height = 650;\n    board = new Board();\n    bomber = new Bomber({pos: [50, 50], color: 'white', board: board});\n    robot = new RobotBomber({ pos: [750, 550], color: 'black', board: board});\n    bomber.createBomber();\n    robot.createBomber();    \n    board.addBomber(bomber).addBomber(robot);\n    board.initializeBoard(backCtx);\n    board.draw(ctx);\n});\n\n\n\ndocument.addEventListener(\"keydown\", (e) => {\n    e.preventDefault();\n    let canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext(\"2d\");\n    switch (e.key){\n        case 'ArrowDown':\n            bomber.move([0, 50]);\n            board.draw(ctx);\n            break;\n        case 'ArrowUp':\n            bomber.move([0, -50]);\n            board.draw(ctx);\n            break;\n        case 'ArrowLeft':\n            bomber.move([-50, 0]);\n            board.draw(ctx);\n            break;\n        case 'ArrowRight':\n            bomber.move([50, 0]);\n            board.draw(ctx);\n            break;\n        case \" \":\n            bomber.dropBomb(ctx);\n            board.draw(ctx);\n            break;\n    }\n});\n\ndocument.addEventListener('click', (e) => {\n    if (e.target.id === \"StartButton\"){\n        let ele = document.getElementById('SplashScreen');\n        let ele2 = document.getElementById('game-canvas');\n        let ctx = ele2.getContext('2d');\n        let ele3 = document.getElementById('background');\n        ele.style = 'display: none';\n        ele2.style = 'display: block';\n        ele3.style = 'display: block';\n        board.draw(ctx);\n    }\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/robot_bomber.js":
/*!*****************************!*\
  !*** ./src/robot_bomber.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Bomber = __webpack_require__(/*! ./bomber.js */ \"./src/bomber.js\");\n\nfunction RobotBomber(info){\n    Bomber.call(this, info);\n}\n\nfunction inherits(ChildClass, ParentClass){\n    function Surrogate(){};\n    Surrogate.prototype = ParentClass.prototype;\n    ChildClass.prototype = new Surrogate();\n    ChildClass.prototype.constructor = ChildClass;\n}\n\ninherits(RobotBomber, Bomber);\n\nmodule.exports = RobotBomber;\n\n//# sourceURL=webpack:///./src/robot_bomber.js?");

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