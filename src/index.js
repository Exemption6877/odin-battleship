import gameplay from "./gameplay.js";
import "./styles.css";

// Button in HTML
const gameStartButton = document.querySelector("#game-start");
gameStartButton.addEventListener("click", () => {
  const greetingBlock = document.querySelector(".greeting");
  greetingBlock.classList.add("hidden");

  const gameboardContainer = document.querySelector(".gameboard");
  gameboardContainer.append(gameplay().chooseOpponentButtons());
});

const game = gameplay();

export default game;
