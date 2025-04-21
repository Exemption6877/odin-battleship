import generateButton from "../index.js";

const setupBuffer = [];

function dragStartEvent(event, type) {
  event.dataTransfer.setData("type", type);

  const buttonValue = document.querySelector(".direction").value;
  event.dataTransfer.setData("direction", buttonValue);
}

function dragoverEvent(event) {
  event.preventDefault();
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
