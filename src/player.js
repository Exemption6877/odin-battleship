import { Gameboard } from "./gameboard";
class Player {
  constructor() {
    this.personalGameboard = new Gameboard();
  }
}

class PlayerBot extends Player {
  // I need to write random move logic for this subclass
  constructor() {
    super();
  }
  __randomGen(num) {
    return Math.floor(Math.random() * num);
  }
  // on hit, hit adjustened cell next
  // to make the AI even better, I could notify it on isSunk() to not hit obvious dead cells.
  makeMove(prevHit = false, prevCoord = null) {
    if (prevHit) {
      const [prevX, prevY] = prevCoord;
      // randomize to choose whether to hit x or y
      if (this.__randomGen(2) === 0) {
        // choose -1 or +1
        if (this.__randomGen(2) === 0) {
          return [prevX - 1, prevY];
        } else {
          return [prevX + 1, prevY];
        }
      } else {
        if (this.__randomGen(2) === 0) {
          return [prevX, prevY - 1];
        } else {
          return [prevX, prevY + 1];
        }
      }
    } else {
      let x = this.__randomGen(10);
      let y = this.__randomGen(10);
      return [x, y];
    }
  }
}

export { Player, PlayerBot };
