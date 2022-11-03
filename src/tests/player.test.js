import gameBoardFactory from "../modules/logic/gameBoard";
import { player } from "../modules/logic/player";
let gameboard1;
let gameboard2;
beforeEach(() => {
  gameboard1 = gameBoardFactory();
  gameboard2 = gameBoardFactory();
});

test("attackEnemyGameboardHumanMiss", () => {
  const player1 = player(gameboard1, gameboard2, "human");
  player1.attackEnemyGameboard(0, 0);
  expect(gameboard2.gameBoardArray[0]).toBe("miss");
});

test("attackEnemyGameboardHumanHit", () => {
  const player1 = player(gameboard1, gameboard2, "human");
  gameboard2.placeShip(0, 2, "P", "horizontal");
  player1.attackEnemyGameboard(0, 0);
  expect(gameboard2.gameBoardArray[0]).toBe("hit");
});

test("attackEnemyGameboardComputer", () => {
  const player1 = player(gameboard1, gameboard2, "computer");
  let position = player1.attackEnemyGameboard();
  expect(gameboard2.gameBoardArray[position]).toBe("miss" || "hit");
});
