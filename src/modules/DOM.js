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
    form.appendChild(submit);
    placementInterface.appendChild(form);
    player1Area.appendChild(placementInterface);
  };

  const clearBoard = () => {
    const grid1 = document.querySelector("main").children[0].children[0];
    const grid2 = document.querySelector("main").children[1].children[0];
    const removeAllChildren = (parent) => {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };
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
    dialog.querySelector("button").addEventListener("click", () => {
      clearBoard();
      gameOver();
      dialog.close();
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
      }
    });
  };
  return {
    generateGrid,
    attackListener,
    gridChangeRender,
    shipPlacementInterfaceGenerator,
  };
};

exports.domMethods = domMethods;
