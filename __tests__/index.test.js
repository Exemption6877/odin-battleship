import { Carrier } from "../src";

test("Carrier hit reaction", () => {
  const newShip = new Carrier();
  newShip.hit();
  expect(newShip.currentHits).toBe(1);
});

test("Carrier 3 hits", () => {
  const newShip = new Carrier();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.currentHits).toBe(3);
});

test("Carrier sink reaction", () => {
  const newShip = new Carrier();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBeTruthy();
});

test("Carrier not sink reaction", () => {
  const newShip = new Carrier();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBeFalsy();
});
