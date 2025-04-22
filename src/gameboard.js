class Gameboard {
  constructor() {
    this.hits = [];
    this.placedShips = [];
    this.takenCells = [];
  }

  callTakenCells() {
    return this.takenCells;
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

  placeShip(coordinate, ship, direction) {
    const borderCheck = (coordinate) => {
      const [x, y] = coordinate;
      return x >= 0 && x <= 9 && y >= 0 && y <= 9;
    };

    const overlapCheck = (coordinatesArray) => {
      for (let coordinate of coordinatesArray) {
        const [x, y] = coordinate;
        for (let takenCoordinate of this.takenCells) {
          const [Tx, Ty] = takenCoordinate;

          if (x === Tx && y === Ty) {
            return true;
          }
        }
      }
      return false;
    };

    const aroundArea = (coordinatesArray) => {
      let arr = [];
      for (let coordinate of coordinatesArray) {
        let [x, y] = coordinate;
        arr.push(coordinate);
        arr.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
      arr = arr.filter((element) => borderCheck(element));
      arr.forEach((element) => {
        this.takenCells.push(element);
      });
      return arr;
    };

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
      if (!borderCheck([x, y])) {
        return false;
      }

      fullCoordinates.push([x, y]);
      if (direction === "vertical") {
        y -= 1;
      } else if (direction === "horizontal") {
        x += 1;
      }
    }
    if (overlapCheck(fullCoordinates)) {
      return false;
    }

    const [fx, fy] = fullCoordinates.at(0);
    const [lx, ly] = fullCoordinates.at(-1);

    if (direction === "vertical") {
      if (borderCheck([fx - 1, fy + 1])) this.takenCells.push([fx - 1, fy + 1]);
      if (borderCheck([fx + 1, fy + 1])) this.takenCells.push([fx + 1, fy + 1]);

      if (borderCheck([lx - 1, ly - 1])) this.takenCells.push([lx - 1, ly - 1]);
      if (borderCheck([lx + 1, ly - 1])) this.takenCells.push([lx + 1, ly - 1]);
    } else {
      if (borderCheck([fx - 1, fy - 1])) this.takenCells.push([fx - 1, fy - 1]);
      if (borderCheck([fx - 1, fy + 1])) this.takenCells.push([fx - 1, fy + 1]);

      if (borderCheck([lx + 1, ly - 1])) this.takenCells.push([lx + 1, ly - 1]);
      if (borderCheck([lx + 1, ly + 1])) this.takenCells.push([lx + 1, ly + 1]);
    }

    aroundArea(fullCoordinates);
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

y
9  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
8  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
7  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
6  [~] [~] [~] [~] [~] [~] [~] [~] [~] [~]
5  [~] [~] [~] [o] [o] [o] [~] [~] [~] [~]
4  [~] [~] [~] [o] [X] [o] [~] [~] [~] [~]
3  [~] [~] [~] [o] [X] [o] [~] [~] [~] [~]
2  [~] [~] [~] [o] [X] [o] [o] [o] [o] [o]
1  [~] [~] [~] [o] [o] [o] [o] [X] [X] [o]
0  [~] [~] [~] [~] [~] [~] [o] [o] [o] [o]
    0   1   2   3   4   5   6   7   8   9 x

*/
