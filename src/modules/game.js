//const { shipFactory } = require("./ship");
const { gameBoardFactory } = require("../modules/gameBoard");
const { player } = require("../modules/player");

const gameFactory = () => {
  const gameBoard1 = gameBoardFactory();
  const gameBoard2 = gameBoardFactory();
  const player1 = player(gameBoard1, gameBoard2, "human");
  const player2 = player(gameBoard2, gameBoard1, "computer");
  for (i = 1; i <= 2; i++) {
    let gameboard;
    if (i === 1) {
      gameboard = gameBoard1;
    }
    if (i === 2) {
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
      gameboard.coordinatesToIndex(2, 9),
      3,
      "D",
      "horizontal"
    );
    gameboard.placeShip(
      gameboard.coordinatesToIndex(4, 8),
      2,
      "P",
      "horizontal"
    );
  }
};

const game = gameFactory();
game();
