const setupBuffer = [];

function dragStartEvent(event, type, player) {
  event.dataTransfer.setData("data-type", type);
  const direction = event.target.classList.contains("vertical")
    ? "vertical"
    : "horizontal";
  event.dataTransfer.setData("data-direction", direction);
  event.dataTransfer.setData("data-player", player);
}

function dragoverEvent(event) {
  event.preventDefault();
}

export { dragStartEvent, dragoverEvent };
