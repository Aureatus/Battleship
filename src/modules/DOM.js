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
  const attackListener = (gameBoard, number, attackEnemyGameboard) => {
    const grid = document.querySelector("main").children[number].children[0];
    Array.from(grid.children).forEach((element, index) => {
      element.addEventListener("click", () => {
        let unalteredGameBoard = gameBoard.gameBoardArray.slice();
        attackEnemyGameboard(undefined, undefined, index);
        unalteredGameBoard.forEach((element, index) => {
          if (unalteredGameBoard[index] != gameBoard.gameBoardArray[index]) {
            grid.children[index].textContent = gameBoard.gameBoardArray[index];
          }
        });
      });
    });
  };
  return { generateGrid, attackListener };
};

exports.domMethods = domMethods;
