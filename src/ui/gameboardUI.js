import { Gameboard } from "../gameboard.js";
import {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
} from "../ship.js";

function dragoverEvent(event) {
  event.preventDefault();
}

function gameboardRender() {
  // obfuscate it later
  const takenCells = [];

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

    button.addEventListener("dragover", dragoverEvent);

    button.addEventListener("drop", (event) => {
      event.preventDefault();

      const shipType = event.dataTransfer.getData("type");
      const shipDirection = event.dataTransfer.getData("direction");

      let coordinates = button.value.split(" ");
      coordinates = coordinates.map((coord) => parseInt(coord));

      const ship = __detectShipClass(shipType);

      const notFilled = document.querySelectorAll(
        ".gameboard-cell:not(.friendly-ship):not(.adjusted-cell)"
      );
      const cellsToFill = new Gameboard().placeShip(
        coordinates,
        ship,
        shipDirection
      );

      function takenCheck() {
        if (!Array.isArray(cellsToFill) || cellsToFill.length === 0) {
          return false;
        }

        for (let cellToFill of cellsToFill) {
          const [x, y] = cellToFill;
          if (x < 0 || x > 9 || y < 0 || y > 9) {
            return false;
          }

          for (let takenCell of takenCells) {
            if (x === takenCell[0] && y === takenCell[1]) {
              return false;
            }
          }
        }
        return true;
      }

      const notTaken = takenCheck();

      if (notTaken) {
        notFilled.forEach((cell) => {
          for (let coord of cellsToFill) {
            let cellCoord = cell.value.split(" ");
            cellCoord = cellCoord.map((coord) => parseInt(coord));

            if (cellCoord[0] === coord[0] && cellCoord[1] === coord[1]) {
              const aroundCells = new Gameboard().aroundArea([cellCoord]);
              takenCells.push(cellCoord);
              cell.classList.add("friendly-ship");
              cell.removeEventListener("dragover", dragoverEvent);

              aroundCells.forEach((aroundCoord) => {
                for (let randomCell of notFilled) {
                  let randomCoordinate = randomCell.value.split(" ");
                  randomCoordinate = randomCoordinate.map((coord) =>
                    parseInt(coord)
                  );
                  if (
                    randomCoordinate[0] === aroundCoord[0] &&
                    randomCoordinate[1] === aroundCoord[1] &&
                    !randomCell.classList.contains("friendly-ship")
                  ) {
                    takenCells.push(randomCoordinate);
                    randomCell.classList.add("adjusted-cell");
                  }
                }
              });
            }
          }
        });

        //hide dropped ship
        const droppedShip = document.querySelector(`[data-type="${shipType}"]`);
        droppedShip.classList.add("hidden");
      } else {
        console.log("Cannot place the ship: some cells are already taken.");
      }
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
