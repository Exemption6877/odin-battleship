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

  const chooseOpponent = (player1, player2) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("choose-opponent");
    wrapper.append(playAgainst(player1), playAgainst(player2));

    return wrapper;
  };

  return { chooseOpponent };
}

const gameStartButton = document.querySelector("#game-start");
gameStartButton.addEventListener("click", () => {
  const greetingBlock = document.querySelector(".greeting");
  greetingBlock.classList.add("hidden");
  const gameboardBlock = document.querySelector(".gameboard");
  gameboardBlock.append(generateButton().chooseOpponent("player", "bot"));
});

// const gameboardBlock = document.querySelector(".gameboard");
// gameboardBlock.append(gameboardRender().generateTable("Player 1"));
