import { Player } from "../src/player";
import { Gameboard } from "../src/gameboard";

describe("Player gameboard tests", () => {
  let player1;
  beforeEach(() => {
    player1 = new Player();
  });

  test("Player has gameboard", () => {
    expect(player1.personalGameboard).toBeInstanceOf(Gameboard);
  });
});
