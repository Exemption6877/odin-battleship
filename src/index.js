class Ship {
  constructor(maxHits) {
    this.maxHits = maxHits;
    this.currentHits = 0;
  }

  hit() {
    this.currentHits += 1;
  }
  isSunk() {
    return this.currentHits === this.maxHits;
  }
}

class Carrier extends Ship {
  constructor() {
    super(5);
  }
}

class Battleship extends Ship {
  constructor() {
    super(4);
  }
}

class Destroyer extends Ship {
  constructor() {
    super(3);
  }
}

class Submarine extends Ship {
  constructor() {
    super(3);
  }
}

class PatrolBoat extends Ship {
  constructor() {
    super(2);
  }
}

export { Ship, Carrier, Battleship, Destroyer, Submarine, PatrolBoat };
