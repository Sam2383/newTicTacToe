const readlineSync = require("readline-sync");

function computerTurn(computerChoice, board) {
  // DYNAMICALLY REDUCE NO. OF COMPUTER CHOICES
  console.log("COMPUTER'S MOVE");

  const availablePos = Object.keys(board).filter((key) => board[key] == "");
  let availablePosIndex = Math.floor(Math.random() * availablePos.length);
  board[availablePos[availablePosIndex]] = computerChoice;
  generateBoard(board);
}

function generateBoard(board) {
  console.log(
    `-------------------- BOARD UPDATED --------------------\n` +
      `${board[1] || 1} | ${board[2] || 2} | ${board[3] || 3}\n` +
      `---------\n` +
      `${board[4] || 4} | ${board[5] || 5} | ${board[6] || 6}\n` +
      `---------\n` +
      `${board[7] || 7} | ${board[8] || 8} | ${board[9] || 9}\n`
  );
}

function humanTurn(playerChoice, board) {
  console.log("YOUR MOVE");
  let humanPos = readlineSync.question(
    `Choose a position to make your move (1-9): `
  );
  while (!Object.keys(board).includes(humanPos)) {
    humanPos = readlineSync.question(
      `Invalid input, choose a position to make your move (1-9): `
    );
  }

  if (board[humanPos] == "") {
    board[humanPos] = playerChoice;
  } else {
    humanPos = readlineSync.question(
      `Position ${humanPos} is already occupied. Press enter to continue: `
    );
    humanTurn(playerChoice);
  }

  generateBoard(board);
}

function isWinner(board, playerChoice, computerChoice) {
  const winningCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    if (
      board[winningCombinations[i][0]] === playerChoice &&
      board[winningCombinations[i][1]] === playerChoice &&
      board[winningCombinations[i][2]] === playerChoice
    ) {
      console.log("3 in a row, you win");
      return true;
    } else if (
      board[winningCombinations[i][0]] === computerChoice &&
      board[winningCombinations[i][1]] === computerChoice &&
      board[winningCombinations[i][2]] === computerChoice
    ) {
      console.log("3 in a row, computer wins");
      return true;
    }
  }

  return false;
}

function checkBoardFull(board) {
  for (let i = 1; i <= Object.keys(board).length; i++) {
    if (board[i] === "") {
      return false;
    }
  }
  return true;
}

function play() {
  let winner = false;
  let board = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };

  playerChoice = readlineSync.question(
    "Weclome to tic-tac-toe, input 'O' to be noughts or 'X' to be crosses: "
  );

  let computerChoice = "";
  if (playerChoice === "X") {
    computerChoice = "O";
  } else if (playerChoice === "0") {
    computerChoice = "X";
  } else {
    console.log("Invalid input, defaulting to 'X' for player");
    playerChoice = "X";
    computerChoice = "O";
  }

  generateBoard(board);

  while (winner == false || boardFull == false) {
    humanTurn(playerChoice, board);
    if (isWinner(board, playerChoice, computerChoice)) {
      break;
    } else if (checkBoardFull(board)) {
      playAgain = readlineSync.question("IT'S A TIE! Play again? (y/n): ");
      if (playAgain === "y") {
        play();
      } else {
        break;
      }
    } else {
      computerTurn(computerChoice, board);
    }
  }
}

play();
