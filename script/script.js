
const words = ["javascript", "programmering", "kodning", "dator", "utveckling"]; //Alex creates an array of words
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
        } else {
            incorrectLetters.push(guess)
            errors++
            updateHangmanImage()
        }
        updateWordDisplay()
        updateIncorrectLettersDisplay()
        updateAttemptsDisplay();
        checkGameStatus()
    }
}


// uppdaterar visningen av felaktiga bokstäver
    const updateIncorrectLettersDisplay = () => {
    incorrectLettersDisplay.textContent = `Felaktiga bokstäver: ${incorrectLetters.join(", ")}`
}

// kontrollera om spelaren har vunnit eller förlorat
const checkGameStatus = () => {
   
    if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {

        setTimeout(() => {
        alert("grattis du vann!")
        let answer = window.confirm("Vill du spela igen?");
        if (answer) {
            resetGame();
        } 
        }, 100);
    
    } else if (errors >= maxErrors) {
        // Show the final part before ending
        document.getElementById("legs").style.display = "block";
        // Short delay before showing the game over message
        setTimeout(() => {
            alert(`Du förlorade! ordet var ${selectedWord}`);
            let answer = window.confirm("Vill du spela igen?");
            if (answer) {
                resetGame();
            }
        }, 100); // Small delay to ensure the part is visible
    }
}

 // visar antalet försökt som är kvar // Robin
const attemptsDisplay = document.getElementById("attempts-display");

const updateAttemptsDisplay = () => {
    attemptsDisplay.textContent = `Försök kvar: ${maxErrors - errors}`;
}

// uppdaterar hangman SVG-bilden beroende på fel
function updateHangmanImage() {
    const parts = ["ground", "scaffold", "head", "body", "arms", "legs"];
    // First hide all parts
    parts.forEach(part => {
        document.getElementById(part).style.display = "none";
    });
    // Then show only the parts up to the current number of errors
    for (let i = 0; i < errors; i++) {
        document.getElementById(parts[i]).style.display = "block";
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