const player = (gameboard, enemygameboard, type) => {
  if (type === "human") {
    const attackEnemyGameboard = (x, y) => {
      let position = gameboard.coordinatesToIndex(x, y);
      enemygameboard.receiveAttack(position);
    };
    return { attackEnemyGameboard };
  }
};

exports.player = player;
