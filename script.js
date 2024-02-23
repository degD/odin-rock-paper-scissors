
// Defines.
const selectionPage = document.querySelector("#selection-page");
const turnTitle = document.querySelector("#turn-title");
turnTitle.textContent = "Turn number " + 5;

const outcomePage = document.querySelector("#outcome-page");
const outcomeTitle = document.querySelector("#outcome-title");
const choices = document.querySelector("#choices");
const explanation = document.querySelector("#explanation");
const prevCompMovesList = document.querySelector("#num-of-previous-ai-moves");

const gameOverPage = document.querySelector("#gameover-page");
const gameOverTitle = document.querySelector("#gameover-title");
const gameOverResult = document.querySelector("#result");
const gameOverResolution = document.querySelector("#resolution");

// Global Variables.
let roundCount = 0;
let playerScore = 0;
let computerScore = 0;
let playerMove = "";
let turnNumber = 5;
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
            turnNumber -= 1;
            outcomeTitle.textContent = "Player gets score!";
            explanation.textContent = `${capitalize(playerMove)} beats ${computerMove}!`;
            playerScore += 1;
        } else if (roundResult == 0) {
            outcomeTitle.textContent = "Tie!";
            explanation.textContent = "Moves are same.";
        } else {
            turnNumber -= 1;
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
        const playerScoreTitle = document.querySelector("h2.score-title#player");
        const computerScoreTitle = document.querySelector("h2.score-title#computer");
        playerScoreTitle.textContent = `Player: ${playerScore}`;
        computerScoreTitle.textContent = `Computer: ${computerScore}`;
    })
});

// Adding event listener to next turn button.
const nextTurnButton = document.querySelector("button#next");
nextTurnButton.addEventListener("click", e => {
    if (isGameOver(turnNumber)) {
        outcomePage.style["display"] = "none";
        gameOverPage.style["display"] = "block";
    } else {
        turnTitle.textContent = "Turn number " + turnNumber;
        outcomePage.style["display"] = "none";
        selectionPage.style["display"] = "block";
    }
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
 * @param {number} turnNumber Number of turns played (different than rounds).
 * @returns {boolean} result of a question?
 */
function isGameOver(turnNumber) {
    return (turnNumber <= 0);
}