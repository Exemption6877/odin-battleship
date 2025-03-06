import { Carrier, PatrolBoat } from "../src";
import { Gameboard } from "../src";

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
  let newGameboard;

  beforeEach(() => {
    newGameboard = new Gameboard();
  });

  test("Check ships pushed coords", () => {
    const patrol = new PatrolBoat();
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(patrol.coordinates).toEqual([
      [0, 1],
      [0, 0],
    ]);
  });

  test("Check placedShips after adding ship", () => {
    const patrol = new PatrolBoat();
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(newGameboard.placedShips).toEqual([patrol]);
  });

  test("Attack Ship", () => {
    const patrol = new PatrolBoat();
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(newGameboard.receiveAttack([0, 0])).toBeTruthy();
  });

  test("Attack Blank Space", () => {
    const patrol = new PatrolBoat();
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(newGameboard.receiveAttack([0, 2])).toBeFalsy();
  });
});
