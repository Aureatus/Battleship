const shipFactory = (length) => {
  const shipLength = length;
  const hitArray = new Array(length).fill("");
  const hit = (location) => {
    hitArray[location] = "hit";
  };
  const isSunk = () => {
    return hitArray.every((e) => e === "hit");
  };
  return { shipLength, hitArray, hit, isSunk };
};

exports.shipFactory = shipFactory;
