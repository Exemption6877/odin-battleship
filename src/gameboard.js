import {
  Ship,
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "./ship";

class Gameboard {
  constructor() {
    this.hits = [];
    this.placedShips = [];
  }

  borderCheck(coordinate) {
    const [x, y] = coordinate;
    return x >= 0 && x <= 9 && y >= 0 && y <= 9;
  }

  // NEED TO IMPLEMENT CHECK FOR SAME COORDS

  placeShip(coordinate, ship, direction) {
    let [x, y] = coordinate;
    let fullCoordinates = [];

    for (const entry of this.placedShips) {
      if (this.duplicateCheck(coordinate, entry.coordinates)) {
        throw new Error("Duplicate");
      }
    }

    for (let i = 0; i < ship.length; i++) {
      if (!this.borderCheck([x, y])) {
        throw new Error("Tail out of bounds");
      }
      fullCoordinates.push([x, y]);
      if (direction === "vertical") {
        y -= 1;
      } else if (direction === "horizontal") {
        x += 1;
      }
    }
    fullCoordinates.forEach((coord) => {
      ship.setCoordinate(coord);
    });

    this.placedShips.push(ship);
  }

  receiveAttack(coordinate) {
    let [x, y] = coordinate;
    if (this.duplicateCheck(coordinate, this.hits)) {
      throw new Error("Duplicate");
    }
    for (const ship of this.placedShips) {
      for (let i = 0; i < ship.coordinates.length; i++) {
        if (ship.coordinates[i][0] === x && ship.coordinates[i][1] === y) {
          ship.currentHits += 1;
          if (ship.isSunk()) {
            this.placedShips = this.placedShips.filter((placedShip) => {
              placedShip !== ship;
            });
          }
          return true;
        }
      }
    }
    this.hits.push(coordinate);
    return false;
  }

  duplicateCheck(pushedCoordinate, savedCoordinates) {
    let [Px, Py] = pushedCoordinate;

    for (let entry of savedCoordinates) {
      let [Sx, Sy] = entry;
      if (Px === Sx && Py === Sy) {
        return true;
      }
    }
    return false;
  }
}

export { Gameboard };

/*
I should implement a feature to make neighbouring cells unsettable.

y
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
    0   1   2   3   4   5   6   7   8   9 x

Carrier
Battleship
Destroyer
Submarine
PatrolBoat
*/
