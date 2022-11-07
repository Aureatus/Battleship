import removeAllChildren from "./removeAllChildren";

const createShipVisual = (length, parent, orientation) => {
  const classList = parent.classList;

  if (orientation === "horizontal") {
    if (Array.from(classList).includes("vertical"))
      classList.toggle("vertical");
  }
  if (orientation === "vertical") {
    if (!Array.from(classList).includes("vertical"))
      classList.toggle("vertical");
  }
  if (parent.children.length > 0) {
    removeAllChildren(parent);
  }
  for (let i = 0; i < length; i++) {
    const square = document.createElement("div");
    square.classList.add("shipPiece");
    parent.appendChild(square);
  }
};

export default createShipVisual;
