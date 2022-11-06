import generateGrid from "./generateGrid";
import removeAllChildren from "./removeAllChildren";
import clearshipPlacementInterfaceGenerator from "./clearShipPlacementInterfaceGenerator";

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
  const DOMgameBoard = document.querySelector(
    ".placementInterface > .gameboard"
  );

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
    generateGrid(gameBoard, 3);
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

export default shipPlacement;
