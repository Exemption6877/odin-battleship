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
import gameboardRender from "./ui/gameboardUI.js";

function generateButton() {
  const playAgainst = (player) => {
    const button = document.createElement("button");
    button.classList.add("btn-choice");
    button.innerText = `Play against ${player}`;
    button.value = player;

    return button;
  };

  return { playAgainst };
}

const gameStartButton = document.querySelector("#game-start");
gameStartButton.addEventListener("click", () => {
  const greetingBlock = document.querySelector(".greeting");
  greetingBlock.classList.add("hidden");
  const chooseOpponent = document.createElement("div");
  chooseOpponent.classList.add("choose-opponent");
  chooseOpponent.append(
    generateButton().playAgainst("Player 1"),
    generateButton().playAgainst("Bot")
  );
  const gameboardBlock = document.querySelector(".gameboard");
  gameboardBlock.append(chooseOpponent);
});

// const gameboardBlock = document.querySelector(".gameboard");
// gameboardBlock.append(gameboardRender().generateTable("Player 1"));
