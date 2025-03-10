import { Gameboard } from "../gameboard.js";
import {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "../ship.js";

function shipType(type) {}
function gameboardRender() {
  const generateRow = (y) => {
    const rowBlock = document.createElement("tr");
    const rowCounter = document.createElement("th");
    rowCounter.innerText = `${y}`;
    rowBlock.appendChild(rowCounter);
    // I NEED TO TEST ORDER CORRECTNESS
    for (let i = 0; i <= 9; i++) {
      rowBlock.appendChild(generateCell(i, y));
    }

    return rowBlock;
  };
  const generateCell = (x, y) => {
    function __detectShipClass(string) {
      switch (string) {
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
      }
    }
    const wrapper = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("gameboard-cell");
    button.classList.add("cell");
    button.value = `${x} ${y}`;

    // Drag over event
    const dragoverEvent = (event) => {
      event.preventDefault();
    };
    button.addEventListener("dragover", dragoverEvent);

    button.addEventListener("drop", (event) => {
      event.preventDefault();

      const shipType = event.dataTransfer.getData("type");
      const shipDirection = event.dataTransfer.getData("direction");

      let coordinates = button.value.split(" ");
      coordinates = coordinates.map((coord) => parseInt(coord));

      const ship = __detectShipClass(shipType);
      console.log(coordinates);
      // const players = event.dataTransfer.getData("players");
      //debugging
      console.log(shipDirection);
      console.log(ship);

      const allCells = document.querySelectorAll(".gameboard-cell");
      const cellsToFill = new Gameboard().placeShip(
        coordinates,
        ship,
        shipDirection
      );
      allCells.forEach((cell) => {
        for (let coord of cellsToFill) {
          let cellCoord = cell.value.split(" ");
          cellCoord = cellCoord.map((coord) => parseInt(coord));
          if (cellCoord[0] === coord[0] && cellCoord[1] === coord[1]) {
            if (!cell.classList.contains("friendly-ship")) {
              cell.classList.add("friendly-ship");
              cell.innerText = "O";
              cell.removeEventListener("dragover", dragoverEvent);
              console.log(cell);
            }
          }
        }
      });
      // Add a class that will indicate that cell's taken,
      // do not allow drag'n'drop other ships on this basis.
      // disable dragover on this occasion for multiple taken cells.

      // need some logic to verify correctness of ship's position
      // if (Gameboard().placeShip(coordinates, shipType, shipDirection)) {
      //   console.log("successful");
      //   // console.log(Gameboard.outputPlacedShips());
      // }
      //hide dropped ship
      const droppedShip = document.querySelector(`[data-type="${shipType}"]`);
      droppedShip.classList.add("hidden");
    });
    wrapper.appendChild(button);

    return wrapper;
  };

  const generateTable = (player) => {
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.innerText = `${player}`;
    const tableBody = document.createElement("tbody");

    for (let i = 9; i >= 0; i--) {
      tableBody.appendChild(generateRow(i));
    }

    table.append(caption, tableBody, generateFooter());
    return table;
  };

  const generateFooter = () => {
    const tableFoot = document.createElement("tfoot");
    const footerWrapper = document.createElement("tr");
    const footerStart = document.createElement("td");
    footerStart.innerText = "Y,X";
    footerWrapper.appendChild(footerStart);
    for (let i = 0; i <= 9; i++) {
      const td = document.createElement("td");
      td.innerText = i;
      footerWrapper.appendChild(td);
    }
    tableFoot.appendChild(footerWrapper);
    return tableFoot;
  };

  return { generateTable };
}

export default gameboardRender;
