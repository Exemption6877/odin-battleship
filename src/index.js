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
      gameboardBlock.append(dragLogic().output());
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

function dragLogic() {
  const container = () => {
    const dragContainer = document.createElement("div");
    dragContainer.classList.add("drag");
    dragContainer.classList.add("container");

    return dragContainer;
  };

  const generateShip = (type) => {
    let length;
    switch (type) {
      case "carrier":
        length = 5;
        break;
      case "battleship":
        length = 4;
        break;
      case "destroyer":
        length = 3;
        break;
      case "submarine":
        length = 2;
        break;
      case "patrol":
        length = 2;
        break;
    }
    const ship = document.createElement("div");
    ship.classList.add("ship");
    for (let i = 0; i < length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      ship.appendChild(cell);
    }

    ship.draggable = "True";

    return ship;
  };

  const shipsArr = () => {
    const arr = [];
    arr.push(
      generateShip("carrier"),
      generateShip("battleship"),
      generateShip("destroyer"),
      generateShip("submarine"),
      generateShip("patrol")
    );
    return arr;
  };

  const output = () => {
    const dragContainer = container();
    const ships = shipsArr();
    const directionButton = shipDirection();
    dragContainer.appendChild(directionButton);

    ships.forEach((ship) => {
      dragContainer.appendChild(ship);
    });

    return dragContainer;
  };
  return { output };
}

const shipDirection = () => {
  const button = document.createElement("button");
  button.classList.add("direction");
  button.innerText = "Vertical";
  button.value = "vertical";

  button.addEventListener("click", () => {
    if (button.value === "vertical") {
      button.innerText = "Horizontal";
      button.value = "horizontal";
    } else {
      button.innerText = "Vertical";
      button.value = "vertical";
    }
  });

  return button;
};

function gameplay() {
  // Notify on actions here
  const textContainer = document.querySelector(".text-area");
  const gameboardBlock = document.querySelector(".gameboard");

  // setup - show a single board, ships container to drag from, let the player to place ships,
  // press confirm to push changes.

  const setup = () => {
    textContainer.appendChild(generateText().placeShips());
    gameboardBlock.appendChild(gameboardRender().generateTable("Your ships"));
  };

  return { setup };
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
