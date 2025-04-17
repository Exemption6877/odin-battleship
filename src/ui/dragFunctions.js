import generateButton from "../index.js";

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

export { dragoverEvent, onAllShipsPlaced };
