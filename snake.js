let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")
let blockSize = 10;
let score = 0;
let bestScore = 0;
let snakeSpeed;

// choose level 
let choose_level = function () {
    if (localStorage.getItem("level") != null && localStorage.getItem("level") == "Novice") {
        // localStorage.removeItem("speed")
        snakeSpeed = 200;
    } else if (localStorage.getItem("level") != null && localStorage.getItem("level") == "Intermediate") {
        snakeSpeed = 150;

    } else if (localStorage.getItem("level") != null && localStorage.getItem("level") == "Hard") {
        snakeSpeed = 100;
        console.log(snakeSpeed)
    } else {
        snakeSpeed = 200;
    }
    if (localStorage.getItem("speed") != null) {
        snakeSpeed = parseInt(localStorage.getItem("speed"))
        localStorage.removeItem("speed")
    }
}
choose_level()
let boardS = function () {
    if (localStorage.getItem("board") != null && localStorage.getItem("board") == 500 || localStorage.getItem("board") == 800 || localStorage.getItem("board") == 1000) {
        canvas.width = parseInt(localStorage.getItem("board"))
        canvas.height = parseInt(localStorage.getItem("board"))
    }
}
boardS()
//my snake game
var drawBorder = function () {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, canvas.width, blockSize);
    ctx.fillRect(0, canvas.height - blockSize, canvas.width, blockSize);
    ctx.fillRect(0, 0, blockSize, canvas.height);
    ctx.fillRect(canvas.width - blockSize, 0, blockSize, canvas.height);
};
//drawBorder()
var drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, blockSize, blockSize);
};
//drawScore()
var Block = function (col, row) {
    this.col = col;
    this.row = row;
};

Block.prototype.drawSquare = function (color) {

    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
    ctx.stroke()
}

Block.prototype.drawCircle = function (color) {
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.arc(centerX, centerY, blockSize / 2, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill();
};

Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

var Snake = function () {
    if (localStorage.getItem("size") != 0 && localStorage.getItem("size") == 5) {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5),
            new Block(4, 5),
            new Block(3, 5)
        ];
    } else if (localStorage.getItem("size") != 0 && localStorage.getItem("size") == 7) {

        this.segments = [
            new Block(9, 5),
            new Block(8, 5),
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5),
            new Block(4, 5),
            new Block(3, 5)]

    } else {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5)
        ];
    }

    this.direction = "right";
    this.nextDirection = "right";
}

Snake.prototype.draw = function () {
    for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("#145A32");
    }
};


Snake.prototype.move = function () {
    var head = this.segments[0];
    var newHead;
    this.direction = this.nextDirection;
    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }
    if
    (this.checkCollision(newHead)) {
        gameOver();
        return;
    }

    this.segments.unshift(newHead);
    if (localStorage.getItem("apples") != null && localStorage.getItem("apples") == 3) {

        if (newHead.equal(apple.position) || newHead.equal(apple.position2) || newHead.equal(apple.position3)) {
            score++;
            apple.move();
        } else {
            this.segments.pop();
        }
    } else if (localStorage.getItem("apples") != null && localStorage.getItem("apples") == 5) {

        if (newHead.equal(apple.position) || newHead.equal(apple.position2) || newHead.equal(apple.position3) || newHead.equal(apple.position4) || newHead.equal(apple.position5)) {
            score++;
            apple.move();
        } else {
            this.segments.pop();
        }
    } else if ((localStorage.getItem("apples") != null && localStorage.getItem("apples") == 1)|| localStorage.getItem("apples") == null){
        if (newHead.equal(apple.position)) {
            score++;
            apple.move();
        }
        else {
            this.segments.pop();
        }
    }
};


Snake.prototype.checkCollision = function (head) {
    var leftCollision = (head.col === 0);
    var topCollision = (head.row === 0);
    var rightCollision = (head.col === canvas.width / blockSize - 1);
    var bottomCollision = (head.row === canvas.height / blockSize - 1);
    var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
    var selfCollision = false;
    for (var i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }
    return wallCollision || selfCollision;
}



var directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};


document.addEventListener("keydown", function (event) {
    var newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
})


Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") { return; }
    this.nextDirection = newDirection;
};


var Apple = function () {
    if (localStorage.getItem("apples") != null && localStorage.getItem("apples") == 3) {
        this.position = new Block(10, 10);
        this.position2 = new Block(20, 20);
        this.position3 = new Block(30, 30);
    } else if (localStorage.getItem("apples") != null && localStorage.getItem("apples") == 5) {
        this.position = new Block(10, 10);
        this.position2 = new Block(20, 20);
        this.position3 = new Block(20, 40);
        this.position4 = new Block(10, 20);
        this.position5 = new Block(30, 10);
    } else if ((localStorage.getItem("apples") != null && localStorage.getItem("apples") == 1)|| localStorage.getItem("apples") == null){
        this.position = new Block(10, 10);
    }
};


Apple.prototype.draw = function () {
    if (localStorage.getItem("apples") != null && localStorage.getItem("apples") == 3) {
        this.position.drawCircle("Red");
        this.position2.drawCircle("Red");
        this.position3.drawCircle("Red");
    } else if (localStorage.getItem("apples") != null && localStorage.getItem("apples") == 5) {
        this.position.drawCircle("Red");
        this.position2.drawCircle("Red");
        this.position3.drawCircle("Red");
        this.position4.drawCircle("Red");
        this.position5.drawCircle("Red");
    } else if ((localStorage.getItem("apples") != null && localStorage.getItem("apples") == 1)|| localStorage.getItem("apples") == null){
        this.position.drawCircle("Red");
    }
};

Apple.prototype.move = function () {
    var randomCol = Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1;
    var randomRow = Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1;
    if (localStorage.getItem("apples") != null && localStorage.getItem("apples") == 3) {
        this.position = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);
        this.position2 = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);
        this.position3 = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);
    } else if (localStorage.getItem("apples") != null && localStorage.getItem("apples") == 5) {
        this.position = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);
        this.position2 = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);
        this.position3 = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);
        this.position4 = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);
        this.position5 = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);
    } else if ((localStorage.getItem("apples") != null && localStorage.getItem("apples") == 1)|| localStorage.getItem("apples") == null){
        this.position = new Block(Math.floor(Math.random() * (canvas.width / blockSize - 2)) + 1, Math.floor(Math.random() * (canvas.height / blockSize - 2)) + 1);

    }
};


var snake = new Snake();
var apple = new Apple();

var intervalId = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, snakeSpeed)
var gameOver = function () {
    clearInterval(intervalId);
    best_score()
    ctx.font = "50px Courier";
    ctx.fillStyle = "#145A32"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Best Score: " + bestScore, canvas.width / 2, canvas.height / 2);
};
// count your best score

let best_score = function () {
    if (score > bestScore) {
        bestScore = score;
        console.log(bestScore)
        localStorage.setItem("bestScore", bestScore)
        bestScore = localStorage.getItem("bestScore")
    }
}

