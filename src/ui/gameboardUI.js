import { dragDropEvent, dragOverEvent } from "./dragFunctions.js";
import { allShipsPlaced } from "../sharedUtils.js";

function gameboardRender() {
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

    button.addEventListener("dragover", dragOverEvent);

    button.addEventListener("drop", (event) => {
      dragDropEvent(event, button);
      if (allShipsPlaced()) {
        const directionButton = document.querySelector(".direction");
        directionButton.classList.add("hidden");
        const startGameButton = document.querySelector(".start-game");
        startGameButton.classList.remove("hidden");
      }
    });
    wrapper.appendChild(button);

    return wrapper;
  };

  const generateTable = (type, player) => {
    const gameboardContainer = document.querySelector(".gameboard");

    const table = document.createElement("table");
    table.classList.add(`${type}-table`);
    const caption = document.createElement("caption");
    caption.innerText = `${player}`;
    const tableBody = document.createElement("tbody");

    for (let i = 9; i >= 0; i--) {
      tableBody.appendChild(generateRow(i));
    }

    table.append(caption, tableBody, generateFooter());
    gameboardContainer.append(table);
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

  return { allShipsPlaced, generateTable };
}

export default gameboardRender;
