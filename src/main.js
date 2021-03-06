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
    let finishedGameBoard = false;

    if (gameBoard1.shipsSunk() === true) {
      finishedGameBoard = "gameBoard1";
    }
    if (gameBoard2.shipsSunk() === true) {
      finishedGameBoard = "gameBoard2";
    }

    return { finishedGameBoard };
  };

  player2.placeShipsAI();
  domMethods().generateGrid(gameBoard1, 0);
  domMethods().generateGrid(gameBoard2, 1);
  domMethods().shipPlacementInterfaceGenerator();

  domMethods().shipPlacement(
    gameBoard1,
    domMethods().attackListener,
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
