const domMethods = () => {
  const body = document.body;
  const generateGrid = (gameBoard, number) => {
    const grid = document.querySelector("main").children[number].children[0];
    console.log(grid.children.length);
    if (grid.children.length > 0) {
      Array.from(grid.children).forEach((e) => e.remove());
    }
    gameBoard.gameBoardArray.forEach((e) => {
      const div = document.createElement("div");
      div.textContent = e;
      grid.appendChild(div);
    });
  };
  let unalteredGameBoard1;
  let unalteredGameBoard2;

  const attackListener = (
    gridForEventListeners,
    gameBoard2,
    gameBoard1,
    player1Attack,
    player2Attack,
    isGameOver
  ) => {
    const grid =
      document.querySelector("main").children[gridForEventListeners]
        .children[0];
    Array.from(grid.children).forEach((element, index) => {
      element.addEventListener("click", () => {
        unalteredGameBoard1 = gameBoard2.gameBoardArray.slice();
        if (
          gameBoard2.gameBoardArray[index] === "miss" ||
          gameBoard2.gameBoardArray[index] === "hit"
        ) {
          return;
        }
        player1Attack(undefined, undefined, index);
        gridChangeRender(gameBoard2, 1, unalteredGameBoard1);
        if (isGameOver().finishedGameBoard) {
          console.log("game over!");
          return;
        }
        unalteredGameBoard2 = gameBoard1.gameBoardArray.slice();
        setTimeout(() => {
          player2Attack();
          gridChangeRender(gameBoard1, 0, unalteredGameBoard2);
        }, 300);
        if (isGameOver().finishedGameBoard) {
          console.log("game over!");
          return;
        }
      });
    });
  };

  const gridChangeRender = (gameBoard, number, unalteredGameBoard) => {
    unalteredGameBoard.forEach((element, index) => {
      const grid = document.querySelector("main").children[number].children[0];
      if (unalteredGameBoard[index] != gameBoard.gameBoardArray[index]) {
        grid.children[index].textContent = gameBoard.gameBoardArray[index];
      }
    });
  };
  return { generateGrid, attackListener, gridChangeRender };
};

exports.domMethods = domMethods;
