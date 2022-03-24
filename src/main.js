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

  const placeShipsAI = () => {
    let shipLetter;
    let shipLength;
    let shipOrientation = "horizontal";
    let coordinates = [];
    const coordinateGenerator = () => {
      let verificationArray = new Array(100).fill("");
      let a = 0;
      while (a < 5) {
        switch (a) {
          case 0:
            shipLetter = "C";
            shipLength = 5;
            break;
          case 1:
            shipLetter = "B";
            shipLength = 4;
            break;
          case 2:
            shipLetter = "D";
            shipLength = 3;
            break;
          case 3:
            shipLetter = "S";
            shipLength = 3;
            break;
          case 4:
            shipLetter = "P";
            shipLength = 2;
            break;
          default:
            break;
        }
        const coordObject = {};
        coordObject.x = Math.floor(Math.random() * 9);
        coordObject.y = Math.floor(Math.random() * 9);
        let shipPosition = gameBoardFactory().coordinatesToIndex(
          coordObject.x,
          coordObject.y
        );
        let passesIf = true;
        if (shipOrientation === "horizontal") {
          for (let i = shipPosition; i < shipPosition + shipLength; i++) {
            if (verificationArray[i] != "") {
              passesIf = false;
            }
            let currentTenth = Math.floor(shipPosition / 10) * 10;
            if (shipPosition + shipLength > currentTenth + 10) {
              passesIf = false;
            }
          }
          if (passesIf) {
            for (let i = shipPosition; i < shipPosition + shipLength; i++) {
              verificationArray[i] = shipLetter;
            }
            coordinates.push(coordObject);
            a++;
          }
        }
      }
    };
    coordinateGenerator();
    let counter = 0;
    for (counter; counter < 5; counter++) {
      switch (counter) {
        case 0:
          shipLetter = "C";
          shipLength = 5;
          break;
        case 1:
          shipLetter = "B";
          shipLength = 4;
          break;
        case 2:
          shipLetter = "D";
          shipLength = 3;
          break;
        case 3:
          shipLetter = "S";
          shipLength = 3;
          break;
        case 4:
          shipLetter = "P";
          shipLength = 2;
          break;
        default:
          break;
      }
      gameBoard2.placeShip(
        gameBoard2.coordinatesToIndex(
          coordinates[counter].x,
          coordinates[counter].y
        ),
        shipLength,
        shipLetter,
        "horizontal"
      );
    }
  };

  placeShipsAI();
  /*for (let i = 2; i <= 2; i++) {
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
  }*/
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
