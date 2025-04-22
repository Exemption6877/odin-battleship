import { Gameboard } from "../gameboard.js";
import { dragoverEvent } from "./dragFunctions.js";
import getShipClass from "../sharedUtils.js";
import { game } from "../index.js";

function gameboardRender() {
  const takenCells = [];
  const placedShips = [];

  const onAllShipsPlaced = () => {
    const hiddenShips = document.querySelectorAll(".ship.hidden");
    if (hiddenShips.length >= 5) {
      const directionButton = document.querySelector(".direction");
      directionButton.classList.add("hidden");
      const startGameButton = document.querySelector(".start-game");
      startGameButton.classList.remove("hidden");
    }
  };

  const generateRow = (y) => {
    const rowBlock = document.createElement("tr");
    const rowCounter = document.createElement("th");
    rowCounter.innerText = `${y}`;
    rowBlock.appendChild(rowCounter);
    for (let i = 0; i <= 9; i++) {
      rowBlock.appendChild(generateCell(i, y));
    }

    return rowBlock;
  };
  const generateCell = (x, y) => {
    const wrapper = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("gameboard-cell");
    button.classList.add("cell");
    button.value = `${x} ${y}`;

    // Drag over event

    button.addEventListener("dragover", dragoverEvent);

    // // button.addEventListener("drop", (event) => {
    //   event.preventDefault();
    //   const shipType = event.dataTransfer.getData("type");
    //   const shipDirection = event.dataTransfer.getData("direction");
    //   let coordinates = button.value.split(" ");
    //   coordinates = coordinates.map((coord) => parseInt(coord));
    // // });

    button.addEventListener("drop", (event) => {
      event.preventDefault();

      const shipType = event.dataTransfer.getData("type");
      const shipDirection = event.dataTransfer.getData("direction");

      let coordinates = button.value.split(" ");
      coordinates = coordinates.map((coord) => parseInt(coord));
      const ship = getShipClass(shipType);
      console.log(coordinates, ship, shipDirection);

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
                    randomCell.removeEventListener("dragover", dragoverEvent);

                    const [fx, fy] = cellsToFill.at(0);
                    const [lx, ly] = cellsToFill.at(-1);

                    if (shipDirection === "vertical") {
                      takenCells.push([fx - 1, fy + 1]);
                      takenCells.push([fx + 1, fy + 1]);

                      takenCells.push([lx - 1, ly - 1]);
                      takenCells.push([lx + 1, ly - 1]);
                    } else {
                      takenCells.push([fx - 1, fy - 1]);
                      takenCells.push([fx - 1, fy + 1]);

                      takenCells.push([lx + 1, ly - 1]);
                      takenCells.push([lx + 1, ly + 1]);
                    }

                    takenCells.forEach((takenCoordinate) => {
                      notFilled.forEach((randomCell) => {
                        let randomCoordinate = randomCell.value.split(" ");
                        randomCoordinate = randomCoordinate.map((coord) =>
                          parseInt(coord)
                        );

                        if (
                          randomCoordinate[0] === takenCoordinate[0] &&
                          randomCoordinate[1] === takenCoordinate[1]
                        ) {
                          randomCell.removeEventListener(
                            "dragover",
                            dragoverEvent
                          );
                        }
                      });
                    });
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

      onAllShipsPlaced();
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
