const generateGrid = (gameBoard, number) => {
  const grid = document.querySelector("main").children[number].children[0];
  if (grid.children.length > 0) {
    Array.from(grid.children).forEach((e) => e.remove());
  }
  gameBoard.gameBoardArray.forEach((e) => {
    const div = document.createElement("div");
    div.textContent = e;

    if (number === 1) {
      if (e != "" || "hit" || "miss") {
        div.textContent = "";
      }
    }

    grid.appendChild(div);
  });
};

export default generateGrid;
