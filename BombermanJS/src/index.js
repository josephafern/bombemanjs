const Board = require("./board.js");
const Bomber = require("./bomber.js");
const RobotBomber = require("./robot_bomber.js");

let board;
let bomber;

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 850;
    canvas.height = 650;
    const background = document.getElementById("background");
    const backCtx = background.getContext("2d");
    background.width = 850;
    background.height = 650;
    board = new Board();
    bomber = new Bomber({pos: [50, 50], color: 'white', board: board});
    robot = new RobotBomber({ pos: [750, 550], color: 'black', board: board});
    bomber.createBomber();
    robot.createBomber();    
    board.addBomber(bomber).addBomber(robot);
    board.initializeBoard(backCtx);
    board.draw(ctx);
});



document.addEventListener("keydown", (e) => {
    e.preventDefault();
    let canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext("2d");
    switch (e.key){
        case 'ArrowDown':
            bomber.move([0, 50]);
            board.draw(ctx);
            break;
        case 'ArrowUp':
            bomber.move([0, -50]);
            board.draw(ctx);
            break;
        case 'ArrowLeft':
            bomber.move([-50, 0]);
            board.draw(ctx);
            break;
        case 'ArrowRight':
            bomber.move([50, 0]);
            board.draw(ctx);
            break;
        case " ":
            bomber.dropBomb(ctx);
            board.draw(ctx);
            break;
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === "StartButton"){
        let ele = document.getElementById('SplashScreen');
        let ele2 = document.getElementById('game-canvas');
        let ctx = ele2.getContext('2d');
        let ele3 = document.getElementById('background');
        ele.style = 'display: none';
        ele2.style = 'display: block';
        ele3.style = 'display: block';
        board.draw(ctx);
    }
})