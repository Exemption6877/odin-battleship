import { Player, PlayerBot } from "../classes/player.js";
import gameboardRender from "./gameboardUI.js";
import prepPhase from "./prepPhase.js";

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
      if (player2.callName() === "bot") {
        gameState();
      }
    });

    return button;
  };

  const gameState = () => {
    hideTable();
    const guide = document.createElement("h1");
    guide.textContent = "Attack by clicking a cell on the enemy gameboard.";
    textContainer.appendChild(guide);
    renderPlayerTable(player1, true);
    renderPlayerTable(player2, false);
    addClickEventToTable(player2);
  };

  const botAttack = (defender, attacker) => {
    let attackCoordinate = attacker.makeMove();
    const defenderCall = defender.callGameboard();
    const cells = document.querySelectorAll(
      `.${defender.callName()}-table .cell`
    );

    let action;
    let wasHit = false;

    while (true) {
      if (winCheck(defender)) {
        endGame(attacker);
        break;
      }
      action = defenderCall.receiveAttack(attackCoordinate);
      if (action === false) {
        cells.forEach((cell) => {
          let cellCoordinate = cell.value.split(" ");
          cellCoordinate = cellCoordinate.map((coord) => parseInt(coord));

          if (
            attackCoordinate[0] === cellCoordinate[0] &&
            attackCoordinate[1] === cellCoordinate[1]
          ) {
            cell.classList.add("missed-cell");
          }
        });
        break;
      } else if (action === null) {
        wasHit = false;
        attackCoordinate = attacker.makeMove(wasHit, attackCoordinate);
      } else if (action === true) {
        wasHit = true;
        cells.forEach((cell) => {
          let cellCoordinate = cell.value.split(" ");
          cellCoordinate = cellCoordinate.map((coord) => parseInt(coord));

          if (
            attackCoordinate[0] === cellCoordinate[0] &&
            attackCoordinate[1] === cellCoordinate[1]
          ) {
            cell.classList.add("hit-ship");
            cell.classList.remove("friendly-ship");
          }
        });
        attackCoordinate = attacker.makeMove(wasHit, attackCoordinate);
      }
    }
  };

  const winCheck = (player) => {
    return player.callGameboard().winState();
  };

  const playerAttack = (attacker, defender, event) => {
    const button = event.target;
    let cellCoordinate = button.value.split(" ");
    cellCoordinate = cellCoordinate.map((coord) => parseInt(coord));
    if (defender.callGameboard().receiveAttack(cellCoordinate)) {
      button.classList.add("hit-ship");

      if (winCheck(defender)) {
        endGame(attacker);
      }
    } else {
      button.classList.add("missed-cell");
      botAttack(player1, player2);
    }
  };

  const addClickEventToTable = (player) => {
    const playerName = player.callName();
    const cells = document.querySelectorAll(`.${playerName}-table .cell`);

    cells.forEach((cell) => {
      cell.addEventListener(
        "click",
        (event) => playerAttack(player1, player2, event),
        {
          once: true,
        }
      );
    });
  };

  const endGame = (winner) => {
    hideTable(player1.callName());
    hideTable(player2.callName());

    const h1 = document.createElement("h1");

    if (winner.callName() === "bot") {
      h1.textContent = `Bot has won!`;
    } else {
      h1.textContent = `Congratulations! ${winner.callName()} has won!`;
    }

    textContainer.appendChild(h1);
  };

  const renderPlayerTable = (player, expose = false) => {
    const playerName = player.callName();
    gameboardRender().generateTable(playerName, playerName);

    if (expose) {
      const coordinatesArr = [];
      const placedShips = player.callGameboard().callPlacedShips();
      const cells = document.querySelectorAll(`.${playerName}-table .cell`);

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
      }
    });
    return button;
  };
  const hideTable = (tableName = "setup") => {
    const description = document.querySelector(".setup-description");
    const table = document.querySelector(`.${tableName}-table`);
    const dragContainer = document.querySelector(".drag");
    const h1 = document.querySelector("h1");

    if (h1) {
      h1.remove();
    }

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

  const chooseOpponentButtons = (player1 = "player", player2 = "bot") => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("choose-opponent");
    // const button1 = playAgainstButton(player1);
    const button2 = playAgainstButton(player2);
    wrapper.append(button2);

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
