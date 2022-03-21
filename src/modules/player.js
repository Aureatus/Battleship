const player = (gameboard, enemygameboard, type) => {
  if (type === "human") {
    const attackEnemyGameboard = (x, y, index) => {
      if (x != undefined || y != undefined) {
        let position = gameboard.coordinatesToIndex(x, y);
        enemygameboard.receiveAttack(position);
      } else {
        enemygameboard.receiveAttack(position);
      }
    };
    return { attackEnemyGameboard };
  }
  if (type === "computer") {
    const attackEnemyGameboard = () => {
      let position = Math.floor(Math.random() * 100);
      while (enemygameboard.gameBoardArray[position] != "") {
        position = Math.floor(Math.random() * 100);
      }
      enemygameboard.receiveAttack(position);
      return position;
    };
    return { attackEnemyGameboard };
  }
};

exports.player = player;
