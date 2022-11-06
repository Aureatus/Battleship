const gridChangeRender = (gameBoard, number, unalteredGameBoard) => {
  unalteredGameBoard.forEach((element, index) => {
    const grid = document.querySelector("main").children[number].children[0];
    if (unalteredGameBoard[index] != gameBoard.gameBoardArray[index]) {
      if (number === 1) {
        grid.children[index].textContent = gameBoard.gameBoardArray[index];
      }
      if (gameBoard.gameBoardArray[index] === "hit") {
        grid.children[index].classList.add("hit");
        if (number === 1) {
          grid.children[index].innerHTML = "&#215";
        }
      }
      if (gameBoard.gameBoardArray[index] === "miss") {
        grid.children[index].classList.add("miss");
        grid.children[index].innerHTML = "&#8226";
      }
    }
  });
};

export default gridChangeRender;
