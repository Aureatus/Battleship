import clearBoard from "./clearBoard";

const gameEndScreen = (gameOver, finishedGameBoard) => {
  const body = document.body;
  const dialog = body.querySelector(".container > main > dialog");
  if (finishedGameBoard === "gameBoard1") {
    dialog.querySelector(".Winner-name").textContent = "Player 2";
  }
  if (finishedGameBoard === "gameBoard2") {
    dialog.querySelector(".Winner-name").textContent = "Player 1";
  }
  dialog.showModal();
  dialog
    .querySelector("button")
    .addEventListener("click", function handler2(e) {
      clearBoard();
      gameOver();
      dialog.close();
      dialog.querySelector("button").removeEventListener("click", handler2);
    });
};

export default gameEndScreen;
