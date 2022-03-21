const domMethods = () => {
  const body = document.body;
  const generateGrid = (gameBoard, number) => {
    const grid = document.querySelector("main").children[number].children[0];
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
        attackEnemyGameboard(undefined, undefined, index);
      });
    });
  };
  return { generateGrid, attackListener };
};

exports.domMethods = domMethods;
