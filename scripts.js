const playgroundElements = document.querySelectorAll("[data-playground]");
const container = document.querySelector("[data-container]");
const messageTextElement = document.querySelector(
  "[data-message-text]"
  );
const message = document.querySelector("[data-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const messageCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const playground of playgroundElements) {
    playground.classList.remove("circle");
    playground.classList.remove("x");
    playground.removeEventListener("click", handleClick);
    playground.addEventListener("click", handleClick, { once: true });
  }

  setcontainerHoverClass();
  message.classList.remove("show-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    messageTextElement.innerText = "Empate!";
  } else {
    messageTextElement.innerText = isCircleTurn
      ? "(O) Winner!"
      : "(X) Winner!";
  }

  message.classList.add("show-message");
};

const checkForWin = (currentPlayer) => {
  return messageCombinations.some((combination) => {
    return combination.every((index) => {
      return playgroundElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...playgroundElements].every((playground) => {
    return playground.classList.contains("x") || playground.classList.contains("circle");
  });
};

const placeMark = (playground, classToAdd) => {
  playground.classList.add(classToAdd);
};

const setcontainerHoverClass = () => {
  container.classList.remove("circle");
  container.classList.remove("x");

  if (isCircleTurn) {
    container.classList.add("circle");
  } else {
    container.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setcontainerHoverClass();
};

const handleClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const playground = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(playground, classToAdd);

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);