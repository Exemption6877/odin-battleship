import { Carrier, PatrolBoat } from "../src/ship";
import { Gameboard } from "../src/gameboard";

describe("Gameboard borderCheck()", () => {
  let newGameboard;
  beforeEach(() => {
    newGameboard = new Gameboard();
  });

  test("x=10", () => {
    expect(newGameboard.borderCheck([10, 0])).toBeFalsy();
  });

  test("y=10", () => {
    expect(newGameboard.borderCheck([0, 10])).toBeFalsy();
  });

  test("x=-1", () => {
    expect(newGameboard.borderCheck([-1, 1])).toBeFalsy();
  });

  test("y=-1", () => {
    expect(newGameboard.borderCheck([1, -1])).toBeFalsy();
  });

  test("Inside gameboard #1", () => {
    expect(newGameboard.borderCheck([2, 3])).toBeTruthy();
  });

  test("Inside gameboard #2", () => {
    expect(newGameboard.borderCheck([5, 9])).toBeTruthy();
  });
});

describe("PatrolBoat inside gameboard", () => {
  let newGameboard;
  let patrol;

  beforeEach(() => {
    newGameboard = new Gameboard();
    patrol = new PatrolBoat();
  });

  test("PatrolBoat takes both squares vertical", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(patrol.coordinates).toEqual([
      [0, 1],
      [0, 0],
    ]);
  });

  test("PatrolBoat added to newGameboard.placedShips", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(newGameboard.placedShips).toEqual([patrol]);
  });

  test("Attack PatrolBoat", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(newGameboard.receiveAttack([0, 0])).toBeTruthy();
  });

  test("Destroy PatrolBoat", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    newGameboard.receiveAttack([0, 1]);
    newGameboard.receiveAttack([0, 0]);
    expect(patrol.isSunk()).toBeTruthy();
  });
});

describe("Gameboard general functions", () => {
  let newGameboard;
  let patrol;

  beforeEach(() => {
    newGameboard = new Gameboard();
    patrol = new PatrolBoat();
  });

  test("Miss hit", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(newGameboard.receiveAttack([0, 2])).toBeFalsy();
  });

  test("Throw error on duplicate attack", () => {
    newGameboard.receiveAttack([0, 1]);
    expect(() => newGameboard.receiveAttack([0, 1])).toThrow(Error);
  });

  test("Destroy & remove ship from Gameboard", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    newGameboard.receiveAttack([0, 1]);
    newGameboard.receiveAttack([0, 0]);
    expect(newGameboard.placedShips).not.toContain(patrol);
  });
  test("Throw error when trying to place two PatrolBoats on the same square", () => {
    const patrol1 = new PatrolBoat();
    const patrol2 = new PatrolBoat();
    newGameboard.placeShip([0, 1], patrol1, "vertical");

    expect(() => newGameboard.placeShip([0, 1], patrol2, "vertical")).toThrow(
      Error
    );
  });
});
