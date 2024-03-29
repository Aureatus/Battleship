import gameBoardFactory from "../modules/logic/gameBoard";

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
  for (let i = 0; i < 2; i++) {
    arraySlice.push(gameBoard.gameBoardArray[counter]);
    counter += 10;
  }
  expect(arraySlice.every((e) => e === "P")).toBe(true);
});

test("shipsArray", () => {
  gameBoard.placeShip(1, 3, "F", "horizontal");
  expect(Object.keys(gameBoard.ships).length).toBe(1);
});

test("shipPlacementCheckHorizontal", () => {
  gameBoard.placeShip(15, 4, "A", "horizontal");
  expect(() => gameBoard.placeShip(15, 4, "A", "horizontal")).toThrow(Error);
});

test("shipPlacementCheckVertical", () => {
  gameBoard.placeShip(15, 4, "A", "vertical");
  expect(() => gameBoard.placeShip(15, 4, "A", "vertical")).toThrow(Error);
});

test("CoordinateConversion", () => {
  expect(gameBoard.coordinatesToIndex(3, 5)).toBe(53);
});

test("receiveAttackHorizontal", () => {
  gameBoard.placeShip(13, 4, "A", "horizontal");
  gameBoard.receiveAttack(15);
  expect(gameBoard.ships["A"].hitArray[2]).toBe("hit");
});

test("receiveAttackVertical", () => {
  gameBoard.placeShip(0, 4, "A", "vertical");
  gameBoard.receiveAttack(20);
  expect(gameBoard.ships["A"].hitArray[2]).toBe("hit");
});

test("receiveAttackMiss", () => {
  gameBoard.placeShip(0, 4, "S", "horizontal");
  gameBoard.receiveAttack(35);
  expect(gameBoard.gameBoardArray[35]).toBe("miss");
});

test("areShipsSunk", () => {
  gameBoard.placeShip(0, 2, "A", "horizontal");
  gameBoard.placeShip(10, 3, "B", "vertical");
  gameBoard.receiveAttack(0);
  gameBoard.receiveAttack(1);
  gameBoard.receiveAttack(10);
  gameBoard.receiveAttack(20);
  gameBoard.receiveAttack(30);
  expect(gameBoard.shipsSunk()).toBe(true);
});
