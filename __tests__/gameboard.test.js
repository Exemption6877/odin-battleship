import { Carrier, PatrolBoat } from "../src/classes/ship";
import { Gameboard } from "../src/classes/gameboard";

describe("Gameboard placeShip() border check behavior", () => {
  let newGameboard;
  let patrol;

  beforeEach(() => {
    newGameboard = new Gameboard();
    patrol = new PatrolBoat();
  });

  test("Reject ship placement when x=10 (out of bounds)", () => {
    expect(newGameboard.placeShip([10, 0], patrol, "vertical")).toBeFalsy();
  });

  test("Reject ship placement when y=10 (out of bounds)", () => {
    expect(newGameboard.placeShip([0, 10], patrol, "vertical")).toBeFalsy();
  });

  test("Reject ship placement when x=-1 (out of bounds)", () => {
    expect(newGameboard.placeShip([-1, 1], patrol, "vertical")).toBeFalsy();
  });

  test("Reject ship placement when y=-1 (out of bounds)", () => {
    expect(newGameboard.placeShip([1, -1], patrol, "vertical")).toBeFalsy();
  });

  test("Allow ship placement inside gameboard #1", () => {
    expect(newGameboard.placeShip([2, 3], patrol, "vertical")).toBeTruthy();
  });

  test("Allow ship placement inside gameboard #2", () => {
    expect(newGameboard.placeShip([5, 9], patrol, "vertical")).toBeTruthy();
  });

  test("Allow ship placement on the edge of the gameboard", () => {
    expect(newGameboard.placeShip([9, 9], patrol, "vertical")).toBeTruthy();
  });
});

describe("Gameboard general functions", () => {
  let newGameboard;
  let patrol;

  beforeEach(() => {
    newGameboard = new Gameboard();
    patrol = new PatrolBoat();
  });

  test("Error on placing 2 ships too close to each other", () => {
    const patrol1 = new PatrolBoat();
    const patrol2 = new PatrolBoat();
    newGameboard.placeShip([0, 1], patrol1, "vertical");

    expect(newGameboard.placeShip([1, 1], patrol2, "vertical")).toBeFalsy();
  });

  test("Miss hit", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    expect(newGameboard.receiveAttack([0, 2])).toBeFalsy();
  });

  // test("Throw error on duplicate attack", () => {
  //   newGameboard.receiveAttack([0, 1]);
  //   expect(() => newGameboard.receiveAttack([0, 1])).toBe(true);
  // });

  test("Throw error when trying to place two PatrolBoats on the same square", () => {
    const patrol1 = new PatrolBoat();
    const patrol2 = new PatrolBoat();
    newGameboard.placeShip([0, 1], patrol1, "vertical");

    expect(newGameboard.placeShip([0, 1], patrol2, "vertical")).toBeFalsy();
  });

  test("Destroy the ship & report winning", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    newGameboard.receiveAttack([0, 1]);
    newGameboard.receiveAttack([0, 0]);
    expect(newGameboard.winState()).toBeTruthy();
  });

  test("Ship is still intact, win condition is not met", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    newGameboard.receiveAttack([0, 1]);
    expect(newGameboard.winState()).toBeFalsy();
  });

  test("Sink ship after multiple attacks", () => {
    newGameboard.placeShip([0, 1], patrol, "vertical");
    newGameboard.receiveAttack([0, 1]);
    expect(newGameboard.winState()).toBeFalsy();
    newGameboard.receiveAttack([0, 0]);
    expect(newGameboard.winState()).toBeTruthy();
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

describe("Test other boat classes", () => {
  let newGameboard;

  beforeEach(() => {
    newGameboard = new Gameboard();
  });

  test("Carrier takes 5 cells vertical", () => {
    const boat = new Carrier();

    newGameboard.placeShip([0, 5], boat, "vertical");
    expect(boat.coordinates).toEqual([
      [0, 5],
      [0, 4],
      [0, 3],
      [0, 2],
      [0, 1],
    ]);
  });

  test("Carrier takes 5 cells horizontal", () => {
    const boat = new Carrier();
    newGameboard.placeShip([0, 0], boat, "horizontal");
    expect(boat.coordinates).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ]);
  });
});
