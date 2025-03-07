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
    //event listener here?

    button.addEventListener("click", () => {
      const wrapper = document.querySelector(".choose-opponent");
      wrapper.classList.add("hidden");
      gameplay().setup();
      const gameboardBlock = document.querySelector(".gameboard");
      gameboardBlock.append(gameplay().draggableShips());
    });
    return button;
  };

  const chooseOpponent = (player1, player2) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("choose-opponent");
    const button1 = playAgainst(player1);
    const button2 = playAgainst(player2);
    wrapper.append(button1, button2);

    return wrapper;
  };

  return { chooseOpponent };
}

function generateText() {
  const heading = (text) => {
    const h1 = document.createElement("h1");
    h1.innerText = text;
    return h1;
  };

  const placeShips = () => {
    return heading("Drag and drop your ships onto the board");
  };
  return { placeShips };
}

function gameplay() {
  // Notify on actions here
  const textContainer = document.querySelector(".text-area");
  const gameboardBlock = document.querySelector(".gameboard");

  const draggableShips = () => {
    const directionButton = document.createElement("button");
    directionButton.classList.add("direction");
    directionButton.innerText = "Toggle direction";

    const dragContainer = document.createElement("div");
    dragContainer.classList.add("drag");
    dragContainer.classList.add("container");

    const carrier = document.createElement("div");
    carrier.classList.add("ship");
    for (let i = 0; i < 5; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      carrier.appendChild(cell);
    }

    carrier.draggable = "True";

    dragContainer.appendChild(directionButton);
    dragContainer.appendChild(carrier);
    return dragContainer;
  };

  // setup - show a single board, ships container to drag from, let the player to place ships,
  // press confirm to push changes.

  const setup = () => {
    textContainer.appendChild(generateText().placeShips());
    gameboardBlock.appendChild(gameboardRender().generateTable("Your ships"));
  };

  return { draggableShips, setup };
}

const gameStartButton = document.querySelector("#game-start");
gameStartButton.addEventListener("click", () => {
  const greetingBlock = document.querySelector(".greeting");
  greetingBlock.classList.add("hidden");

  const gameboardBlock = document.querySelector(".gameboard");
  gameboardBlock.append(generateButton().chooseOpponent("player", "bot"));
});

const againstButtons = document.querySelectorAll(".btn-choice");
againstButtons.addEventListener("click", () => {});

// I need setup state, move your ships to desired locations
// Dragging one after another, I need to be able to change ship's direction
// encapsulate choose player state for convenience if player presses "play again"
