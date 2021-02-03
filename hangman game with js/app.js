const keys = document.querySelector(".keys");
const words = document.querySelector(".words");
const win = document.querySelector(".win");
const backdrop = document.querySelector(".backdrop");
const restartBtn = document.querySelector(".win__btn");

const guessWords = ["Hello", "Love", "Heart", "Compassion"];
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

let pickedWord = [],
  displayGuessWords;

alphabets.forEach((w) => {
  const button = document.createElement("button");
  button.classList = "word";
  button.innerHTML = w;
  keys.appendChild(button);
});
const displayedWords = document.querySelectorAll(".word");

let chosenWord;
const gameInit = () => {
  pickedWord = [];
  displayedWords.forEach((dw) => (dw.disabled = false));
  words.innerHTML = "";
  const rn = Math.floor(Math.random() * guessWords.length);
  chosenWord = guessWords[rn].toLowerCase().replaceAll(" ", "").split("");

  chosenWord.forEach((a) => {
    const span = document.createElement("span");
    span.classList = "guess-word";
    words.appendChild(span);
  });
  displayGuessWords = document.querySelectorAll(".guess-word");
};
gameInit();

displayedWords.forEach((dw) => {
  dw.addEventListener("click", (e) => {
    gameFunc(e);
  });
});

function gameFunc(e) {
  console.log(pickedWord);
  const domText = e.target.innerText.toLowerCase();
  chosenWord.forEach((w, i) => {
    if (w === domText) {
      e.target.disabled = true;
      pickedWord.push({ w, i });
    }
  });
  if (pickedWord.length > 0) {
    pickedWord.forEach((pw) => {
      displayGuessWords[pw.i].innerText = pw.w.toUpperCase();
    });
  }
  if (pickedWord.length === chosenWord.length) {
    setTimeout(() => {
      win.classList.add("show-win");
      backdrop.classList.add("show-backdrop");
    }, 10);
  }
}

restartBtn.addEventListener("click", restartGame);

function restartGame() {
  win.classList.remove("show-win");
  backdrop.classList.remove("show-backdrop");
  gameInit();
}
