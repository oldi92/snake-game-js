const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//ADD EVENT LISTENER TO THE CANVAS
document.addEventListener("keydown", direction);
function direction(event) {
  if (event.keyCode === 37 && d !== "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode === 38 && d !== "DOWN") {
    d = "UP";
  } else if (event.keyCode === 39 && d !== "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode === 40 && d !== "UP") {
    d = "DOWN";
  }
}

//BOX UNIT SET
const box = 25;

//canvas size of the snake its gonna move
const canvasSize = 23;

//SET DIRECTION
let d = "RIGHT";

//SET SCORE
let score = 0;

//SET SNAKE
snake = [];
snake[0] = {
  x: 7 * box,
  y: 10 * box,
};
snake[1] = {
  x: 6 * box,
  y: 10 * box,
};

//SET FOOD
let food = {
  x: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
  y: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
};

//THE DRAW FUNCTION
function draw() {
  //DRAW BACKGROUND
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(box, box, canvasSize * box - box, canvasSize * box - box);

  //create TEXT
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(score, box, box);

  //LOOP SNAKE TO DRAW THE BOXES
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "red " : "black";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[0].x, snake[0].y, box, box);
  }
  //SET THE OLD DIRECTIONS
  snakeX = snake[0].x;
  snakeY = snake[0].y;

  //SET WHICH DIRECTION WE GONNA ADD THE NEW HEAD
  if (d === "RIGHT") {
    snakeX += box;
  } else if (d === "LEFT") {
    snakeX -= box;
  } else if (d === "UP") {
    snakeY -= box;
  } else if (d === "DOWN") {
    snakeY += box;
  }

  //SET FOOD
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  //SET THE NEW HEAD
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //GAME OVER IF CRASH ON WALLS
  if (
    snake[0].x > canvasSize * box - box * 2 ||
    snake[0].x === box ||
    snake[0].y > canvasSize * box - box * 2 ||
    snake[0].y === box
  ) {
    console.log("GAME OVER ");
    ctx.fillStyle = "rgba(40,40,40, 0.5)";
    ctx.fillRect(0, 0, 600, 600);
    //game over text
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER!", 180, 260);
    //restart game
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press any KEY to RESTART...", 210, 300);
    clearInterval(game);
    document.addEventListener("keydown", restart);
  }

  //GAME OVER IF CRASH ON ITSELF
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      console.log("GAME OVER ");
      ctx.fillStyle = "rgba(40,40,40, 0.7)";
      ctx.fillRect(0, 0, 600, 600);
      //game over text
      ctx.font = "40px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("GAME OVER!", 180, 260);
      //restart game
      ctx.font = "15px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Press any KEY to RESTART...", 210, 300);
      clearInterval(game);
      document.addEventListener("keydown", restart);
    }
  }

  //SET WHEN SNAKE EAT FOOD
  if (snake[0].x === food.x && snake[0].y === food.y) {
    food = {
      x: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
      y: Math.floor(1 + Math.random() * (canvasSize - 1)) * box,
    };
    ctx.clearRect(box, 0, 600, box);
    score += 100;
  } else {
    //REMOVE THE LAST BOX OF THE SNAKE
    snake.pop();
  }

  //WE PUSH INTO SNAKE ARRAY THE NEW HEAD
  snake.unshift(newHead);
}

function restart(event) {
  console.log("restart");
  location.reload();
  game = setInterval(draw, 100);
}

let game = setInterval(draw, 100);
