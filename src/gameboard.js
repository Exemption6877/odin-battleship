import {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "./ship.js";

class Gameboard {
  constructor() {
    this.hits = [];
    this.placedShips = [];
    this.takenCells = [];
  }

  borderCheck(coordinate) {
    const [x, y] = coordinate;
    return x >= 0 && x <= 9 && y >= 0 && y <= 9;
  }
  // Need to make sure ships have 1 cell in between ships
  // Pass a single cell, output around cells
  // max 4 cells, dont output borderChecked cells
  // -+x -+y
  aroundArea(coordinatesArray) {
    let arr = [];
    for (let coordinate of coordinatesArray) {
      let [x, y] = coordinate;
      arr.push(coordinate);
      arr.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    arr = arr.filter((element) => this.borderCheck(element));
    arr.forEach((element) => {
      this.takenCells.push(element);
    });
  }

  placeShip(coordinate, ship, direction) {
    let [x, y] = coordinate;
    let fullCoordinates = [];

    for (const entry of this.placedShips) {
      if (
        this.duplicateCheck(coordinate, entry.coordinates) ||
        this.duplicateCheck(coordinate, this.takenCells)
      ) {
        return false;
      }
    }

    for (let i = 0; i < ship.length; i++) {
      if (!this.borderCheck([x, y])) {
        return false;
      }
      fullCoordinates.push([x, y]);
      if (direction === "vertical") {
        y -= 1;
      } else if (direction === "horizontal") {
        x += 1;
      }
    }
    this.aroundArea(fullCoordinates);
    fullCoordinates.forEach((coord) => {
      ship.setCoordinate(coord);
    });

    this.placedShips.push(ship);
    return fullCoordinates;
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

  winState() {
    let allSink = true;
    this.placedShips.forEach((ship) => {
      if (!ship.isSunk()) {
        allSink = false;
      }
    });
    return allSink;
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
5  [~] [~] [~] [~] [o] [~] [~] [~] [~] [~]
4  [~] [~] [~] [o] [X] [o] [~] [~] [~] [~]
3  [~] [~] [~] [~] [o] [~] [~] [~] [~] [~]
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
