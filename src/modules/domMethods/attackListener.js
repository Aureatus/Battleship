import gridChangeRender from "./gridChangeRender";

const attackListener = (
  gridForEventListeners,
  gameBoard2,
  gameBoard1,
  player1Attack,
  player2Attack,
  isGameOver,
  gameOver
) => {
  const grid =
    document.querySelector("main").children[gridForEventListeners].children[0];
  Array.from(grid.children).forEach((element, index) => {
    element.addEventListener("click", () => {
      let unalteredGameBoard1 = gameBoard2.gameBoardArray.slice();
      if (
        gameBoard2.gameBoardArray[index] === "miss" ||
        gameBoard2.gameBoardArray[index] === "hit"
      ) {
        return;
      }
      player1Attack(undefined, undefined, index);
      gridChangeRender(gameBoard2, 1, unalteredGameBoard1);
      if (isGameOver().finishedGameBoard) {
        gameEndScreen(gameOver, isGameOver().finishedGameBoard);
        return;
      }
      let unalteredGameBoard2 = gameBoard1.gameBoardArray.slice();
      setTimeout(() => {
        player2Attack();
        gridChangeRender(gameBoard1, 0, unalteredGameBoard2);
      }, 300);
      if (isGameOver().finishedGameBoard) {
        gameEndScreen(gameOver, isGameOver().finishedGameBoard);
        return;
      }
    });
  });
};

export default attackListener;
