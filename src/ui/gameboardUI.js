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
    const wrapper = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("cell");
    button.value = `${x},${y}`;

    // Drag over event
    button.addEventListener("dragover", (event) => event.preventDefault());

    button.addEventListener("drop", (event) => {
      event.preventDefault();
      const shipType = event.dataTransfer.getData("type");
      const shipDirection = event.dataTransfer.getData("direction");

      //debugging
      console.log(shipDirection);
      console.log(shipType);
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
