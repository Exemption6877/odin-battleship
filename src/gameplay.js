import { Player, PlayerBot } from "./player.js";
import gameboardRender from "./ui/gameboardUI.js";
import shipDragContainer from "./ui/dragFunctionsUI.js";

// Main instance of the game. (Controller)
// This will be used to map all logic.

function gameplay() {
  // Notify on actions here
  const textContainer = document.querySelector(".text-area");
  const gameboardContainer = document.querySelector(".gameboard");

  let player1 = null;
  let player2 = null;

  const createPlayers = (p1, p2) => {
    player1 = p1 === "player" ? new Player() : new PlayerBot();
    player2 = p2 === "player" ? new Player() : new PlayerBot();

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

  const setup = () => {
    const h1 = document.createElement("h1");
    h1.innerText = "Drag and drop your ships onto the board";
    textContainer.appendChild(h1);

    gameboardContainer.appendChild(
      gameboardRender().generateTable("Your ships")
    );
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
      // If player2 === "player", start placing boats for 2nd non-bot player.
      //  Maybe create another factory for shipDragContainer specifically for 2 players.
      createPlayers("player", button.value);
      setup();

      const gameboardContainer = document.querySelector(".gameboard");
      gameboardContainer.append(shipDragContainer().output());
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
