import { Player, PlayerBot } from "./player.js";
import {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "./ship.js";
import "./styles.css";
import gameboardRender from "./ui/gameboardUI.js";
import { dragStartEvent } from "./ui/dragFunctions.js";

const game = gameplay();

function generateButton() {
  const playAgainstButton = (player) => {
    const button = document.createElement("button");
    button.classList.add("btn-choice");
    button.innerText = `Play against ${player}`;
    button.value = player;

    button.addEventListener("click", () => {
      const wrapper = document.querySelector(".choose-opponent");
      wrapper.classList.add("hidden");

      if (button.value === "bot") {
        gameplay().createPlayers("player", button.value);
      } else {
      }
      gameplay().setup();

      const gameboardContainer = document.querySelector(".gameboard");
      gameboardContainer.append(shipDragContainer().output());
    });
    return button;
  };

  const chooseOpponentButtons = (player1 = "player", player2 = "bot") => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("choose-opponent");
    const button1 = playAgainstButton(player1);
    const button2 = playAgainstButton(player2);
    wrapper.append(button1, button2);

    return wrapper;
  };

  const startGame = () => {
    const button = document.createElement("button");
    button.classList.add("start-game");
    button.classList.add("btn-choice");
    button.classList.add("hidden");
    button.innerText = "Start Game!";

    return button;
  };

  return { chooseOpponentButtons, startGame };
}

function shipDragContainer() {
  const container = () => {
    const dragContainer = document.createElement("div");
    dragContainer.classList.add("drag");

    return dragContainer;
  };

  const generateShip = (type) => {
    let shipClass;
    switch (type) {
      case "carrier":
        shipClass = new Carrier();
        break;
      case "battleship":
        shipClass = new Battleship();
        break;
      case "destroyer":
        shipClass = new Destroyer();
        break;
      case "submarine":
        shipClass = new Submarine();
        break;
      case "patrol":
        shipClass = new PatrolBoat();
        break;
    }

    const ship = document.createElement("div");
    ship.classList.add("ship");
    for (let i = 0; i < shipClass.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      ship.appendChild(cell);
    }
    ship.classList.add("vertical");
    ship.setAttribute("draggable", "true");
    ship.setAttribute("data-type", type);

    ship.addEventListener("dragstart", (event) => dragStartEvent(event, type));
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
    dragContainer.appendChild(generateButton().startGame());

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
    const ships = document.querySelectorAll(".ship");

    if (button.value === "vertical") {
      button.innerText = "Horizontal";
      button.value = "horizontal";
      const container = document.querySelector(".drag");

      container.classList.add("vertical");

      ships.forEach((ship) => {
        ship.classList.remove("vertical");
        ship.classList.add("horizontal");
      });
    } else {
      button.innerText = "Vertical";
      button.value = "vertical";
      const container = document.querySelector(".drag");

      container.classList.remove("vertical");
      ships.forEach((ship) => {
        ship.classList.remove("horizontal");
        ship.classList.add("vertical");
      });
    }
  });

  return button;
};

function gameplay() {
  // Notify on actions here
  const textContainer = document.querySelector(".text-area");
  const gameboardContainer = document.querySelector(".gameboard");

  let player1 = null;
  let player2 = null;

  const createPlayers = (p1, p2) => {
    player1 = p1 === "player" ? new Player() : new PlayerBot();
    player2 = p2 === "player" ? new Player() : new PlayerBot();

    if (player1 instanceof PlayerBot) {
      player1.generateGameboard();
    }

    if (player2 instanceof PlayerBot) {
      player2.generateGameboard();
    }
  };

  const getPlayers = () => {
    return { player1, player2 };
  };

  const chooseAgainst = (opponent = "bot") => {
    if (opponent === "bot") {
      gameplay().setup();
    }
  };

  const setup = () => {
    const h1 = document.createElement("h1");
    h1.innerText = "Drag and drop your ships onto the board";
    textContainer.appendChild(h1);
    gameboardContainer.appendChild(
      gameboardRender().generateTable("Your ships")
    );
  };

  return { getPlayers, createPlayers, setup };
}

// Button in HTML
const gameStartButton = document.querySelector("#game-start");
gameStartButton.addEventListener("click", () => {
  const greetingBlock = document.querySelector(".greeting");
  greetingBlock.classList.add("hidden");

  const gameboardContainer = document.querySelector(".gameboard");
  gameboardContainer.append(generateButton().chooseOpponentButtons());
});

export default generateButton;
