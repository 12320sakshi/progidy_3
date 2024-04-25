let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

cells.forEach(cell => cell.addEventListener('click', handleClick));
document.getElementById('reset').addEventListener('click', resetGame);

function handleClick() {
  const cellIndex = parseInt(this.id);

  if (gameState[cellIndex] !== '' || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  this.textContent = currentPlayer;
  
  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  
  if (checkDraw()) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  message.textContent = `Player ${currentPlayer}'s Turn`;
}