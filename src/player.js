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
  // on hit, check adjustened cells
  makeMove() {}
}

export { Player, PlayerBot };
