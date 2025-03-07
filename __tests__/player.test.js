import { Player, PlayerBot } from "../src/player";
import { Gameboard } from "../src/gameboard";

describe("Player gameboard tests", () => {
  let player1;
  beforeEach(() => {
    player1 = new Player();
  });

  test("Player has gameboard", () => {
    expect(player1.personalGameboard).toBeInstanceOf(Gameboard);
  });

  describe("PlayerBot tests", () => {
    test("PlayerBot makes random move and returns it", () => {
      const bot = new PlayerBot();
      expect(bot.makeMove()).toBeDefined();
    });
  });

  describe("PlayerBot tests", () => {
    test("PlayerBot strikes adjusted cell", () => {
      const bot = new PlayerBot();
      const mockRandom = jest.fn();
      mockRandom.mockReturnValueOnce(3).mockReturnValueOnce(5);

      const originalRandomGen = bot.__randomGen;
      bot.__randomGen = mockRandom;

      const result = bot.makeMove(true, [2, 5]);
      expect(result).toEqual([2, 6]);

      bot.__randomGen = originalRandomGen;
    });
  });
});
