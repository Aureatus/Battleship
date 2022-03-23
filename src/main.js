import "normalize.css";
import "./style.css";

const { gameBoardFactory } = require("./modules/gameBoard");
const { player } = require("./modules/player");
const { domMethods } = require("./modules/DOM");

const gameOver = () => {
  newGame[0] = gameFactory();
};

const gameFactory = () => {
  const gameBoard1 = gameBoardFactory();
  const gameBoard2 = gameBoardFactory();
  const player1 = player(gameBoard1, gameBoard2, "human");
  const player2 = player(gameBoard2, gameBoard1, "computer");

  const isGameOver = () => {
    let finishedGameBoardShipState;
    let finishedGameBoard = false;

    if (gameBoard1.shipsSunk() === true) {
      finishedGameBoard = gameBoard1;
      finishedGameBoardShipState = finishedGameBoard.shipsSunk();
    }
    if (gameBoard2.shipsSunk() === true) {
      finishedGameBoard = gameBoard2;
      finishedGameBoardShipState = finishedGameBoard.shipsSunk();
    }

    return { finishedGameBoardShipState, finishedGameBoard };
  };
  for (let i = 1; i <= 2; i++) {
    let gameboard;
    if (i === 1) {
      gameboard = gameBoard1;
    } else if (i === 2) {
      gameboard = gameBoard2;
    }
    gameboard.placeShip(gameboard.coordinatesToIndex(0, 0), 5, "C", "vertical");
    gameboard.placeShip(
      gameboard.coordinatesToIndex(3, 2),
      4,
      "B",
      "horizontal"
    );
    gameboard.placeShip(
      gameboard.coordinatesToIndex(2, 5),
      3,
      "D",
      "horizontal"
    );
    gameboard.placeShip(gameboard.coordinatesToIndex(7, 0), 3, "S", "vertical");
    gameboard.placeShip(
      gameboard.coordinatesToIndex(4, 8),
      2,
      "P",
      "horizontal"
    );
  }
  domMethods().generateGrid(gameBoard1, 0);
  domMethods().generateGrid(gameBoard2, 1);
  domMethods().attackListener(
    1,
    gameBoard2,
    gameBoard1,
    player1.attackEnemyGameboard,
    player2.attackEnemyGameboard,
    isGameOver,
    gameOver
  );
};

const initialGame = gameFactory;
initialGame();

const newGame = [];
