const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const speedEl = document.getElementById('speed');
const touchButtons = document.querySelectorAll('.controls button');

const gridSize = 16;
const tileCount = canvas.width / gridSize;

let snake;
let direction;
let nextDirection;
let food;
let score;
let speedLevel;
let intervalId;
let paused;
let gameOver;

function reset() {
  snake = [
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  food = randomFood();
  score = 0;
  speedLevel = 1;
  paused = false;
  gameOver = false;
  scoreEl.textContent = score;
  speedEl.textContent = speedLevel;
  startLoop();
  draw();
}

function startLoop() {
  clearInterval(intervalId);
  const speedMs = Math.max(70, 170 - (speedLevel - 1) * 10);
  intervalId = setInterval(tick, speedMs);
}

function randomFood() {
  while (true) {
    const candidate = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
    if (!snake?.some((part) => part.x === candidate.x && part.y === candidate.y)) {
      return candidate;
    }
  }
}

function tick() {
  if (paused || gameOver) {
    draw();
    return;
  }

  direction = nextDirection;
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (isCollision(head)) {
    gameOver = true;
    draw();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    speedLevel = Math.min(10, 1 + Math.floor(score / 40));
    scoreEl.textContent = score;
    speedEl.textContent = speedLevel;
    food = randomFood();
    startLoop();
  } else {
    snake.pop();
  }

  draw();
}

function isCollision(head) {
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true;
  }
  return snake.some((part) => part.x === head.x && part.y === head.y);
}

function drawGrid() {
  ctx.fillStyle = '#a8c58f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(23,77,32,0.15)';
  for (let i = 0; i <= tileCount; i += 1) {
    const offset = i * gridSize;
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(canvas.width, offset);
    ctx.stroke();
  }
}

function drawSnake() {
  snake.forEach((part, idx) => {
    ctx.fillStyle = idx === 0 ? '#0f3d19' : '#174d20';
    ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
  });
}

function drawFood() {
  ctx.fillStyle = '#9d1f1f';
  ctx.beginPath();
  const centerX = food.x * gridSize + gridSize / 2;
  const centerY = food.y * gridSize + gridSize / 2;
  ctx.arc(centerX, centerY, gridSize / 2.7, 0, Math.PI * 2);
  ctx.fill();
}

function drawStateText() {
  if (!paused && !gameOver) {
    return;
  }

  ctx.fillStyle = 'rgba(20,20,20,0.35)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f6f4d2';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(gameOver ? '游戏结束' : '暂停中', canvas.width / 2, canvas.height / 2);
  ctx.font = '14px sans-serif';
  ctx.fillText('按 Enter 重新开始', canvas.width / 2, canvas.height / 2 + 28);
}

function draw() {
  drawGrid();
  drawFood();
  drawSnake();
  drawStateText();
}

function setDirectionFromKey(key) {
  const map = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
  };

  const move = map[key];
  if (!move) {
    return;
  }

  const reversing = move.x + direction.x === 0 && move.y + direction.y === 0;
  if (!reversing) {
    nextDirection = move;
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    paused = !paused;
    draw();
    return;
  }

  if (event.key === 'Enter') {
    reset();
    return;
  }

  setDirectionFromKey(event.key);
});

touchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setDirectionFromKey(`Arrow${button.dataset.dir[0].toUpperCase()}${button.dataset.dir.slice(1)}`);
  });
});

reset();
