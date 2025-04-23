class Ship {
  constructor(length) {
    this.length = length;
    this.currentHits = 0;
    this.coordinates = [];
  }

  callCoordinates() {
    return this.coordinates;
  }

  hit() {
    this.currentHits += 1;
  }
  isSunk() {
    return this.currentHits === this.length;
  }

  setCoordinate(coordinate) {
    this.coordinates.push(coordinate);
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
    super(2);
  }
}

class PatrolBoat extends Ship {
  constructor() {
    super(2);
  }
}

export { Ship, Carrier, Battleship, Destroyer, Submarine, PatrolBoat };
