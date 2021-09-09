const Board = require("./board.js");
const Bomber = require("./bomber.js");
const RobotBomber = require("./robot_bomber.js");

let board;
let bomber;
let robot;
let started;

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 850;
    canvas.height = 650;
    const background = document.getElementById("background");
    const backCtx = background.getContext("2d");
    background.width = 850;
    background.height = 650;
    started = false;
    board = new Board();
    bomber = new Bomber({pos: [50, 50], color: 'White', board: board});
    robot = new RobotBomber({ pos: [750, 550], color: 'Black', board: board});
    bomber.createBomber('./dist/bomber.png');
    robot.createBomber('./dist/bomber2.png');
    board.addBomber(bomber).addBomber(robot);
    board.initializeBoard(backCtx);
    board.draw(ctx);
    
});



document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (start){
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
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === "start-btn") {
        let ele = document.getElementById('instructions');
        let ele2 = document.getElementById('game-canvas');
        let ctx = ele2.getContext('2d');
        let ele3 = document.getElementById('background');
        ele.style = 'display: none';
        ele2.style = 'display: block';
        ele3.style = 'display: block';
        start = true;
        board.draw(ctx);
        board.runLoop(robot, ctx);
    } else if (e.target.id === 'mute') {
        let ele = document.getElementById('theme-song');
        let ele2 = board.audioObj();
        let vol = ele.volume;
        if (vol) {
            ele.volume = 0.0;
            ele2.volume = 0.0;
        } else {
            ele.volume = 0.15;
            ele2.volume = 0.05;
        }
    } else if (e.target.id === 'enter-btn'){
        let ele = document.getElementById('splash-screen');
        let ele2 = document.getElementById('instructions');
        ele.style = 'display: none';
        ele2.style = 'display: block';
    }
})