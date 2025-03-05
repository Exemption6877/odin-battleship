import { Carrier, PatrolBoat } from "../src";
import { Gameboard } from "../src";

describe("Ship Class Testing", () => {
  let newShip;

  beforeEach(() => {
    newShip = new Carrier();
  });

  test("Carrier hit reaction", () => {
    newShip.hit();
    expect(newShip.currentHits).toBe(1);
  });

  test("Carrier 3 hits", () => {
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.currentHits).toBe(3);
  });

  test("Carrier sink reaction", () => {
    for (let i = 0; i < newShip.length; i++) {
      newShip.hit();
    }
    expect(newShip.isSunk()).toBeTruthy();
  });

  test("Carrier not sink reaction", () => {
    for (let i = 0; i < newShip.length - 1; i++) {
      newShip.hit();
    }
    expect(newShip.isSunk()).toBeFalsy();
  });
});

describe("Gameboard borderCheck()", () => {
  let newGameboard;
  beforeEach(() => {
    newGameboard = new Gameboard();
  });

  test("Gameboard x=10", () => {
    expect(newGameboard.borderCheck([10, 0])).toBeFalsy();
  });

  test("Gameboard y=10", () => {
    expect(newGameboard.borderCheck([0, 10])).toBeFalsy();
  });

  test("Gameboard x=-1", () => {
    expect(newGameboard.borderCheck([-1, 1])).toBeFalsy();
  });

  test("Gameboard y=-1", () => {
    expect(newGameboard.borderCheck([1, -1])).toBeFalsy();
  });

  test("Gameboard within border #1", () => {
    expect(newGameboard.borderCheck([2, 3])).toBeTruthy();
  });

  test("Gameboard within border #2", () => {
    expect(newGameboard.borderCheck([5, 9])).toBeTruthy();
  });
});

describe("Gameboard place & attack", () => {
  beforeEach(() => {
    newGameboard = new Gameboard();
  });

  test("Attack blank space", () => {
    Gameboard.receiveAttack([0, 0]);
    expect(newGameboard.receiveAttack).toBeFalsy();
  });

  // Place ship at [0,0] & [0,1]
  test("Place ship vertically and hit", () => {
    newGameboard.placeShip([0, 0], PatrolBoat, vertical);
    expect(newGameboard.receiveAttack([0, 0])).toBeTruthy();
  });
});
