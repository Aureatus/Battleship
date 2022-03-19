const { gameBoardFactory } = require("../modules/gameBoard");

let gameBoard;

beforeEach(() => {
  gameBoard = gameBoardFactory();
});

test("gameBoardCorrectSize", () => {
  expect(gameBoard.gameBoardArray.length).toBe(100);
});

test("shipPlacementHorizontal", () => {
  gameBoard.placeShip(5, 4, "D", "horizontal");
  const arraySlice = gameBoard.gameBoardArray.slice(5, 5 + 4);
  expect(arraySlice.every((e) => e === "D")).toBe(true);
});

test("shipPlacementVertical", () => {
  gameBoard.placeShip(20, 2, "P", "vertical");
  const arraySlice = [];
  let counter = 20;
  for (i = 0; i < 2; i++) {
    arraySlice.push(gameBoard.gameBoardArray[counter]);
    counter += 10;
  }
  expect(arraySlice.every((e) => e === "P")).toBe(true);
});

test("shipsArray", () => {
  gameBoard.placeShip(1, 3, "F", "horizontal");
  expect(gameBoard.ships.length).toBe(1);
});
