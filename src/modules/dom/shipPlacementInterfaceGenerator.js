import createShipVisual from "./createShipVisual";
import generateGrid from "./generateGrid";

const shipPlacementInterfaceGenerator = (gameboard) => {
  const main = document.querySelector("main");
  const placementInterface = document.createElement("div");
  placementInterface.classList.add("placementInterface");
  const gameBoard = document.createElement("div");
  gameBoard.classList.add("gameboard");
  placementInterface.appendChild(gameBoard);
  const title = document.createElement("h2");
  title.textContent = "Place ships (Drag and drop)";
  placementInterface.appendChild(title);
  const ShipVisualContainer = document.createElement("div");
  ShipVisualContainer.classList.add("shipVisualContainer");
  const currentShipVisual = document.createElement("div");
  currentShipVisual.classList.add("shipVisual");
  ShipVisualContainer.appendChild(currentShipVisual);

  placementInterface.appendChild(ShipVisualContainer);
  const currentShip = document.createElement("h3");
  placementInterface.appendChild(currentShip);
  const form = document.createElement("form");
  form.classList.add("coordinateForm");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Orientation";
  fieldset.appendChild(legend);
  const horizontalLabel = document.createElement("label");
  const horizontalRadio = document.createElement("input");
  horizontalRadio.type = "radio";
  horizontalRadio.value = "horizontal";
  horizontalRadio.name = "orientation";
  horizontalRadio.checked = "true";
  horizontalLabel.appendChild(horizontalRadio);
  horizontalLabel.insertAdjacentText("beforeend", "Horizontal");
  const verticalLabel = document.createElement("label");
  const verticalRadio = document.createElement("input");
  verticalRadio.type = "radio";
  verticalRadio.value = "vertical";
  verticalRadio.name = "orientation";
  verticalLabel.appendChild(verticalRadio);
  verticalLabel.insertAdjacentText("beforeend", "Vertical");
  fieldset.appendChild(horizontalLabel);
  fieldset.appendChild(verticalLabel);
  form.append(fieldset);
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("errorDiv");
  form.appendChild(errorDiv);
  placementInterface.appendChild(form);
  main.appendChild(placementInterface);

  generateGrid(gameboard, 3);
};

export default shipPlacementInterfaceGenerator;
