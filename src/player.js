import { Gameboard } from "./gameboard.js";
import {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "./ship.js";

class Player {
  constructor(name = "Unknown") {
    this.name = name;
    this.personalGameboard = new Gameboard();
  }

  callGameboard() {
    return this.personalGameboard;
  }
}

class PlayerBot extends Player {
  constructor(name) {
    super(name);
  }

  __randomGen(num) {
    return Math.floor(Math.random() * num);
  }
  __randomDirection() {
    return this.__randomGen(2) === 0 ? "vertical" : "horizontal";
  }

  generateGameboard() {
    const ships = [
      new Carrier(),
      new Battleship(),
      new Destroyer(),
      new Submarine(),
      new PatrolBoat(),
    ];
    let placedCount = 0;
    
    while (placedCount < ships.length) {
      const x = this.__randomGen(9);
      const y = this.__randomGen(9);
      const direction = this.__randomDirection();
      const type = ships[placedCount];

      const result = this.personalGameboard.placeShip([x, y], type, direction);

      if (result !== false) {
        placedCount++;
      }
    }
  }

  // on hit, hit adjustened cell next
  // to make the AI even better, I could notify it on isSunk() to not hit obvious dead cells.
  makeMove(prevHit = false, prevCoord = null, shipIsSunk = false) {
    if (prevHit && !shipIsSunk) {
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
