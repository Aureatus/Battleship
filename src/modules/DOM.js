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
  let unalteredGameBoard;

  const attackListener = (number, inputAttack, gameBoard) => {
    const grid = document.querySelector("main").children[number].children[0];
    Array.from(grid.children).forEach((element, index) => {
      element.addEventListener("click", () => {
        unalteredGameBoard = gameBoard.gameBoardArray.slice();
        inputAttack(index, unalteredGameBoard);
      });
    });
  };

  const computerAttack = (gameBoard, number, attackEnemyGameboard) => {
    unalteredGameBoard = gameBoard.gameBoardArray.slice();
    attackEnemyGameboard();
    gridChangeRender(gameBoard, number, unalteredGameBoard);
  };
  const gridChangeRender = (gameBoard, number, unalteredGameBoard) => {
    unalteredGameBoard.forEach((element, index) => {
      const grid = document.querySelector("main").children[number].children[0];
      if (unalteredGameBoard[index] != gameBoard.gameBoardArray[index]) {
        grid.children[index].textContent = gameBoard.gameBoardArray[index];
      }
    });
  };
  return { generateGrid, attackListener, computerAttack, gridChangeRender };
};

exports.domMethods = domMethods;
