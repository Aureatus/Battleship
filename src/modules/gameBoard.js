const gameBoardFactory = () => {
  const gameBoardArray = new Array(100).fill("");
  const placeShip = () => {};
  return { gameBoardArray, placeShip };
};

exports.gameBoardFactory = gameBoardFactory;
