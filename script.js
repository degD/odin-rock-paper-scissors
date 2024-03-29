
// Defines.
const selectionPage = document.querySelector("#selection-page");
const turnTitle = document.querySelector("#turn-title");
const playerScoreTitle = document.querySelector("h2.score-title#player");
const computerScoreTitle = document.querySelector("h2.score-title#computer");
turnTitle.textContent = "Turn number 1/3";

const outcomePage = document.querySelector("#outcome-page");
const outcomeTitle = document.querySelector("#outcome-title");
const choices = document.querySelector("#choices");
const explanation = document.querySelector("#explanation");
const prevCompMovesList = document.querySelector("#num-of-previous-ai-moves");

const gameOverPage = document.querySelector("#gameover-page");
const gameOverTitle = document.querySelector("#gameover-title");
const gameOverResult = document.querySelector("#result");

const welcomePage = document.querySelector("#welcome-page")
const turnNumberField = document.querySelector("input#turn-number");

// Global Variables.
let roundCount = 0;
let playerScore = 0;
let computerScore = 0;
let playerMove = "";
let turnNumber = 3;
let currentTurnNumber = 1;
let previousComputerMoves = {
    "rock": 0,
    "paper": 0,
    "scissors": 0
}

// Adding event listener to move selection divs.
const moves = document.querySelectorAll("#selection-choices img");
moves.forEach(function (move) {
    move.addEventListener("click", e => {
        const selection = e.target;
        console.log(selection["name"]);
        playerMove = selection["name"];

        // Blinking animation.
        selection.style["border-color"] = "#EBF400";
        setTimeout(() => {
            selection.style["border-color"] = "#F57D1F";
            selectionPage.style["display"] = "none";
            outcomePage.style["display"] = "block";
        }, 500);

        // Computer move.
        let computerMove = getComputerChoice();
        previousComputerMoves[computerMove] += 1;
        console.log(previousComputerMoves);

        // Choices.
        choices.textContent = `Computer chose ${computerMove}, you chose ${playerMove}!`;
        
        // Round result.
        let roundResult = playRound(playerMove, computerMove);
        if (roundResult > 0) {
            currentTurnNumber += 1;
            outcomeTitle.textContent = "Player gets score!";
            explanation.textContent = `${capitalize(playerMove)} beats ${computerMove}!`;
            playerScore += 1;
        } else if (roundResult == 0) {
            outcomeTitle.textContent = "Tie!";
            explanation.textContent = "Moves are same.";
        } else {
            currentTurnNumber += 1;
            outcomeTitle.textContent = "Computer gets score!";
            explanation.textContent = `${capitalize(computerMove)} beats ${playerMove}!`;
            computerScore += 1;
        }
        roundCount += 1;

        // Log game info.
        console.log(`Player: ${playerScore}, Computer: ${computerScore}, Round: ${roundCount}`);

        // Update previous computer moves list on page.
        Array.from(prevCompMovesList.children).forEach(li => {
            console.log(li.className);
            li.textContent = `${li.className}: ${previousComputerMoves[li.className]}`;
        });

        // Update score titles.
        playerScoreTitle.textContent = `Player: ${playerScore}`;
        computerScoreTitle.textContent = `Computer: ${computerScore}`;
    })
});

// Adding event listener to next turn button.
const nextTurnButton = document.querySelector("button#next");
nextTurnButton.addEventListener("click", e => {
    if (isGameOver(currentTurnNumber, turnNumber)) {
        outcomePage.style["display"] = "none";
        gameOverPage.style["display"] = "block";

        // If game over, add scores and info.
        document.querySelector("#resolution li.player-score").textContent = `Player: ${playerScore}`;
        document.querySelector("#resolution li.computer-score").textContent = `Computer: ${computerScore}`;
        document.querySelector("#resolution li.rounds").textContent = `Rounds: ${roundCount}`;
        document.querySelector("#resolution li.turns").textContent = `Turns: ${turnNumber}`;

        // Overall game result.
        if (playerScore > computerScore) {
            gameOverResult.textContent = "You win!";
        } else if (playerScore < computerScore) {
            gameOverResult.textContent = "You lose!";
        } else {
            gameOverResult.textContent = "Tie!";
        }
        
    } else {
        turnTitle.textContent = `Turn number ${currentTurnNumber}/${turnNumber}`;
        outcomePage.style["display"] = "none";
        selectionPage.style["display"] = "block";
    }
});

// Adding event listener for "play again" button.
const playAgainButton = document.querySelector("button#replay");
playAgainButton.addEventListener("click", e => {
    gameOverPage.style["display"] = "none";
    welcomePage.style["display"] = "block";
});

// Adding event listener for "play game" button.
const playGameButton = document.querySelector("button#play");
playGameButton.addEventListener("click", e => {
    welcomePage.style["display"] = "none";
    selectionPage.style["display"] = "block";

    // Read turn number from input field.
    console.log(turnNumberField.value);
    turnNumber = turnNumberField.value; 
    
    // Reset other global variables.
    roundCount = 0;
    playerScore = 0;
    computerScore = 0;
    playerMove = "";
    currentTurnNumber = 1;
    previousComputerMoves = {
        "rock": 0,
        "paper": 0,
        "scissors": 0
    }
    turnNumberField.value = null;
    playerScoreTitle.textContent = "Player: 0";
    computerScoreTitle.textContent = "Computer: 0";

    // Set initial turn number title.
    turnTitle.textContent = `Turn number ${currentTurnNumber}/${turnNumber}`
});

// Add event listener for input field, disable "play game" button unless a positive
// integer is entered.
turnNumberField.addEventListener("input", e => {
    console.log(`Is value pos int: ${checkFieldInput(e.target.value)}`);
    playGameButton.disabled = !checkFieldInput(e.target.value);
});

/**
 * Make the first character of the string upper case.
 * @param {string} str String to capitalize.
 * @returns {string} Capitalized string.
 */
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * Return 0, -1, 1 based on the result of a rock-paper-scissors turn. Return 0 if
 * the ends with a tie, -1 if the computer wins and 1 the if player wins. 
 * @param {string} playerSelection Move selection of the player.
 * @param {string} computerSelection Random move selection from the computer.
 * @returns {number} Result of the turn
 */
function playRound(playerSelection, computerSelection) {
    if (playerSelection === '') {
        console.log('You lose! You had to make a move.');
        return -1;
    }
    else if (playerSelection === 'rock') {
        if (computerSelection === 'rock') {
            console.log('Tie! Rock with rock!');
            return 0;
        }
        if (computerSelection === 'paper') {
            console.log('You lose! Paper beats rock.');
            return -1;
        }
        if (computerSelection === 'scissors') {
            console.log('You win! Rock beats scissors.')
            return 1;
        }
    }
    else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            console.log('You win! Paper beats rock.');
            return 1;
        }
        if (computerSelection === 'paper') {
            console.log('Tie! Paper with paper!');
            return 0;
        }
        if (computerSelection === 'scissors') {
            console.log('You lose! Scissors beats paper.');
            return -1;
        }
    }
    else if (playerSelection === 'scissors') {
        if (computerSelection === 'rock') {
            console.log('You lose! Rock beats scissors.');
            return -1;
        }
        if (computerSelection === 'paper') { 
            console.log('You win! Scissors beats paper.');
            return 1;
        }
        if (computerSelection === 'scissors') {
            console.log('Tie! Scissors with scissors!');
            return 0;
        }
    }
}

/**
 * Randomly select a move for computer in Rock Paper Scissors game.
 * @returns {string} Computer's RPS move.
 */
function getComputerChoice() {
    let possibleMoves = ["rock", "paper", "scissors"];
    let choiceIndex = Math.floor(Math.random() * 3);
    return possibleMoves[choiceIndex];
}

/**
 * Return true if turn number is 0 or less, false otherwise.
 * @param {number} currentTurnNumber Number of turns played (different than rounds).
 * @returns {boolean} result of a question?
 */
function isGameOver(currentTurnNumber, turnNumber) {
    return (currentTurnNumber > turnNumber);
}

/**
 * Return true if field input is a positive integer. False otherwise.
 * @param {*} fieldInput Input value from a number input field.
 * @returns {boolean} resolt of the check.
 */
function checkFieldInput(fieldInput) {
    let fieldNumber = +fieldInput;
    if ((typeof fieldNumber == "number") && Number.isInteger(fieldNumber) && (fieldNumber > 0)) {
        return true;
    } 
    return false;
}