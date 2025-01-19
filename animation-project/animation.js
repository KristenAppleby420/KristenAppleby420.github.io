const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
let ball = {
    x: 50,
    y: 50,
    radius: 15,
    dx: 2, // Horizontal speed
    dy: 2, // Vertical speed
    color: "blue",
};

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Update ball position
function updateBallPosition() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    drawBall();

    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Check for collisions with walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx; // Reverse horizontal direction
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy; // Reverse vertical direction
    }
}

// Animation loop
function animate() {
    updateBallPosition();
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", () => {
    // Assign a random color
    ball.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
});

// Start the animation
animate();
