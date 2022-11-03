import { shipFactory } from "./ship";

const gameBoardFactory = () => {
  const gameBoardArray = new Array(100).fill("");
  const unModifiedgameBoardArray = new Array(100).fill("");
  const ships = {};
  const coordinatesToIndex = (x, y) => {
    let currentX = 0;
    let currentY = 0;
    let indexValue = 0;

    while (currentY < y) {
      for (let i = 0; i <= 9; i++) {
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
      for (let i = position; i < position + length; i++) {
        if (gameBoardArray[i] != "") {
          throw new Error(
            `You are trying to place a ship where there is already one.`
          );
        }
      }
      ships[tag] = shipFactory(length);
      for (let i = position; i < position + length; i++) {
        gameBoardArray[i] = tag;
        unModifiedgameBoardArray[i] = tag;
      }
    }
    if (orientation === "vertical") {
      let counter = position;
      for (let i = position; i < position + length; i++) {
        if (gameBoardArray[counter] != "") {
          throw new Error(
            `You are trying to place a ship where there is already one.`
          );
        }
        counter += 10;
      }
      counter = position;
      ships[tag] = shipFactory(length);
      for (let i = position; i < position + length; i++) {
        gameBoardArray[counter] = tag;
        unModifiedgameBoardArray[counter] = tag;
        counter += 10;
      }
    }
  };
  const receiveAttack = (position) => {
    if (
      (gameBoardArray[position] != "") &
      ((gameBoardArray[position] != "miss") &
        (gameBoardArray[position] != "hit"))
    ) {
      let shipTag = gameBoardArray[position];
      const singularShipArray = [];
      let counter = 1;
      singularShipArray.push("origin");
      while (singularShipArray.length < ships[shipTag].shipLength) {
        if (unModifiedgameBoardArray[position + counter] === shipTag) {
          singularShipArray.push(shipTag);
        }
        if (unModifiedgameBoardArray[position - counter] === shipTag) {
          singularShipArray.unshift(shipTag);
        }
        counter++;
      }
      ships[shipTag].hit(singularShipArray.indexOf("origin"));
      gameBoardArray[position] = "hit";
    }
    if (gameBoardArray[position] === "") {
      gameBoardArray[position] = "miss";
    }
  };
  const shipsSunk = () => {
    const sunkTracker = [];
    for (const key in ships) {
      let sunkStatus = ships[key].isSunk();
      sunkTracker.push(sunkStatus);
    }
    return sunkTracker.every((e) => e === true);
  };
  return {
    gameBoardArray,
    unModifiedgameBoardArray,
    placeShip,
    ships,
    coordinatesToIndex,
    receiveAttack,
    shipsSunk,
  };
};

export { gameBoardFactory };
