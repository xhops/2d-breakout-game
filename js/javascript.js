var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height - 30;

// creating a value to increment x and y coordinates
var dx = 2;
var dy = -2;

// variable to hold radius of drawn circle
var ballRadius = 10;

// function to draw ball on canvas
function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

// function to animate ball on canvas and clear previous drawing of ball
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	// collision detection for ball to stay inside canvas
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
	}
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    	dy = -dy;
	}
	x += dx;
	y += dy;
}

// every 10 miliseconds draw on canvas
setInterval(draw, 10);
