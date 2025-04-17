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
import "./styles.css";
import gameboardRender from "./ui/gameboardUI.js";

function generateButton() {
  const playAgainst = (player) => {
    const button = document.createElement("button");
    button.classList.add("btn-choice");
    button.innerText = `Play against ${player}`;
    button.value = player;

    button.addEventListener("click", () => {
      const wrapper = document.querySelector(".choose-opponent");
      wrapper.classList.add("hidden");

      if (button.value === "bot") {
        gameplay().players("player", "bot");
        console.log(gameplay().players("player", "bot"));
      }

      gameplay().setup();

      const gameboardBlock = document.querySelector(".gameboard");
      gameboardBlock.append(shipDragContainer().output());
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

  const startGame = () => {
    const button = document.createElement("button");
    button.classList.add("start-game");
    button.classList.add("btn-choice");
    button.classList.add("hidden");
    button.innerText = "Start Game!";

    return button;
  };

  return { chooseOpponent, startGame };
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

function shipDragContainer() {
  const container = () => {
    const dragContainer = document.createElement("div");
    dragContainer.classList.add("drag");

    return dragContainer;
  };

  const generateShip = (type) => {
    let length;
    let shipClass;
    switch (type) {
      case "carrier":
        shipClass = new Carrier();
        length = 5;
        break;
      case "battleship":
        shipClass = new Battleship();
        length = 4;
        break;
      case "destroyer":
        shipClass = new Destroyer();
        length = 3;
        break;
      case "submarine":
        shipClass = new Submarine();
        length = 2;
        break;
      case "patrol":
        shipClass = new PatrolBoat();
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
    ship.classList.add("vertical");
    ship.setAttribute("draggable", "true");
    ship.setAttribute("data-type", type);

    ship.addEventListener("dragstart", (event) => {
      const buttonValue = document.querySelector(".direction").value;
      event.dataTransfer.setData("type", type);
      event.dataTransfer.setData("direction", buttonValue);

      // Hardcode players - bot for now.
      // TODO: change it.
      event.dataTransfer.setData(
        "players",
        JSON.stringify(gameplay().players("player", "bot"))
      );
    });
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
  const gameboardBlock = document.querySelector(".gameboard");

  const createPlayer = (name) => {
    const player = name === "player" ? new Player() : new PlayerBot();

    if (player instanceof PlayerBot) {
      player.generateGameboard();
    }

    return player;
  };

  const players = (p1, p2) => {
    const player1 = createPlayer(p1);
    const player2 = createPlayer(p2);

    return { player1, player2 };
  };

  const setup = () => {
    textContainer.appendChild(generateText().placeShips());
    gameboardBlock.appendChild(gameboardRender().generateTable("Your ships"));
  };

  return { players, setup };
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

export default generateButton;
