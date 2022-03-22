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
    return { attackEnemyGameboard };
  }
};

exports.player = player;
