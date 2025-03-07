import { Gameboard } from "./gameboard.js";
import { Player, PlayerBot } from "./player.js";
import { Ship } from "./ship.js";
import {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "./ship.js";
// might move above imports to another file
import "./styles.css";

const gameStartButton = document.querySelector("#game-start");
gameStartButton.addEventListener("click", () => {
  const greetingBlock = document.querySelector(".greeting");
  greetingBlock.classList.add("hidden");
});
