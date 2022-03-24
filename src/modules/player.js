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
    const attackEnemyGameboard = () => {
      let position = Math.floor(Math.random() * 100);
      while (
        enemygameboard.gameBoardArray[position] === "miss" ||
        enemygameboard.gameBoardArray[position] === "hit"
      ) {
        position = Math.floor(Math.random() * 100);
      }
      enemygameboard.receiveAttack(position);
      return position;
    };

    const placeShipsAI = () => {
      let shipLetter;
      let shipLength;
      let shipOrientation = "horizontal";
      let coordinates = [];
      const coordinateGenerator = () => {
        let verificationArray = new Array(100).fill("");
        let a = 0;
        while (a < 5) {
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
          let shipPosition = gameboard.coordinatesToIndex(
            coordObject.x,
            coordObject.y
          );
          let passesIf = true;
          if (shipOrientation === "horizontal") {
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
        }
      };
      coordinateGenerator();
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
          "horizontal"
        );
      }
    };
    return { attackEnemyGameboard, placeShipsAI };
  }
};

exports.player = player;
