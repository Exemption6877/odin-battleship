const setupBuffer = [];

function dragStartEvent(event, type) {
  event.dataTransfer.setData("type", type);

  const buttonValue = document.querySelector(".direction").value;
  event.dataTransfer.setData("direction", buttonValue);
}

function dragoverEvent(event) {
  event.preventDefault();
}



export { dragStartEvent, dragoverEvent};
