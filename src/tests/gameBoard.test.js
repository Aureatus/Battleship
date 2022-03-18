const { gameBoardFactory } = require("../modules/gameBoard");

const gameBoard = gameBoardFactory();

test("gameBoardCorrectSize", () => {
  expect(gameBoard.gameBoardArray.length).toBe(100);
});

test("shipPlacement", () => {
  gameBoard.placeShip(5, 4, "D");
  const arraySlice = gameBoard.gameBoardArray.slice(5, 5 + 4);
  expect(arraySlice.every((e) => e === "D")).toBe(true);
});
