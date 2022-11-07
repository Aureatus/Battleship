import generateGrid from "./generateGrid";
import removeAllChildren from "./removeAllChildren";
import clearshipPlacementInterfaceGenerator from "./clearShipPlacementInterfaceGenerator";
import createShipVisual from "./createShipVisual";

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
  let shipLetter = "C";
  let shipLength = 5;
  let counter = 0;
  let draggedShipIndex;

  const getDraggedShipIndex = (e) => {
    draggedShipIndex = Number(e.target.dataset.index);
  };

  const coordinateForm = document.querySelector(".coordinateForm");
  const DOMgameBoard = document.querySelector(
    ".placementInterface > .gameboard"
  );

  let orientation = coordinateForm.elements[0].value;

  const shipLabel = coordinateForm.parentElement.querySelector("h3");
  const shipVisual = document.querySelector(".shipVisual");
  shipLabel.textContent = "Carrier";
  createShipVisual(5, shipVisual, orientation);
  shipVisual.addEventListener("mousedown", getDraggedShipIndex);

  shipVisual.draggable = true;

  coordinateForm.elements[0].addEventListener("change", (e) => {
    e.preventDefault();
    orientation = coordinateForm.elements[0].value;
    createShipVisual(shipLength, shipVisual, orientation);
    shipVisual.addEventListener("mousedown", getDraggedShipIndex);
  });

  DOMgameBoard.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  DOMgameBoard.addEventListener("drop", (e) => {
    orientation = coordinateForm.elements[0].value;
    const gridChildren = e.target.parentElement.children;
    let targetIndex = Array.from(gridChildren).findIndex(
      (elem) => elem === e.target
    );

    if (orientation === "horizontal") {
      targetIndex -= draggedShipIndex;
    }

    if (orientation === "vertical") {
      targetIndex -= draggedShipIndex * 10;
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

    gameBoard.placeShip(targetIndex, shipLength, shipLetter, orientation);

    switch (counter) {
      case 0:
        shipLetter = "B";
        shipLength = 4;
        break;
      case 1:
        shipLetter = "D";
        shipLength = 3;
        break;
      case 2:
        shipLetter = "S";
        shipLength = 3;
        break;
      case 3:
        shipLetter = "P";
        shipLength = 2;
        break;
      default:
        break;
    }

    switch (counter) {
      case 0:
        shipLabel.textContent = "BattleShip";
        createShipVisual(4, shipVisual, orientation);
        shipVisual.addEventListener("mousedown", getDraggedShipIndex);

        break;
      case 1:
        shipLabel.textContent = "Destroyer";
        createShipVisual(3, shipVisual, orientation);
        shipVisual.addEventListener("mousedown", getDraggedShipIndex);

        break;
      case 2:
        shipLabel.textContent = "Submarine";
        createShipVisual(3, shipVisual, orientation);
        shipVisual.addEventListener("mousedown", getDraggedShipIndex);

        break;
      case 3:
        shipLabel.textContent = "Patrol Boat";
        createShipVisual(2, shipVisual, orientation);
        shipVisual.addEventListener("mousedown", getDraggedShipIndex);

        break;
      case 4:
        shipLabel.textContent = "";
        break;
      default:
        break;
    }

    counter++;
    document.querySelector(".errorDiv").textContent = "";
    const grid1 = document.querySelector("main").children[0].children[0];
    removeAllChildren(grid1);
    generateGrid(gameBoard, 0);
    generateGrid(gameBoard, 3);
    if (counter === 5) {
      counter = 0;
      clearshipPlacementInterfaceGenerator();
      generateGrid(gameBoard1, 0);
      generateGrid(gameBoard2, 1);
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
};

export default shipPlacement;
