const words = [
  "javascript",
  "programmering",
  "coding",
  "computer",
  "development",
]; // creates an array of words
let selectedWord = words[Math.floor(Math.random() * words.length)]; //Picks a random word from the array
let guessedLetters = []; // Empty array to store guessedLetters
let incorrectLetters = []; // Empty array to store incorrectLetters
let maxErrors = 6;
let errors = 0;

// Fetch html Elements
const wordDisplay = document.getElementById("word-display");
const incorrectLettersDisplay = document.getElementById("incorrect-letters");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");

// Function display the word on screen
const updateWordDisplay = () => {
  const displayWord = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = displayWord;
}
//Robin
// Check the guesses if player guessed right or wrong!
const handleGuess = () => {
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (
    guess &&
    !guessedLetters.includes(guess) &&
    !incorrectLetters.includes(guess)
  ) {
    if (selectedWord.includes(guess)) {
      guessedLetters.push(guess);
      console.log("rätt gissning: ${guess}");
    } else {
      incorrectLetters.push(guess);
      errors++;
      updateHangmanImage();
    }
    updateWordDisplay();
    updateIncorrectLettersDisplay();
    updateAttemptsDisplay();
    checkGameStatus();
  }
};




// Update display of incorrect letters
const updateIncorrectLettersDisplay = () => {
  incorrectLettersDisplay.textContent = `Incorrect letters: ${incorrectLetters.join(
    ", "
  )}`;
};

// Checks if player lost or won
const checkGameStatus = () => {
  if (
    selectedWord.split("").every((letter) => guessedLetters.includes(letter))
  ) {
    setTimeout(() => {
      alert("Congratulations, you won!");
      let answer = window.confirm("Do you want to play again?");
      if (answer) {
        resetGame();
      }
    }, 100);
  } else if (errors >= maxErrors) {
    // Show the final part before ending
    document.getElementById("legs").style.display = "block";
    // Short delay before showing the game over message
    setTimeout(() => {
      alert(`You lost! The correct word was ${selectedWord}`);
      let answer = window.confirm("Do you want to play again?");
      if (answer) {
        resetGame();
      }
    }, 100); // Small delay to ensure the part is visible
  }
};

// Display number of attempts left
const attemptsDisplay = document.getElementById("attempts-display");

const updateAttemptsDisplay = () => {
  attemptsDisplay.textContent = `Attemts left: ${maxErrors - errors}`;
};


//karl
// Updates hangman SVG-img
function updateHangmanImage() {
  const parts = ["ground", "scaffold", "head", "body", "arms", "legs"];
  // First hide all parts
  parts.forEach((part) => {
    document.getElementById(part).style.display = "none";
  });
  // Then show only the parts up to the current number of errors
  for (let i = 0; i < errors; i++) {
    document.getElementById(parts[i]).style.display = "block";
  }
}

// reset the game 
const resetGame = () => {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectLetters = [];
  errors = 0;
  updateWordDisplay();
  updateIncorrectLettersDisplay();
  document
    .querySelectorAll("path, ellipse")
    .forEach((part) => (part.style.display = "none"));
 
};

guessBtn.addEventListener("click", handleGuess);
updateWordDisplay();
resetGame();

