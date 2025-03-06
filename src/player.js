import { Gameboard } from "./gameboard";
class Player {
  constructor() {
    this.personalGameboard = new Gameboard();
  }
}

class PlayerBot extends Player {
  constructor() {
    super();
  }
}

export { Player };
