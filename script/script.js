
const words = ["javascript", "programmering", "coding", "computer", "development"]; //Alex creates an array of words
let selectedWord = words[Math.floor(Math.random() * words.length)]  //Alex Picks a random word from the array
let guessedLetters = [] //Alex Empty array to store guessedLetters
let incorrectLetters = [] //Alex Empty array to store incorrectLetters
let maxErrors = 6
let errors = 0


// Hämtar html element
const wordDisplay = document.getElementById("word-display")
const incorrectLettersDisplay = document.getElementById("incorrect-letters")
const guessInput = document.getElementById("guess-input")
const guessBtn = document.getElementById("guess-btn")







// funktion för uppdatera ordet som visas på skärmen
const updateWordDisplay = () => {
    const displayWord = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ")
    wordDisplay.textContent = displayWord
}


// kontrollera gissningen
const handleGuess = () => {
    const guess = guessInput.value.toLowerCase()
    guessInput.value = ""

    if (guess && !guessedLetters.includes(guess) && !incorrectLetters.includes(guess)) {
        if (selectedWord.includes(guess)) {
            guessedLetters.push(guess)
            console.log('rätt gissning: ${guess}')
        } else {
            incorrectLetters.push(guess)
            errors++
            updateHangmanImage()
        }
        updateWordDisplay()
        updateIncorrectLettersDisplay()
        updateAttemptsDisplay()
        checkGameStatus()
    }
}


// uppdaterar visningen av felaktiga bokstäver
    const updateIncorrectLettersDisplay = () => {
    incorrectLettersDisplay.textContent = `Incorrect letters: ${incorrectLetters.join(", ")}`
}

// kontrollera om spelaren har vunnit eller förlorat
const checkGameStatus = () => {
    if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        alert("grattis du vann!")
        
        let answer = window.confirm("Play again???");

        if (answer) {
            resetGame()// User clicked OK
        } else {
            // User clicked Cancel
        }
    } else if (errors >= maxErrors) {
        alert(`You loose, the word was: '${selectedWord}'`);
        let answer = window.confirm("Play again??");

        if (answer) {
            resetGame()// User clicked OK
        } else {
            // User clicked Cancel
        }
                
     }
}

 // visar antalet försökt som är kvar // Robin
const attemptsDisplay = document.getElementById("attempts-display");

const updateAttemptsDisplay = () => {
    attemptsDisplay.textContent = `Attemts left: ${maxErrors - errors}`;
}

// uppdaterar hangman SVG-bilden beroende på fel
function updateHangmanImage() {
    const parts = ["ground", "scaffold", "head", "body", "arms", "legs"];
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
    //document.getElementById("ground").style.display = "block"; Om vi vill visa ground eller inte?
}



guessBtn.addEventListener("click", handleGuess)
updateWordDisplay()
resetGame()


//Alex lägg in efter alert att man vunnit eller förlorat.
//behöver koppla ResetGame som jag gjort nedan.

// let answer = window.confirm("Vill du spela igen?");

// if (answer) {
//   resetGame()// User clicked OK
// } else {
//      // User clicked Cancel
// }