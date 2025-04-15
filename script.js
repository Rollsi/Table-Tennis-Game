// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Get speed control elements
const speedSlider = document.getElementById('ballSpeed');
const speedValue = document.getElementById('speedValue');

// Get mobile control buttons
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');

// Set canvas size
function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    canvas.width = Math.min(800, containerWidth);
    canvas.height = canvas.width / 2;
}

// Initial resize
resizeCanvas();

// Resize canvas when window is resized
window.addEventListener('resize', resizeCanvas);

// Game objects
const paddleWidth = 10;
const paddleHeight = 60;
const ballSize = 8;

// Paddle objects
const player = {
    x: 50,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    score: 0,
    speed: 8
};

const computer = {
    x: canvas.width - 50 - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    score: 0,
    speed: 6
};

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    speed: parseFloat(speedSlider.value),
    velocityX: 5,
    velocityY: 5,
    reset: function() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.velocityX = -this.velocityX;
        this.speed = parseFloat(speedSlider.value);
    }
};

// Speed control event listener
speedSlider.addEventListener('input', function() {
    const newSpeed = parseFloat(this.value);
    speedValue.textContent = newSpeed;
    ball.speed = newSpeed;
    
    // Update velocities to maintain direction but change speed
    const currentDirection = Math.atan2(ball.velocityY, ball.velocityX);
    ball.velocityX = newSpeed * Math.cos(currentDirection);
    ball.velocityY = newSpeed * Math.sin(currentDirection);
});

// Controls state
let upPressed = false;
let downPressed = false;

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') upPressed = true;
    if (e.key === 'ArrowDown') downPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') upPressed = false;
    if (e.key === 'ArrowDown') downPressed = false;
});

// Mobile touch controls
upButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    upPressed = true;
});

upButton.addEventListener('touchend', (e) => {
    e.preventDefault();
    upPressed = false;
});

downButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    downPressed = true;
});

downButton.addEventListener('touchend', (e) => {
    e.preventDefault();
    downPressed = false;
});

// Mouse/touch paddle control
let touchActive = false;

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', () => {
    touchActive = false;
});

function handleTouchStart(e) {
    e.preventDefault();
    touchActive = true;
    handleTouchMove(e);
}

function handleTouchMove(e) {
    if (!touchActive) return;
    e.preventDefault();
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const relativeY = touch.clientY - rect.top;
    const targetY = (relativeY / rect.height) * canvas.height - player.height / 2;
    
    player.y = Math.max(0, Math.min(canvas.height - player.height, targetY));
}

// Check for collisions
function collision(ball, paddle) {
    return ball.x + ball.size > paddle.x && 
           ball.x - ball.size < paddle.x + paddle.width &&
           ball.y + ball.size > paddle.y &&
           ball.y - ball.size < paddle.y + paddle.height;
}

// Update game objects
function update() {
    // Move player paddle with buttons/keyboard
    if (!touchActive) {
        if (upPressed && player.y > 0) {
            player.y -= player.speed;
        }
        if (downPressed && player.y < canvas.height - player.height) {
            player.y += player.speed;
        }
    }

    // Move computer paddle
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;
    
    if (computerCenter < ballCenter - 35) {
        computer.y += computer.speed;
    } else if (computerCenter > ballCenter + 35) {
        computer.y -= computer.speed;
    }

    // Move ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top and bottom walls
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Ball collision with paddles
    let paddle = ball.x < canvas.width / 2 ? player : computer;
    
    if (collision(ball, paddle)) {
        // Calculate where the ball hits the paddle
        let collidePoint = (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
        
        // Calculate angle
        let angleRad = (Math.PI / 4) * collidePoint;
        
        // Change ball direction
        let direction = ball.x < canvas.width / 2 ? 1 : -1;
        
        // Change velocity
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
    }

    // Update score
    if (ball.x - ball.size < 0) {
        computer.score++;
        document.getElementById('computerScore').textContent = computer.score;
        ball.reset();
    } else if (ball.x + ball.size > canvas.width) {
        player.score++;
        document.getElementById('playerScore').textContent = player.score;
        ball.reset();
    }
}

// Draw game objects
function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(computer.x, computer.y, computer.width, computer.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop(); 