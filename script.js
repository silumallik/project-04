// add new scale 
// const bord = document.querySelector(".bord")
// const startbutton = document.querySelector(".btn-strt")
// const featurebutton = document.querySelector(".ftrbutton")
// const startgame = document.querySelector(".strgm")
// const gameover = document.querySelector(".restrt")
// const restartbutton = document.querySelector(".btn-restrt")

// const blkhig = 30;
// const blkwid = 30;

// const cols = Math.floor(bord.clientWidth / blkwid)
// const rows = Math.floor(bord.clientHeight / blkhig)
// let intervalId = null;

// let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
// const blks = []

// let snake = [
//     {x:1,y:3},
//     {x:1,y:4},
//     {x:1,y:5}
// ]

// let dir = 'right'

// // Create blocks (grid)
// for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//         const blk = document.createElement('div');
//         blk.classList.add("blk");
//         bord.appendChild(blk);
//         blks[`${i}-${j}`] = blk;
//     }
// }

// function render() {

//     let head = null;

//     // first remove old food class
//     document.querySelectorAll(".food").forEach(f => f.classList.remove("food"));

//     // add food
//     blks[`${food.x}-${food.y}`].classList.add("food");

//     // movement
//     if (dir === "left") {
//         head = {x:snake[0].x, y: snake[0].y - 1}
//     } else if(dir === "right"){
//         head = {x:snake[0].x, y: snake[0].y + 1}
//     } else if(dir === "down"){
//         head = {x:snake[0].x + 1, y: snake[0].y}
//     } else if(dir === "up"){
//         head = {x:snake[0].x - 1, y: snake[0].y}
//     }

//     // boundary hit → game over
//     if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
//         // alert("game over")
//         clearInterval(intervalId)
//         featurebutton.style.display="flex"
//         return;
//     }

//     // eating food
//     if(head.x == food.x && head.y == food.y){
//         blks[`${food.x}-${food.y}`].classList.remove("food")
//         food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
//         snake.unshift(head)
//     }

//     // clear previous snake blocks
//     snake.forEach(seg => {
//         blks[`${seg.x}-${seg.y}`].classList.remove("fill")
//     })

//     // move snake
//     snake.unshift(head)
//     snake.pop()

//     // draw snake
//     snake.forEach(seg => {
//         blks[`${seg.x}-${seg.y}`].classList.add("fill")
//     })
// }

// intervalId = setInterval(()=>{
//     render()
// }, 500)

// //button feature
// startbutton.addEventListener("click",() =>{
//     featurebutton.style.display = "none";
//     intervalId = setInterval(() => { render() }, 500);
//     // restartgame()
// })

// restartbutton.addEventListener("click", restartgame)

// function restartgame(){

//     blks[`${food.x}-${food.y}`].classList.remove("food")
//     snake.forEach(seg=>{
//         blks[`${seg.x}-$(seg.y)`].classList.remove("fill")
//     })
//     featurebutton.style.display = "none";
//     snake = [{x:1,y:3},{x:1,y:4},{x:1,y:5}]
//     food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
//     intervalId = setInterval(() => { render()}, 500)
// }

// addEventListener("keydown", (event) => {
//     if (event.key == "ArrowUp" && dir !== "down") {
//         dir = "up"
//     } else if (event.key == "ArrowRight" && dir !== "left"){
//         dir = "right"
//     } else if (event.key == "ArrowLeft" && dir !== "right"){
//         dir = "left"
//     } else if (event.key == "ArrowDown" && dir !== "up"){
//         dir = "down"
//     }
// })





const bord = document.querySelector(".bord")
const startbutton = document.querySelector(".btn-strt")
const featurebutton = document.querySelector(".ftrbutton")
const gameover = document.querySelector(".restrt")
const restartbutton = document.querySelector(".btn-restrt")
const sb = document.querySelector(".strgm")

const highscoreele = document.querySelector("#high-score")
const scoreele = document.querySelector("#score")
const timeele = document.querySelector("#time")

const blkhig = 30;
const blkwid = 30;

let highscore = localStorage.getItem("highscore") || 0;
let score = 0;
let time = `00-00`;

highscoreele.innerText = highscore;

const cols = Math.floor(bord.clientWidth / blkwid)
const rows = Math.floor(bord.clientHeight / blkhig)

let intervalId = null;
let timeIntervallId = null;

let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
}

const blks = []

let snake = [
    {x:1,y:3},
    {x:1,y:4},
    {x:1,y:5}
]

let dir = 'right'

// Create grid
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const blk = document.createElement('div');
        blk.classList.add("blk");
        bord.appendChild(blk);
        blks[`${i}-${j}`] = blk;
    }
}

// Game render
function render() {
    let head = null;

    document.querySelectorAll(".food").forEach(f => f.classList.remove("food"));
    blks[`${food.x}-${food.y}`].classList.add("food");

    if (dir === "left") head = {x:snake[0].x, y: snake[0].y - 1}
    else if(dir === "right") head = {x:snake[0].x, y: snake[0].y + 1}
    else if(dir === "down") head = {x:snake[0].x + 1, y: snake[0].y}
    else if(dir === "up") head = {x:snake[0].x - 1, y: snake[0].y}

    // boundary hit → game over
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        // alert("gameover")
        clearInterval(intervalId)
        featurebutton.style.display="flex"
        gameover.style.display="flex"
        sb.style.display="none"
        clearInterval(intervalId); 
        return;
    }

    // eat food
    if(head.x == food.x && head.y == food.y){
        blks[`${food.x}-${food.y}`].classList.remove("food")
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        }
        snake.unshift(head)
        score += 1;
        scoreele.innerText = score;

        if(score>highscore){
            highscore = score;
            localStorage.setItem("highscore",highscore)
        }
    }

    // clear snake
    snake.forEach(seg => {
        blks[`${seg.x}-${seg.y}`].classList.remove("fill")
    })

    // move
    snake.unshift(head)
    snake.pop()

    // draw snake
    snake.forEach(seg => {
        blks[`${seg.x}-${seg.y}`].classList.add("fill")
    })
}

// START BUTTON
startbutton.addEventListener("click", () => {
    featurebutton.style.display = "none";
    //clear interval
    clearInterval(intervalId)
    // 🔥 Reset snake & direction
    snake = [
        {x:1, y:3},
        {x:1, y:4},
        {x:1, y:5}
    ];
    dir = "right";

    // 🔥 Remove all previous snake blocks
    document.querySelectorAll(".fill").forEach(b => b.classList.remove("fill"));

    // 🔥 Start fresh
    intervalId = setInterval(render, 200);
    timeIntervallId = setInterval(() =>{
        let [min, sec] = time.split("-").map(Number)
        if (sec == 59) {
            min += 1
            sec=0
        } else {
            sec += 1
        }

        time = `${min}-${sec}`
        timeele.innerText = time
    },1000)
})

// RESTART BUTTON
restartbutton.addEventListener("click", restartgame)

function restartgame() {
    clearInterval(intervalId);

    blks[`${food.x}-${food.y}`].classList.remove("food");

    snake.forEach(seg => {
        blks[`${seg.x}-${seg.y}`].classList.remove("fill");
    });

    score = 0;
    time = `00-00`
    scoreele.innerText = score;
    timeele.innerText = time;
    highscoreele.innerText = highscore;

    featurebutton.style.display = "none";

    // reset snake
    snake = [
        {x:1,y:3},
        {x:1,y:4},
        {x:1,y:5}
    ];

    // reset direction
    dir = "right";

    // reset food
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };

    intervalId = setInterval(render, 200);
}


// Keyboard event
addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" && dir !== "down") dir = "up"
    else if (event.key == "ArrowRight" && dir !== "left") dir = "right"
    else if (event.key == "ArrowLeft" && dir !== "right") dir = "left"
    else if (event.key == "ArrowDown" && dir !== "up") dir = "down"
})

