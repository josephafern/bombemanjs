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

eval("const Block = __webpack_require__(/*! ./block.js */ \"./src/block.js\");\n\n\nfunction Board(){\n  this.walls = [];\n  this.bombers = [];\n  this.bombs = [];\n  this.field_blocks = [];\n}\n\nBoard.prototype.draw = function(ctx){\n  ctx.clearRect(0, 0, 850, 650);\n  this.bombs.forEach(bomb => {\n    bomb.draw(ctx);\n  });\n  this.bombers.forEach(bomber => {\n    bomber.draw(ctx);\n  });\n  // for (let i = 0; i < 16; i ++ ){\n  //   if (!this.bool) this.field_blocks.push([i * 50, 0]);\n  //   let char = new Image();\n  //   char.onload = function () {\n  //     ctx.drawImage(this, (50 * i), 0, 50, 50);\n  //   };\n  //   char.src = '../dist/stone.png';\n  // }\n  // for (let i = 0; i < 17; i++) {\n  //   if (!this.bool) this.field_blocks.push([i * 50, 600]);\n  //   let char = new Image();\n  //   char.onload = function () {\n  //     ctx.drawImage(this, (50 * i), 600, 50, 50);\n  //   };\n  //   char.src = '../dist/stone.png';\n  // }\n  // for (let i = 0; i < 12; i++) {\n  //   if (!this.bool) this.field_blocks.push([0, i * 50]);\n  //   let char = new Image();\n  //   char.onload = function () {\n  //     ctx.drawImage(this, 0, (50 * i), 50, 50);\n  //   };\n  //   char.src = '../dist/stone.png';\n  // }\n  // for (let i = 0; i < 12; i++) {\n  //   if (!this.bool) this.field_blocks.push([800, i * 50]);\n  //   let char = new Image();\n  //   char.onload = function () {\n  //     ctx.drawImage(this, 800, (50 * i), 50, 50);\n  //   };\n  //   char.src = '../dist/stone.png';\n  // }\n  // for (let i = 1; i < 8; i ++){\n  //   for (let j = 1; j < 6; j ++){\n  //     if (!this.bool) this.field_blocks.push([i * 100, j * 100]);\n  //     let char = new Image();\n  //     char.onload = function () {\n  //       ctx.drawImage(this, i * 100, j * 100, 50, 50);\n  //     };\n  //     char.src = '../dist/stone.png';\n  //   }\n  // }\n  \n  // if (!this.bool) this.bool = true;\n  \n}\n\nBoard.prototype.initializeBoard = function(ctx){\n  for (let i = 0; i < 16; i++) {\n    this.field_blocks.push([i * 50, 0]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, (50 * i), 0, 50, 50);\n    };\n    char.src = '../dist/stone.png';\n  }\n  for (let i = 0; i < 17; i++) {\n    this.field_blocks.push([i * 50, 600]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, (50 * i), 600, 50, 50);\n    };\n    char.src = '../dist/stone.png';\n  }\n  for (let i = 0; i < 12; i++) {\n    this.field_blocks.push([0, i * 50]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, 0, (50 * i), 50, 50);\n    };\n    char.src = '../dist/stone.png';\n  }\n  for (let i = 0; i < 12; i++) {\n    this.field_blocks.push([800, i * 50]);\n    let char = new Image();\n    char.onload = function () {\n      ctx.drawImage(this, 800, (50 * i), 50, 50);\n    };\n    char.src = '../dist/stone.png';\n  }\n  for (let i = 1; i < 8; i++) {\n    for (let j = 1; j < 6; j++) {\n    this.field_blocks.push([i * 100, j * 100]);\n      let char = new Image();\n      char.onload = function () {\n        ctx.drawImage(this, i * 100, j * 100, 50, 50);\n      };\n      char.src = '../dist/stone.png';\n    }\n  }\n}\n\nBoard.prototype.addBomber = function(bomber){\n  this.bombers.push(bomber);\n}\n  \n    \n    \n  \n\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

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

eval("const Bomb = __webpack_require__(/*! ./bomb.js */ \"./src/bomb.js\");\n\nfunction Bomber(object){\n    this.pos = object.pos;\n    this.vel = object.vel;\n    this.color = object.color;\n    this.board = object.board;\n}\n\nBomber.prototype.draw = function(context){ \n    context.drawImage(this.img, this.pos[0], this.pos[1], 50, 50);\n}\n\nBomber.prototype.createBomber = function(){\n    let img = new Image();\n    let x = this.pos[0];\n    let y = this.pos[1];\n    img.src = '../dist/bomber.png';\n    this.img = img;\n}\n\nBomber.prototype.move = function(pos){\n    let newX = this.pos[0] + pos[0];\n    let newY = this.pos[1] + pos[1];\n    if (this.validMove([newX, newY])){\n        this.pos[0] += pos[0];\n        this.pos[1] += pos[1];\n    }\n   \n}\n\nBomber.prototype.validMove = function(pos){\n    return !this.board.field_blocks.some(blockPos => {\n        let flag = true;\n        pos.forEach((item, i) => {\n            if (item !== blockPos[i]) flag = false;\n        });\n        return flag;\n    });\n}\n\nBomber.prototype.dropBomb = function(){\n    let x = this.pos[0];\n    let y = this.pos[1];\n    let img = new Image();\n    img.src = '../dist/bomb.png';\n    this.board.bombs.push(new Bomb([x, y], img));\n}\n\nmodule.exports = Bomber;\n\n//# sourceURL=webpack:///./src/bomber.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\");\nconst Bomber = __webpack_require__(/*! ./bomber.js */ \"./src/bomber.js\");\n\nlet board;\nlet bomber;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvas = document.getElementById(\"game-canvas\");\n    const ctx = canvas.getContext(\"2d\");\n    canvas.width = 850;\n    canvas.height = 650;\n    const background = document.getElementById(\"background\");\n    const backCtx = background.getContext(\"2d\");\n    background.width = 850;\n    background.height = 650;\n    board = new Board();\n    bomber = new Bomber({ pos: [50, 50], vel: [0, 0], color: 'white', board: board });\n    bomber.createBomber();    \n    board.addBomber(bomber);\n    board.initializeBoard(backCtx);\n    board.draw(ctx);\n});\n\n\n\ndocument.addEventListener(\"keydown\", (e) => {\n    e.preventDefault();\n    let canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext(\"2d\");\n    switch (e.key){\n        case 'ArrowDown':\n            bomber.move([0, 50]);\n            board.draw(ctx);\n            break;\n        case 'ArrowUp':\n            bomber.move([0, -50]);\n            board.draw(ctx);\n            break;\n        case 'ArrowLeft':\n            bomber.move([-50, 0]);\n            board.draw(ctx);\n            break;\n        case 'ArrowRight':\n            bomber.move([50, 0]);\n            board.draw(ctx);\n            break;\n        case \" \":\n            bomber.dropBomb();\n            board.draw(ctx);\n            break;\n    }\n});\n\ndocument.addEventListener('click', (e) => {\n    if (e.target.id === \"StartButton\"){\n        let ele = document.getElementById('SplashScreen');\n        let ele2 = document.getElementById('game-canvas');\n        let ctx = ele2.getContext('2d');\n        let ele3 = document.getElementById('background');\n        ele.style = 'display: none';\n        ele2.style = 'display: block';\n        ele3.style = 'display: block';\n        board.draw(ctx);\n    }\n})\n\n//# sourceURL=webpack:///./src/index.js?");

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