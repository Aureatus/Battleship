import generateGrid from "./domMethods/generateGrid";
import removeAllChildren from "./domMethods/removeAllChildren";
import clearshipPlacementInterfaceGenerator from "./domMethods/clearShipPlacementInterfaceGenerator";

const domMethods = () => {
  const body = document.body;

  const shipPlacement = (
    gameBoard,
    codeToExecute,
    gridForEventListeners,
    gameBoard2,
    gameBoard1,
    player1Attack,
    player2Attack,
    isGameOver,
    gameOver
  ) => {
    let shipLetter;
    let shipLength;
    let counter = 0;
    const coordinateForm = document.querySelector(".coordinateForm");
    const DOMgameBoard = document.querySelector(".player1 > .gameboard");

    DOMgameBoard.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    DOMgameBoard.addEventListener("drop", (e) => {
      let orientation = coordinateForm.elements[0].value;
      const gridChildren = e.target.parentElement.children;
      const targetIndex = Array.from(gridChildren).findIndex(
        (elem) => elem === e.target
      );
      switch (counter) {
        case 0:
          shipLetter = "C";
          shipLength = 5;
          break;
        case 1:
          shipLetter = "B";
          shipLength = 4;
          break;
        case 2:
          shipLetter = "D";
          shipLength = 3;
          break;
        case 3:
          shipLetter = "S";
          shipLength = 3;
          break;
        case 4:
          shipLetter = "P";
          shipLength = 2;
          break;
        default:
          break;
      }
      if (orientation === "horizontal") {
        let currentTenth = Math.floor(targetIndex / 10) * 10;
        if (targetIndex + shipLength > currentTenth + 10) {
          document.querySelector(".errorDiv").textContent =
            "Invalid placement, Ship would go off of gameboard.";
          return;
        }
        for (let i = targetIndex; i < targetIndex + shipLength; i++) {
          if (gameBoard1.gameBoardArray[i] != "") {
            document.querySelector(".errorDiv").textContent =
              "Invalid placement, Ship would collide with another ship.";
            return;
          }
        }
      }
      if (orientation === "vertical") {
        let currentTenth = Math.floor(targetIndex / 10) * 10;
        if (100 - currentTenth < shipLength * 10) {
          document.querySelector(".errorDiv").textContent =
            "Invalid placement, Ship would go off of gameboard.";
          return;
        }
        for (let i = targetIndex; i < targetIndex + shipLength * 10; i += 10) {
          if (gameBoard1.gameBoardArray[i] != "") {
            document.querySelector(".errorDiv").textContent =
              "Invalid placement, Ship would collide with another ship.";
            return;
          }
        }
      }
      switch (counter) {
        case 0:
          shipLabel.textContent = "BattleShip";
          break;
        case 1:
          shipLabel.textContent = "Destroyer";
          break;
        case 2:
          shipLabel.textContent = "Submarine";
          break;
        case 3:
          shipLabel.textContent = "Patrol Boat";
          break;
        case 4:
          shipLabel.textContent = "";
          break;
        default:
          break;
      }
      gameBoard.placeShip(targetIndex, shipLength, shipLetter, orientation);

      counter++;
      document.querySelector(".errorDiv").textContent = "";
      const grid1 = document.querySelector("main").children[0].children[0];
      removeAllChildren(grid1);
      generateGrid(gameBoard, 0);
      if (counter === 5) {
        counter = 0;
        clearshipPlacementInterfaceGenerator();
        codeToExecute(
          gridForEventListeners,
          gameBoard2,
          gameBoard1,
          player1Attack,
          player2Attack,
          isGameOver,
          gameOver
        );
      }
    });
    const shipLabel = coordinateForm.parentElement.querySelector("h3");
    shipLabel.textContent = "Carrier";
    shipLabel.draggable = true;
  };

  const clearBoard = () => {
    const grid1 = document.querySelector("main").children[0].children[0];
    const grid2 = document.querySelector("main").children[1].children[0];
    removeAllChildren(grid1);
    removeAllChildren(grid2);
  };

  const gameEndScreen = (gameOver, finishedGameBoard) => {
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

  let unalteredGameBoard1;
  let unalteredGameBoard2;

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
          gameEndScreen(gameOver, isGameOver().finishedGameBoard);
          return;
        }
        unalteredGameBoard2 = gameBoard1.gameBoardArray.slice();
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
          grid.children[index].innerHTML = "&#215";
        }
      }
    });
  };
  return {
    attackListener,
    gridChangeRender,
    shipPlacement,
  };
};

export { domMethods };
