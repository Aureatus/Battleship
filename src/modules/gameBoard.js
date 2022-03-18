const gameBoardFactory = () => {
  const gameBoardArray = new Array(100).fill("");
  const placeShip = (position, length, tag) => {
    for (i = position; i < position + length; i++) {
      gameBoardArray[i] = tag;
    }
  };
  return { gameBoardArray, placeShip };
};

exports.gameBoardFactory = gameBoardFactory;
