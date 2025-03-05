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
