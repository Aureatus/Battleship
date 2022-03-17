const { gameBoardFactory } = require("../modules/gameBoard");

const gameBoard = gameBoardFactory();

test("gameBoardCorrectSize", () => {
  expect(gameBoard.gameBoardArray.length).toBe(100);
});

test("shipPlacement", () => {
  gameBoard.placeShip(5, 4, "D");
  expect(gameBoard.gameBoardArray.slice(5, 4).every((e) => e === "D")).toBe(
    true
  );
});
