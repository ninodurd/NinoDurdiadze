// get a selected size of snake
let snake_size = 3;
let Sspeed ;
let board_size;
let apples_number;
let level;
let novice;
let intermediate;

document.querySelector("#snakeSize").addEventListener("change", function (event) {
    snake_size = event.target.value;
    let size_key = "size"
    localStorage.setItem("size", snake_size)
    console.log(snake_size)
})
// get a selected speed of snake
document.querySelector("#snakeSpeed").addEventListener("change", function (event) {

    Sspeed = event.target.value;
    let speed_key = "speed"
    localStorage.setItem("speed", Sspeed)
    console.log(Sspeed)
})
// get selected Board Size
document.querySelector("#boardSize").addEventListener("change", function (event) {
    board_size = event.target.value;
    let board_key = "board"
    localStorage.setItem("board", board_size)
    console.log(board_size)
})
// get selected simultaneous Apples Number
document.querySelector("#applesNumber").addEventListener("change", function (event) {
    apples_number = event.target.value;
    let apple_key = "apples"
    localStorage.setItem("apples", apples_number)
    console.log(apples_number)
})
// get selected level 
document.querySelector("#novice").addEventListener("click", function (event) {
    novice = event.target.textContent;
    localStorage.setItem("level", novice)
    console.log(novice)
})
document.querySelector("#intermediate").addEventListener("click", function (event) {
    intermediate = event.target.textContent;
    localStorage.setItem("level", intermediate)
    console.log(intermediate)
})
document.querySelector("#hard").addEventListener("click", function (event) {
    hard = event.target.textContent;
    localStorage.setItem("level", hard)
    console.log(hard)
})

