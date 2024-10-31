//Variabler

const words = ["javascript", "programmering", "kodning", "dator", "utveckling"] //Skapar Array med ord
let selectedWord = words[Math.floor(Math.random() * words.length)] //Hämtar ett random ord från Array
let guessedLetters = [] //Tom Array för att spara bokstäver man gissat på
let incorrectLetters = [] //Tom Array för att spara felaktiga bokstäver
let maxErrors = 6
let errors = 0

//Hämtar html-element
const wordDisplay = document.getElementById("word-display")
const incorrectLettersDisplay = document.getElementById("incorrect-letters")
const guessInput = document.getElementById("guess-input")
const guessBtn = document.getElementById("guess-btn")


//updaterar visning av felaktiga bokstäver
const updateIncorrectLettersDisplay = () => {
    incorrectLettersDisplay.textContent = `Felaktiga bokstäver: ${incorrectLetters.join(", ")}`
}
// Kontrollerar om spelaren vunnit eller förlorat
const checkGameStatus = () => {
    if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        alert("grattis du vann!")
        resetGame()
    } else if (errors >= maxErrors) {
        alert(`Du förlorade! ordet var ${selectedWord}`)
        resetGame();
        console.log(checkGameStatus)
    }
}

// uppdaterar hangman SVG-bilden beroende på fel
function updateHangmanImage() {
    const parts = ["head", "body", "arms", "legs"];
    if (errors > 0 && errors <= maxErrors) {
        document.getElementById(parts[errors - 1]).style.display = "block";
    }
}


// nollställer spelet
const resetGame = () => {
    selectedWord = words[Math.floor(Math.random() * words.length)]
    guessedLetters = []
    incorrectLetters = []
    errors = 0
    updateWordDisplay()
    updateIncorrectLettersDisplay()
    document.querySelectorAll("path, ellipse").forEach(part => (part.style.display = "none"))
    document.getElementById("ground").style.display = "block";
}



guessBtn.addEventListener("click", handleGuess)
updateWordDisplay()
resetGame()