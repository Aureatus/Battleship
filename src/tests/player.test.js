const { gameBoardFactory } = require("../modules/gameBoard");
const { player } = require("../modules/player");

test("attackEnemyGameboardHuman", () => {
  const gameboard1 = gameBoardFactory();
  const gameboard2 = gameBoardFactory();
  const player1 = player(gameboard1, gameboard2, "human");
  player1.attackEnemyGameboard(5);
  expect(gameboard2.gameBoardArray[5]).toBe("miss");
});
