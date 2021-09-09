const Bomber = require('./bomber.js');

const VECS = [[50, 0], [-50, 0], [0, 50], [0, -50]];

function RobotBomber(info){
    Bomber.call(this, info);
}

function inherits(ChildClass, ParentClass){
    function Surrogate(){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
}

inherits(RobotBomber, Bomber);

module.exports = RobotBomber;