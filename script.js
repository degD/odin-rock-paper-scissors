
/**
 * Returns a random move outcome from a game of rock-paper-scissors.
 * @returns {string} The name of the outcome
 */
function getComputerChoice() {
    let outcomes = ['rock', 'paper', 'scissors'];
    let index = Math.floor(Math.random() * 3);
    return outcomes[index];
}

/**
 * Prompt and return user's selection of rock-paper-scissors move.
 * @param {number} roundNumber The number of the current round
 * @returns {string} User's move
 */
function getPlayerChoice(roundNumber) {
    let outcomes = ['rock', 'paper', 'scissors'];
    let playerInput;
    try {
        playerInput = prompt(`${roundNumber}# Rock, paper, scissors?`).toLowerCase();
    } catch (error) {
        return '';
    }
    if (outcomes.indexOf(playerInput) >= 0) {
        return playerInput;
    }
    return '';
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
 * Main function of the rock-paper-scissors game.
 */
function game() {
    let numberOfTurns = +prompt('How many turns do you want to play?');
    if (numberOfTurns < 0) numberOfTurns = 0;
    let i = 0, result = 0;
    while (i < numberOfTurns) {
        let playerChoice = getPlayerChoice(i+1);
        let computerChoice = getComputerChoice();
        console.log(`Player: ${playerChoice}`);
        console.log(`Computer: ${computerChoice}`);

        let roundResult = playRound(playerChoice, computerChoice);
        if (roundResult == 0) {
            console.log('Re-play the round!');
        } else {
            result += roundResult;
            i++;
        }
        console.log('\n');
    }
    if (result < 0) {
        console.log('Game over. Computer win!');
    } else if (result == 0) {
        console.log('TIE!');
    } else {
        console.log('Good game. Player win!');
    }
}


// Starting the rock-paper-scissors game.
// console.log('Starting the game in 3 seconds...');
// setTimeout(game, 3000);



let turnNumber = 5;


// Scripts for selection page.
// (Choosing move for the next turn...)

const selectionPage = document.querySelector("#selection-page");
const turnTitle = document.querySelector("#turn-title");
turnTitle.textContent = "Turn number " + turnNumber;


// Adding event listeners.
const moves = document.querySelectorAll("#selection-choices img");
moves.forEach(function (move) {
    move.addEventListener("click", (e) => {
        const selection = e.target;
        console.log(selection["name"]);

        // Blinking animation.
        selection.style["border-color"] = "#EBF400";
        setTimeout(() => {
            selection.style["border-color"] = "#F57D1F";
            selectionPage.style["display"] = "none";
        }, 500);


    })
})