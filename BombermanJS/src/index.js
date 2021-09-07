const Board = require("./board.js");
const Bomber = require("./bomber.js");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 700;
    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // let bomber = new Bomber({pos: [80,80], vel: [0,0], color: 'white'});
    let board = new Board();
    // bomber.draw(ctx);
    board.buildWall();
    board.draw(ctx);
});

// document.addEventListener("keypress", keyPressed);

// function keyPressed(event){
//     console.log(event);
// }