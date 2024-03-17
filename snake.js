//game const
let inputDir ={x:0,y:0};
let foodSound = new Audio(`song/food.mp3`);
let gameOverSound = new Audio(`song/gameover.mp3`);
let moveSound = new Audio(`song/move.mp3`);
let musicSound = new Audio(`song/music.mp3`);
let speed = 5;
let Score = 0;
let lastPaintTime = 0;
let sankeArray =[
    {x:7,y:13}
]
food = {x:6,y:7};

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function iscollapse(snake)
{
    //if snake collide with itself
    for (let i = 1; i < sankeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // if it collide with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
        
}

function gameEngine(){
    musicSound.play();
    //part1 : updating the sanke array & food
    if(iscollapse(sankeArray))
    {
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x:0 , y:0};
        alert("Game over Press any key Restart");
        sankeArray =[{x:7,y:13}];
        Score =0;

    }
    // snake has eaten the food increament the score and regenerate the food

    if(sankeArray[0].y === food.y && sankeArray[0].x === food.x){
        foodSound.play();
        Score +=1;
        scorebox.innerHTML = "Score:0" + Score;
        sankeArray.unshift({x:sankeArray[0].x + inputDir.x,y:sankeArray[0].y + inputDir.y});
        
        let a =2;
        let b = 16;
        food ={x:Math.round(a+(b-a)* Math.random()),y:Math.round(a+(b-a)* Math.random())}
    }
    
    //move the snake
    for (let i = sankeArray.length-2; i >=0; i--) {
        
        sankeArray[i+1] = {...sankeArray[i]};
        
    }
    sankeArray[0].x += inputDir.x;
    sankeArray[0].y += inputDir.y;






    //part2: Display the snake and the food
    //Display the snake
    board.innerHTML = "";
    sankeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}











//main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:0}
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;

        case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x = 0;
        inputDir.y = 1;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x = -1;
        inputDir.y = 0;
        break;

        case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x = 1;
        inputDir.y = 0;
        break;

      default:
        break;  
    }
});