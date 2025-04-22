import * as ship from "./ship.js";

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

export default getShipClass;
