import { Carrier } from "../src";

const newShip = new Carrier();

test("Ship hit reaction", () => {
  newShip.hit();
  expect(newShip.currentHits).toBe(1);
});
