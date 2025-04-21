import generateButton from "../index.js";
import gameboardRender from "./gameboardUI.js";

const shipBuffer = [];

function dragStartEvent(event, type, direction) {
  event.dataTransfer.setData("type", type);
  event.dataTransfer.setData("direction", direction);
}

function dragoverEvent(event) {
  event.preventDefault();
}

function dropEvent(event) {
  event.preventDefault();
}

function transferBuffer() {
  return shipBuffer;
}

function onAllShipsPlaced() {
  const hiddenShips = document.querySelectorAll(".ship.hidden");
  if (hiddenShips.length >= 5) {
    const directionButton = document.querySelector(".direction");
    directionButton.classList.add("hidden");
    const startGameButton = document.querySelector(".start-game");
    startGameButton.classList.remove("hidden");
  }
}

export { dragStartEvent, dragoverEvent, onAllShipsPlaced };
