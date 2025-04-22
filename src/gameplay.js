import { Player, PlayerBot } from "./player.js";
import gameboardRender from "./ui/gameboardUI.js";
import prepPhase from "./ui/prepPhase.js";

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

  const setup = (player) => {
    const description = document.createElement("h1");
    description.classList.add("setup-description");
    description.innerText = `Drag and drop your ships onto the board.`;
    textContainer.appendChild(description);

    gameboardContainer.appendChild(
      gameboardRender().generateTable("setup", `${player}`)
    );
  };

  const hideSetup = () => {
    const description = document.querySelector(".setup-description");
    const table = document.querySelector(".setup-table");
    description.remove();
    table.remove();
  };

  // Object to change
  const playAgainstButton = (player) => {
    const button = document.createElement("button");
    button.classList.add("btn-choice");
    button.innerText = `Play against ${player}`;
    button.value = player;

    button.addEventListener("click", () => {
      const gameboardContainer = document.querySelector(".gameboard");
      const wrapper = document.querySelector(".choose-opponent");
      wrapper.classList.add("hidden");

      if (player === "bot") {
        createPlayers("player", button.value);

        setup("player");
        gameboardContainer.append(prepPhase().output("player"));
      } else {
        createPlayers("player1", "player2");
        gameboardContainer.append(prepPhase().output("player1"));

        // setup("player1");
        // Logic for 2 players, do it much later.
      }
    });
    return button;
  };
  // Object to change
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
