import { dragStartEvent } from "./dragFunctions.js";
import getShipClass from "../sharedUtils.js";

function prepPhase() {
  // should refactor this
  const shipDirectionChanger = () => {
    const button = document.createElement("button");
    button.classList.add("direction");
    button.innerText = "Vertical";
    button.value = "vertical";

    button.addEventListener("click", () => {
      const ships = document.querySelectorAll(".ship");
      const container = document.querySelector(".drag");

      if (button.value === "vertical") {
        button.innerText = "Horizontal";
        button.value = "horizontal";

        container.classList.add("vertical");
        ships.forEach((ship) => {
          ship.classList.remove("vertical");
          ship.classList.add("horizontal");
        });
      } else {
        button.innerText = "Vertical";
        button.value = "vertical";

        container.classList.remove("vertical");
        ships.forEach((ship) => {
          ship.classList.remove("horizontal");
          ship.classList.add("vertical");
        });
      }
    });

    return button;
  };

  const generateShip = (type, player) => {
    const ship = document.createElement("div");
    const shipClass = getShipClass(type);

    for (let i = 0; i < shipClass.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add("friendly-ship");
      ship.appendChild(cell);
    }
    ship.classList.add("ship");
    ship.classList.add("vertical");
    ship.setAttribute("draggable", "true");
    ship.setAttribute("data-type", type);
    ship.setAttribute("data-player", player);

    ship.addEventListener("dragstart", (event) =>
      dragStartEvent(event, type, player)
    );
    return ship;
  };

  const shipsArr = (player) => {
    const arr = [];
    arr.push(
      generateShip("carrier", player),
      generateShip("battleship", player),
      generateShip("destroyer", player),
      generateShip("submarine", player),
      generateShip("patrol", player)
    );
    return arr;
  };
  // Might need to refactor it according to gameplay() changes.
  // If player2 === "player", start placing boats for 2nd non-bot player.
  const startGameButton = () => {
    const button = document.createElement("button");
    button.classList.add("start-game");
    button.classList.add("btn-choice");
    button.classList.add("hidden");
    button.innerText = "Start Game!";

    return button;
  };

  const output = (player) => {
    const dragContainer = document.createElement("div");
    dragContainer.classList.add("drag");
    const ships = shipsArr(player);
    const directionButton = shipDirectionChanger();
    dragContainer.appendChild(directionButton);
    dragContainer.appendChild(startGameButton());

    ships.forEach((ship) => {
      dragContainer.appendChild(ship);
    });

    return dragContainer;
  };
  return { output };
}

export default prepPhase;
