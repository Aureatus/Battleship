import "normalize.css";
import "./style.css";

import gameBoardFactory from "./modules/logic/gameBoard";
import { player } from "./modules//logic/player";
import shipPlacement from "./modules/dom/shipPlacement";
import generateGrid from "./modules/dom/generateGrid";
import shipPlacementInterfaceGenerator from "./modules/dom/shipPlacementInterfaceGenerator";
import attackListener from "./modules/dom/attackListener";

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
  generateGrid(gameBoard1, 0);
  generateGrid(gameBoard2, 1);
  shipPlacementInterfaceGenerator();

  shipPlacement(
    gameBoard1,
    attackListener,
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
