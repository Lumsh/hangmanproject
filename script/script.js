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