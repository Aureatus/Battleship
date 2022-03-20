const { shipFactory } = require("./ship");

const gameBoardFactory = () => {
  const gameBoardArray = new Array(100).fill("");
  const ships = {};
  const coordinatesToIndex = (x, y) => {
    let currentX = 0;
    let currentY = 0;
    let indexValue = 0;

    while (currentY < y) {
      for (i = 0; i < 9; i++) {
        indexValue++;
      }
      currentY++;
    }
    while (currentX < x) {
      indexValue++;
      currentX++;
    }
    return indexValue;
  };

  const placeShip = (position, length, tag, orientation) => {
    if (orientation === "horizontal") {
      for (i = position; i < position + length; i++) {
        if (gameBoardArray[i] != "") {
          throw new Error(
            `You are trying to place a ship where there is already one.`
          );
        }
      }
      ships[tag] = shipFactory(length);
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
      ships[tag] = shipFactory(length);
      for (i = position; i < position + length; i++) {
        gameBoardArray[counter] = tag;
        counter += 10;
      }
    }
  };
  const receiveAttack = (position, orientation) => {
    if (gameBoardArray[position] != "") {
      shipTag = gameBoardArray[position];
      if (orientation === "horizontal") {
        const singularShipArray = [];
        let counter = 1;
        singularShipArray.push("origin");
        while (singularShipArray.length < ships[shipTag].shipLength) {
          if (gameBoardArray[position + counter] === shipTag) {
            singularShipArray.push(shipTag);
          }
          if (gameBoardArray[position - counter] === shipTag) {
            singularShipArray.unshift(shipTag);
          }
          counter++;
        }
        ships[shipTag].hit(singularShipArray.indexOf("origin"));
      }
      if (orientation === "vertical") {
        const singularShipArray = [];
        let counter = 10;
        singularShipArray.push("origin");
        while (singularShipArray.length < ships[shipTag].shipLength) {
          if (gameBoardArray[position + counter] === shipTag) {
            singularShipArray.push(shipTag);
          }
          if (gameBoardArray[position - counter] === shipTag) {
            singularShipArray.unshift(shipTag);
          }
          counter += 10;
        }
        ships[shipTag].hit(singularShipArray.indexOf("origin"));
      }
    } else if (gameBoardArray[position] === "") {
      gameBoardArray[position] = "miss";
    }
  };
  const shipsSunk = () => {
    const sunkTracker = [];
    for (key in ships) {
      let sunkStatus = ships[key].isSunk();
      sunkTracker.push(sunkStatus);
    }
    return sunkTracker.every((e) => e === true);
  };
  return {
    gameBoardArray,
    placeShip,
    ships,
    coordinatesToIndex,
    receiveAttack,
    shipsSunk,
  };
};

exports.gameBoardFactory = gameBoardFactory;
