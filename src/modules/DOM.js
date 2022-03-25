const domMethods = () => {
  const body = document.body;
  const generateGrid = (gameBoard, number) => {
    const grid = document.querySelector("main").children[number].children[0];
    if (grid.children.length > 0) {
      Array.from(grid.children).forEach((e) => e.remove());
    }
    gameBoard.gameBoardArray.forEach((e) => {
      const div = document.createElement("div");
      div.textContent = e;
      grid.appendChild(div);
    });
  };

  const removeAllChildren = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const shipPlacementInterfaceGenerator = () => {
    const player1Area = document.querySelector(".player1");
    const placementInterface = document.createElement("div");
    placementInterface.classList.add("placementInterface");
    const title = document.createElement("h2");
    title.textContent = "Place ships";
    placementInterface.appendChild(title);
    const currentShip = document.createElement("h3");
    placementInterface.appendChild(currentShip);
    const form = document.createElement("form");
    form.classList.add("coordinateForm");
    const selectOrientation = document.createElement("select");
    selectOrientation.classList.add("orientationSelection");
    const horizontalOption = document.createElement("option");
    horizontalOption.value = "horizontal";
    horizontalOption.textContent = "horizontal";
    const verticalOption = document.createElement("option");
    verticalOption.value = "vertical";
    verticalOption.textContent = "vertical";
    selectOrientation.appendChild(horizontalOption);
    selectOrientation.appendChild(verticalOption);
    form.appendChild(selectOrientation);
    const x = document.createElement("div");
    x.classList.add("x-coordinate");
    const xLabel = document.createElement("label");
    xLabel.textContent = "X-coordinate";
    const xInput = document.createElement("input");
    xInput.type = "number";
    xInput.max = 9;
    xInput.min = 0;
    xInput.required = true;
    x.appendChild(xLabel);
    x.appendChild(xInput);
    form.appendChild(x);
    const y = document.createElement("div");
    y.classList.add("y-coordinate");
    const yLabel = document.createElement("label");
    yLabel.textContent = "Y-coordinate";
    const yInput = document.createElement("input");
    yInput.type = "number";
    yInput.max = 9;
    yInput.min = 0;
    yInput.required = true;
    y.appendChild(yLabel);
    y.appendChild(yInput);
    form.appendChild(y);
    const submit = document.createElement("input");
    submit.type = "submit";
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("errorDiv");
    form.appendChild(errorDiv);
    form.appendChild(submit);
    placementInterface.appendChild(form);
    player1Area.appendChild(placementInterface);
  };

  const clearshipPlacementInterfaceGenerator = () => {
    document.querySelector(".placementInterface").remove();
  };

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
    const shipLabel = coordinateForm.parentElement.querySelector("h3");
    shipLabel.textContent = "Carrier";
    const shipFunction = (gameBoard) => {
      const xCoordinate = coordinateForm.elements[1].value;
      const yCoordinate = coordinateForm.elements[2].value;
      shipOrientation = coordinateForm.elements[0].value;
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
      if (shipOrientation === "horizontal") {
        let currentPosition = gameBoard.coordinatesToIndex(
          xCoordinate,
          yCoordinate
        );
        let currentTenth = Math.floor(currentPosition / 10) * 10;
        if (currentPosition + shipLength > currentTenth + 10) {
          document.querySelector(".errorDiv").textContent =
            "Invalid placement, Ship would go off of gameboard.";
          return;
        }
        for (let i = currentPosition; i < currentPosition + shipLength; i++) {
          if (gameBoard1.gameBoardArray[currentPosition] != "") {
            document.querySelector(".errorDiv").textContent =
              "Invalid placement, Ship would collide with another ship.";
            return;
          }
        }
      }
      if (shipOrientation === "vertical") {
        let currentPosition = gameBoard.coordinatesToIndex(
          xCoordinate,
          yCoordinate
        );
        if (100 - currentPosition - shipLength * 10 < 0) {
          document.querySelector(".errorDiv").textContent =
            "Invalid placement, Ship would go off of gameboard.";
          return;
        }
        for (
          let i = currentPosition;
          i < currentPosition + shipLength * 10;
          i += 10
        ) {
          if (gameBoard1.gameBoardArray[currentPosition] != "") {
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
      gameBoard.placeShip(
        gameBoard.coordinatesToIndex(xCoordinate, yCoordinate),
        shipLength,
        shipLetter,
        shipOrientation
      );

      counter++;
      document.querySelector(".errorDiv").textContent = "";
    };
    coordinateForm.addEventListener("submit", function handler(e) {
      e.preventDefault();
      shipFunction(gameBoard);
      const grid1 = document.querySelector("main").children[0].children[0];
      removeAllChildren(grid1);
      generateGrid(gameBoard, 0);
      if (counter === 5) {
        counter = 0;
        coordinateForm.removeEventListener("submit", handler);
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
        grid.children[index].textContent = gameBoard.gameBoardArray[index];
        if (gameBoard.gameBoardArray[index] === "hit") {
          grid.children[index].classList.add("hit");
        }
        if (gameBoard.gameBoardArray[index] === "miss") {
          grid.children[index].classList.add("miss");
        }
      }
    });
  };
  return {
    generateGrid,
    attackListener,
    gridChangeRender,
    shipPlacementInterfaceGenerator,
    shipPlacement,
  };
};

exports.domMethods = domMethods;
