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
  // on hit, hit adjustened cell next
  makeMove() {}
}

export { Player, PlayerBot };
