import { Player, PlayerBot } from "./player.js";
import gameboardRender from "./ui/gameboardUI.js";
import prepPhase from "./ui/prepPhase.js";
import { allShipsPlaced } from "./sharedUtils.js";

// Main instance of the game. (Controller)
// This will be used to map all logic.

function gameplay() {
  // Notify on actions here
  const textContainer = document.querySelector(".text-area");
  const gameboardContainer = document.querySelector(".gameboard");

  let player1 = null;
  let player2 = null;

  const createPlayers = (p1, p2) => {
    player1 = p1 === "player" ? new Player(p1) : new PlayerBot(p1);
    player2 = p2 === "player" ? new Player(p2) : new PlayerBot(p2);

    if (player1 instanceof PlayerBot) {
      player1.generateGameboard();
    }

    if (player2 instanceof PlayerBot) {
      player2.generateGameboard();
    }
  };

  const getPlayers = () => {
    return { player1, player2 };
  };
  const startGameButton = () => {
    const button = document.createElement("button");
    button.classList.add("start-game");
    button.classList.add("btn-choice");
    button.classList.add("hidden");
    button.innerText = "Start Game!";

    button.addEventListener("click", () => {
      hideTable();
      renderPlayerTable(player1, true);
      renderPlayerTable(player2, false);
    });

    return button;
  };

  const renderPlayerTable = (player, expose = false) => {
    const playerName = player.callName();
    gameboardRender().generateTable(playerName, playerName);

    const cells = document.querySelectorAll(`.${playerName}-table .cell`);

    if (expose) {
      const coordinatesArr = [];
      const placedShips = player.callGameboard().callPlacedShips();

      placedShips.forEach((ship) => {
        ship.callCoordinates().forEach((coordinate) => {
          coordinatesArr.push(coordinate);
        });
      });

      cells.forEach((cell) => {
        let cellCoordinate = cell.value.split(" ");
        cellCoordinate = cellCoordinate.map((coord) => parseInt(coord));

        coordinatesArr.forEach((shipCoordinate) => {
          if (
            shipCoordinate[0] === cellCoordinate[0] &&
            shipCoordinate[1] === cellCoordinate[1]
          ) {
            cell.classList.add("friendly-ship");
          }
        });
      });
      // show ships
    }
  };

  const setup = (player) => {
    const description = document.createElement("h1");
    description.classList.add("setup-description");
    description.innerText = `Drag and drop your ships onto the board.`;
    textContainer.appendChild(description);

    gameboardRender().generateTable("setup", `${player}`);
  };

  // Object to change
  const playAgainstButton = (player) => {
    const button = document.createElement("button");
    button.classList.add("btn-choice");
    button.innerText = `Play against ${player}`;
    button.value = player;

    button.addEventListener("click", () => {
      const wrapper = document.querySelector(".choose-opponent");
      wrapper.classList.add("hidden");

      if (player === "bot") {
        createPlayers("player", button.value);

        setup("player");
        prepPhase().output("player", startGameButton());
      } else {
        createPlayers("player1", "player2");
        // pass a nextPlayerButton here
        // prepPhase().output("player1");

        // setup("player1");
        // Logic for 2 players, do it much later.
      }
    });
    return button;
  };
  const hideTable = () => {
    const description = document.querySelector(".setup-description");
    const table = document.querySelector(".setup-table");
    const dragContainer = document.querySelector(".drag");

    if (description) {
      description.remove();
    }

    if (table) {
      table.remove();
    }

    if (dragContainer) {
      dragContainer.remove();
    }
  };
  // Object to change
  const gameLoop = (players) => {
    const gameboardContainer = document.querySelector(".gameboard");
    const gameStartButton = document.querySelector(".start-game");
    gameStartButton.addEventListener("click", () => {
      gameboardContainer.appendChild(gameboardRender().output("Enemy"));
    });
    //Probably will move it to index.js
    // Render both Tables? left enemy, right yours.
  };

  const chooseOpponentButtons = (player1 = "player", player2 = "bot") => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("choose-opponent");
    const button1 = playAgainstButton(player1);
    const button2 = playAgainstButton(player2);
    wrapper.append(button1, button2);

    return wrapper;
  };

  return {
    getPlayers,
    createPlayers,
    setup,
    chooseOpponentButtons,
  };
}

export default gameplay;
