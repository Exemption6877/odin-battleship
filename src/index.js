class Ship {
  constructor(length) {
    this.length = length;
    this.currentHits = 0;
  }

  hit() {
    this.currentHits += 1;
  }
  isSunk() {
    return this.currentHits === this.length;
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

class Gameboard {
  constructor() {
    this.missedHits = 0;
  }

  borderCheck(coordinate) {
    const [x, y] = coordinate;
    return x >= 0 && x <= 9 && y >= 0 && y <= 9;
  }

  placeShip(coordinate, direction) {}

  receiveAttack(coordinate) {}
}

/*

9  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
8  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
7  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
6  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
5  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
4  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
3  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
2  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
1  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
0  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
    0   1   2   3   4   5   6   7   8   9
Carrier
Battleship
Destroyer
Submarine
PatrolBoat
*/

export {
  Ship,
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
  Gameboard,
};
