// List of words and their hints in English
const wordsList = [
    { word: "html", hint: "Standard markup language for web pages" },
    { word: "css", hint: "Style sheet language used for describing presentation" },
    { word: "javascript", hint: "Programming language of the web" },
    { word: "browser", hint: "Application used to access the internet" },
    { word: "github", hint: "Platform for hosting and reviewing code" }
];

// English alphabet array for the virtual keyboard
const englishAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");

let selectedWord = "";
let selectedHint = "";
let guessedLetters = [];
let lives = 5;

// DOM elements
const hintText = document.getElementById("hintText");
const wordDisplay = document.getElementById("wordDisplay");
const livesDisplay = document.getElementById("lives");
const keyboard = document.getElementById("keyboard");
const resetBtn = document.getElementById("resetBtn");

// Initialize the game
function initGame() {
    lives = 5;
    guessedLetters = [];
    livesDisplay.textContent = lives;

    // Pick a random word object
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    selectedWord = wordsList[randomIndex].word;
    selectedHint = wordsList[randomIndex].hint;

    // Display the hint
    hintText.textContent = selectedHint;

    // Render hidden word boxes
    renderWord();

    // Create keyboard buttons
    createKeyboard();
}

// Render the word on screen
function renderWord() {
    wordDisplay.innerHTML = "";
    for (let char of selectedWord) {
        const box = document.createElement("div");
        box.className = "letter-box";
        box.textContent = guessedLetters.includes(char) ? char.toUpperCase() : "";
        wordDisplay.appendChild(box);
    }
}

// Create alphabet keyboard buttons
function createKeyboard() {
    keyboard.innerHTML = "";
    englishAlphabet.forEach(letter => {
        const btn = document.createElement("button");
        btn.className = "key-btn";
        btn.textContent = letter;
        btn.addEventListener("click", () => handleGuess(letter, btn));
        keyboard.appendChild(btn);
    });
}

// Handle letter guess
function handleGuess(letter, buttonElement) {
    buttonElement.disabled = true;

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        renderWord();
        checkWin();
    } else {
        lives--;
        livesDisplay.textContent = lives;
        checkLoss();
    }
}

// Check for win condition
function checkWin() {
    const isWin = selectedWord.split("").every(char => guessedLetters.includes(char));
    if (isWin) {
        setTimeout(() => {
            alert("Congratulations! You guessed the word correctly!");
            disableAllButtons();
        }, 100);
    }
}

// Check for loss condition
function checkLoss() {
    if (lives <= 0) {
        setTimeout(() => {
            alert(`Game Over! The correct word was: (${selectedWord.toUpperCase()})`);
            disableAllButtons();
        }, 100);
    }
}

// Disable all keyboard buttons after game ends
function disableAllButtons() {
    const buttons = keyboard.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

// Reset button event listener
resetBtn.addEventListener("click", initGame);

// Run the game on page load
initGame();