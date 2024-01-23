
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
 * @returns {string} User's move
 */
function getPlayerChoice() {
    let outcomes = ['rock', 'paper', 'scissors'];
    let playerInput = prompt('Rock, paper, scissors?').toLowerCase();
    if (outcomes.indexOf(playerInput) >= 0) {
        return playerInput;
    }
}

/**
 * Return 0, -1, 1 based on the result of a rock-paper-scissors turn. Return 0 if
 * the ends with a tie, -1 if the computer wins and 1 the if player wins. 
 * @param {string} playerSelection Move selection of the player
 * @param {string} computerSelection Random move selection from the computer
 * @returns {number} Result of the turn
 */
function playRound(playerSelection, computerSelection) {
    if (playerSelection === 'rock') {
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
    let i = 0, result = 0;
    while (i < numberOfTurns) {
        let playerChoice = getPlayerChoice();
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
game();