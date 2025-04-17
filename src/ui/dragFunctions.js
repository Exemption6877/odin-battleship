import generateButton from "../index.js";

function dragoverEvent(event) {
  event.preventDefault();
}

function onAllShipsPlaced() {
  const hiddenShips = document.querySelectorAll(".ship.hidden");
  if (hiddenShips.length >= 5) {
    const directionButton = document.querySelector(".direction");
    directionButton.classList.add("hidden");
  }
}

export { dragoverEvent, onAllShipsPlaced };
