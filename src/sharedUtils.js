import * as ship from "./ship.js";
import game from "./index.js";

function getShipClass(type) {
  switch (type) {
    case "carrier":
      return new ship.Carrier();
    case "battleship":
      return new ship.Battleship();
    case "destroyer":
      return new ship.Destroyer();
    case "submarine":
      return new ship.Submarine();
    case "patrol":
      return new ship.PatrolBoat();
    default:
      console.log(`Error: unknown ship type = ${type}`);
  }
}

function getPlayerByString(string) {
  const players = game.getPlayers();
  const playersArray = Object.values(players);
  for (let i = 0; i < playersArray.length; i++) {
    if (playersArray[i].callName() === string) {
      return playersArray[i];
    }
  }
}

function allShipsPlaced() {
  const hiddenShips = document.querySelectorAll(".ship.hidden");
  return hiddenShips.length === 5;
}

export default getShipClass;
export { getPlayerByString, allShipsPlaced };
