import { dragStartEvent } from "./dragFunctions.js";
import {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "../ship.js";
import gameplay from "../gameplay.js";

function shipDragContainer() {
  // should refactor this
  const shipDirectionChanger = () => {
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

  const getShipClass = (type) => {
    switch (type) {
      case "carrier":
        return new Carrier();
      case "battleship":
        return new Battleship();
      case "destroyer":
        return new Destroyer();
      case "submarine":
        return new Submarine();
      case "patrol":
        return new PatrolBoat();
      default:
        console.log(`Error: unknown ship type = ${type}`);
    }
  };

  const generateShip = (type) => {
    const shipClass = getShipClass(type);
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
    const dragContainer = document.createElement("div");
    dragContainer.classList.add("drag");
    const ships = shipsArr();
    const directionButton = shipDirectionChanger();
    dragContainer.appendChild(directionButton);
    dragContainer.appendChild(gameplay().startGameButton());

    ships.forEach((ship) => {
      dragContainer.appendChild(ship);
    });

    return dragContainer;
  };
  return { output };
}

export default shipDragContainer;
