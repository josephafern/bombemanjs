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

eval("const Block = __webpack_require__(/*! ./block.js */ \"./src/block.js\");\n\nfunction Board(){\n  this.walls = [];\n}\n\nconst WALL_CORD = [[0,0], [0,1], [0,2], [0,3], [0,4]];\n\nBoard.prototype.draw = function(ctx){\n  // let x = 0;\n  // let y = -80;\n  // for (let i = 0; i < 8; i++){\n  //   y += 80;\n  //   let img = new Image();\n  //   img.onload = function(){\n  //       ctx.drawImage(img, x, y, 80, 80);\n  //   };\n  //   img.src = '../dist/stone.png';\n  // }\n    for (let i=0; i< this.walls.length; i++){\n      let char = new Image();\n      console.log(char);\n      char.onload = function(){\n        ctx.drawImage(char, this.walls[i].pos[0], this.walls[i].pos[1], 80, 80);\n      };\n      char.src = '../dist/stone.png';\n    }\n}\n  Board.prototype.buildWall = function(ctx){\n    for (let i = 0; i < WALL_CORD.length; i++){\n      this.walls.push(new Block(WALL_CORD[i], false));\n    }\n  }\n  \n    \n    \n  \n\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/bomber.js":
/*!***********************!*\
  !*** ./src/bomber.js ***!
  \***********************/
/***/ ((module) => {

eval("function Bomber(object){\n    this.pos = object.pos;\n    this.vel = object.vel;\n    this.color = object.color;\n}\n\nBomber.prototype.draw = function(context){\n    let char = new Image();\n    let x = this.pos[0];\n    let y = this.pos[1]\n    char.onload = function(){\n        context.drawImage(char, x, y, 80, 80);\n    };\n    char.src = '../dist/bomber.jpg';\n}\n\nmodule.exports = Bomber;\n\n//# sourceURL=webpack:///./src/bomber.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\");\nconst Bomber = __webpack_require__(/*! ./bomber.js */ \"./src/bomber.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvas = document.getElementById(\"game-canvas\");\n    const ctx = canvas.getContext(\"2d\");\n    canvas.width = 1000;\n    canvas.height = 700;\n    // ctx.fillStyle = \"green\";\n    // ctx.fillRect(0, 0, canvas.width, canvas.height);\n    // let bomber = new Bomber({pos: [80,80], vel: [0,0], color: 'white'});\n    let board = new Board();\n    // bomber.draw(ctx);\n    board.buildWall();\n    board.draw(ctx);\n});\n\n// document.addEventListener(\"keypress\", keyPressed);\n\n// function keyPressed(event){\n//     console.log(event);\n// }\n\n//# sourceURL=webpack:///./src/index.js?");

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