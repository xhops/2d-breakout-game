var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height - 30;

// creating a value to increment x and y coordinates
var dx = 2;
var dy = -2;

// variable to hold radius of drawn circle
var ballRadius = 10;

// defining variables for paddle
var paddleHeight = 10;
var paddleWidth = 75;
// paddle starting point
var paddleX = (canvas.width - paddleWidth)/2;

// variables for pressed buttons
var rightPressed = false;
var leftPressed = false;

// variables for the brick field
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// iterate through a 2 dimensional array
var bricks = [];
for(c = 0; c < brickColumnCount; c++){
	bricks[c] = [];
	for (r = 0; r <brickRowCount; r++){
		bricks[c][r] = {
			x : 0,
			y : 0
		}
	}
}

// function to draw ball on canvas
function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

// function to drawPaddle
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

// function to draw bricks
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

// function to animate ball on canvas and clear previous drawing of ball
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// call draw bricks function
	drawBricks();
	// call draw ball function
	drawBall();
	// collision detection for ball to stay inside canvas
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    	dx = -dx;
	}

	if(y + dy < ballRadius) {
    	dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
		// collision detection for paddle
    	if(x > paddleX && x < paddleX + paddleWidth) {
        	dy = -dy;
    	}
    	else {
        	alert("GAME OVER");
        	document.location.reload();
    	}
	}
	x += dx;
	y += dy;

	// setting the paddle to move only within the boundaries of the canvas
	if (rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 7;
	} else if (leftPressed && paddleX > 0){
		paddleX -=7;
	}
	// initialize draw paddle function
	drawPaddle();
}

//  checking leftPressed  boolean and setting it to true if executed
function keyDownHandler(e){
	if(e.keyCode == 39){
		rightPressed = true;
	} else if (e.keyCode == 37){
		leftPressed = true;
	}
}

// checking leftPressed  boolean and setting it to true if executed
function keyUpHandler(e){
	if (e.keyCode == 39){
		rightPressed = false;
	} else if (e.keyCode == 37){
		leftPressed = false;
	}
}

// listen for keystrokes
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// every 10 miliseconds draw on canvas
setInterval(draw, 10);
