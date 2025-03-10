import { Carrier } from "../src/ship";
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

  test("Carrier not sunk with zero hits", () => {
    expect(newShip.isSunk()).toBeFalsy();
  });
});
