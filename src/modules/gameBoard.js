const { shipFactory } = require("./ship");

const gameBoardFactory = () => {
  const gameBoardArray = new Array(100).fill("");
  const ships = [];
  const placeShip = (position, length, tag, orientation) => {
    if (orientation === "horizontal") {
      for (i = position; i < position + length; i++) {
        if (gameBoardArray[i] != "") {
          throw new Error(
            `You are trying to place a ship where there is already one.`
          );
        }
      }
      ships.push(shipFactory(length));
      for (i = position; i < position + length; i++) {
        gameBoardArray[i] = tag;
      }
    }
    if (orientation === "vertical") {
      let counter = position;
      for (i = position; i < position + length; i++) {
        if (gameBoardArray[counter] != "") {
          throw new Error(
            `You are trying to place a ship where there is already one.`
          );
        }
        counter += 10;
      }
      counter = position;
      ships.push(shipFactory(length));
      for (i = position; i < position + length; i++) {
        gameBoardArray[counter] = tag;
        counter += 10;
      }
    }
  };
  return { gameBoardArray, placeShip, ships };
};

exports.gameBoardFactory = gameBoardFactory;
