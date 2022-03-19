const { shipFactory } = require("./ship");

const gameBoardFactory = () => {
  const gameBoardArray = new Array(100).fill("");
  const ships = [];
  const placeShip = (position, length, tag, orientation) => {
    ships.push(shipFactory(length));

    if (orientation === "horizontal") {
      for (i = position; i < position + length; i++) {
        gameBoardArray[i] = tag;
      }
    }
    if (orientation === "vertical") {
      let counter = position;
      for (i = position; i < position + length; i++) {
        gameBoardArray[counter] = tag;
        counter += 10;
      }
    }
  };
  return { gameBoardArray, placeShip, ships };
};

exports.gameBoardFactory = gameBoardFactory;
