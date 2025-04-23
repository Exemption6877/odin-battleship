import gameplay from "./ui/gameplay.js";
import "./styles.css";

const game = gameplay();

// Button in HTML
const gameStartButton = document.querySelector("#game-start");
gameStartButton.addEventListener("click", () => {
  const greetingBlock = document.querySelector(".greeting");
  greetingBlock.classList.add("hidden");

  const gameboardContainer = document.querySelector(".gameboard");
  gameboardContainer.append(game.chooseOpponentButtons());
});

export default game;
