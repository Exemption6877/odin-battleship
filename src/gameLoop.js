function gameLoop() {
  const gameEnd = (player) => {
    // some DOM css stuff hiding and outputing `${player}` wins!
  };
  const attack = (attacker, defender, coordinate) => {
    const attackThisPlayer = defender.callGameboard().receiveAttack(coordinate);
    const winState = defender.callGameboard().winState();

    if (winState) {
      gameEnd(attacker);
    }
    if (attackThisPlayer) {
      const cells = document.querySelectorAll(".gameboard-cell");
      cells.forEach((cell) => {
        let cellCoordinate = cell.value.split(" ");
        cellCoordinate = cellCoordinate.map((coord) => parseInt(coord));
      });
    }
  };
}
