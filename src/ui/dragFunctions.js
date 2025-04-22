import getShipClass from "../sharedUtils.js";
import { getPlayerByString } from "../sharedUtils.js";

function dragStartEvent(event, type, player) {
  event.dataTransfer.setData("data-type", type);
  const direction = event.target.classList.contains("vertical")
    ? "vertical"
    : "horizontal";
  event.dataTransfer.setData("data-direction", direction);
  event.dataTransfer.setData("data-player", player);
}

function dragOverEvent(event) {
  event.preventDefault();
}

function dragDropEvent(event, button) {
  event.preventDefault();

  const shipClassData = event.dataTransfer.getData("data-type");
  const shipClass = getShipClass(shipClassData);
  const shipDirection = event.dataTransfer.getData("data-direction");
  const playerData = event.dataTransfer.getData("data-player");
  const player = getPlayerByString(playerData);

  let coordinates = button.value.split(" ");
  coordinates = coordinates.map((coord) => parseInt(coord));
  const shipCoordinates = player.personalGameboard.placeShip(
    coordinates,
    shipClass,
    shipDirection
  );
  if (shipCoordinates) {
    const cells = document.querySelectorAll(".gameboard-cell");

    cells.forEach((cell) => {
      let cellCoordinate = cell.value.split(" ");
      cellCoordinate = cellCoordinate.map((coord) => parseInt(coord));

      shipCoordinates.forEach((shipCoordinate) => {
        if (
          shipCoordinate[0] === cellCoordinate[0] &&
          shipCoordinate[1] === cellCoordinate[1]
        ) {
          cell.classList.add("friendly-ship");
          cell.removeEventListener("dragover", dragOverEvent);
        }
        player
          .callGameboard()
          .callTakenCells()
          .forEach((takenCell) => {
            if (
              cellCoordinate[0] === takenCell[0] &&
              cellCoordinate[1] === takenCell[1]
            ) {
              cell.removeEventListener("dragover", dragOverEvent);
            }
          });
      });
    });
    const droppedShip = document.querySelector(
      `[data-type="${shipClassData}"]`
    );
    droppedShip.classList.add("hidden");
  }
}

export { dragDropEvent, dragStartEvent, dragOverEvent };
