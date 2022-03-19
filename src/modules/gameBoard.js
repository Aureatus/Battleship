const gameBoardFactory = () => {
  const gameBoardArray = new Array(100).fill("");
  const placeShip = (position, length, tag, orientation) => {
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
  return { gameBoardArray, placeShip };
};

exports.gameBoardFactory = gameBoardFactory;
