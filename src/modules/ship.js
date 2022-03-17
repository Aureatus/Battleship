const shipFactory = (length) => {
  const shipLength = length;
  const hitArray = new Array(length);
  const hit = (location) => {
    hitArray[location] = "hit";
  };
  return { shipLength, hitArray, hit };
};

exports.shipFactory = shipFactory;
