const player = (gameboard, enemygameboard, type) => {
  if (type === "human") {
    const attackEnemyGameboard = (x, y, index) => {
      if (x != undefined || y != undefined) {
        let position = gameboard.coordinatesToIndex(x, y);
        enemygameboard.receiveAttack(position);
      }
      if (index != undefined) {
        enemygameboard.receiveAttack(index);
      }
    };
    return { attackEnemyGameboard };
  }
  if (type === "computer") {
    let lasthit;
    const attackEnemyGameboard = () => {
      let position;
      if (enemygameboard.gameBoardArray[lasthit] === "hit") {
        if (
          (enemygameboard.gameBoardArray[lasthit - 1] != "hit" || "miss") &
          (lasthit > 0)
        ) {
          position = lasthit - 1;
          enemygameboard.receiveAttack(position);
        } else if (
          (enemygameboard.gameBoardArray[lasthit + 1] != "hit" || "miss") &
          (lasthit < 100)
        ) {
          position = lasthit + 1;
          enemygameboard.receiveAttack(position);
        } else if (
          (enemygameboard.gameBoardArray[lasthit - 10] != "hit" || "miss") &
          (lasthit - 10 > 0)
        ) {
          position = lasthit - 10;
          enemygameboard.receiveAttack(position);
        } else if (
          (enemygameboard.gameBoardArray[lasthit + 10] != "hit" || "miss") &
          (lasthit + 10 < 100)
        ) {
          position = lasthit + 10;
          enemygameboard.receiveAttack(position);
        }
      } else {
        position = Math.floor(Math.random() * 100);
        while (
          enemygameboard.gameBoardArray[position] === "miss" ||
          enemygameboard.gameBoardArray[position] === "hit"
        ) {
          position = Math.floor(Math.random() * 100);
        }
        enemygameboard.receiveAttack(position);
      }

      lasthit = position;
      return position;
    };

    const coordinateGenerator = (
      shipLetter,
      shipLength,
      shipOrientation,
      coordinates
    ) => {
      let verificationArray = new Array(100).fill("");
      let a = 0;
      while (a < 5) {
        const random = Math.random();
        if (random < 0.5) {
          shipOrientation = "vertical";
        }
        if (random > 0.5) {
          shipOrientation = "horizontal";
        }
        switch (a) {
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
        const coordObject = {};
        coordObject.x = Math.floor(Math.random() * 9);
        coordObject.y = Math.floor(Math.random() * 9);
        coordObject.orientation = shipOrientation;
        let shipPosition = gameboard.coordinatesToIndex(
          coordObject.x,
          coordObject.y
        );
        let passesIf = true;
        if (coordObject.orientation === "horizontal") {
          for (let i = shipPosition; i < shipPosition + shipLength; i++) {
            if (verificationArray[i] != "") {
              passesIf = false;
            }
            let currentTenth = Math.floor(shipPosition / 10) * 10;
            if (shipPosition + shipLength > currentTenth + 10) {
              passesIf = false;
            }
          }
          if (passesIf) {
            for (let i = shipPosition; i < shipPosition + shipLength; i++) {
              verificationArray[i] = shipLetter;
            }
            coordinates.push(coordObject);
            a++;
          }
        }
        if (coordObject.orientation === "vertical") {
          let counter = shipPosition;
          if (100 - shipPosition - shipLength * 10 < 0) {
            passesIf = false;
          }
          counter = shipPosition;
          for (
            let i = shipPosition;
            i < shipPosition + shipLength * 10;
            i += 10
          ) {
            if (verificationArray[i] != "") {
              passesIf = false;
            }
          }
          if (passesIf) {
            for (i = shipPosition; i < shipPosition + shipLength; i++) {
              verificationArray[counter] = shipLetter;
              counter += 10;
            }
            coordinates.push(coordObject);
            a++;
          }
        }
      }
    };

    const placeShipsAI = () => {
      let shipLetter;
      let shipLength;
      let shipOrientation;
      let coordinates = [];

      coordinateGenerator(shipLetter, shipLength, shipOrientation, coordinates);
      let counter = 0;
      for (counter; counter < 5; counter++) {
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
        gameboard.placeShip(
          gameboard.coordinatesToIndex(
            coordinates[counter].x,
            coordinates[counter].y
          ),
          shipLength,
          shipLetter,
          coordinates[counter].orientation
        );
      }
    };
    return { attackEnemyGameboard, placeShipsAI };
  }
};

exports.player = player;
