function inputProcessing(playerOrder, correctOrder, iterator, gameover, allTrue, playersTurn) {
    new Promise (resolve => {

        // Attach Event listeners:
        const buttons = document.querySelectorAll(".quarter");
        buttons.forEach(button => { button.addEventListener('click', (event) => buttonPress(event.target, correctOrder, playerOrder, iterator, gameover, allTrue, playersTurn)) });

        function buttonPress(Quarter, cpuArray, playerArray, iterator, gameover, allTrue, playersTurn) {
            if (playersTurn) {
                const buttonClassValue = parseIntQuarter.classList[1].slice(1);
                if (buttonClassValue === cpuArray[iterator]) {
                    playerArray[iterator] = buttonClassValue;
                    iterator++;
                } else {
                    gameover = true;
                    allTrue = false;
                    wrongChoice.play(); // declare within this file?
                    const tryAgain = document.querySelector("#playButton");
                    tryAgain.innerHTML = "Try Again!";
                    // Remove Event listeners:
                    buttons.forEach(button => { button.removeEventListener('click', (event) => buttonPress(event.target, correctOrder, playerOrder, iterator, gameover, allTrue, playersTurn)) });
                }  

                if (playerOrder.length === correctOrder.length && allTrue) {
                    // Remove Event listeners:
                    buttons.forEach(button => { button.removeEventListener('click', (event) => buttonPress(event.target, correctOrder, playerOrder, iterator, gameover, allTrue, playersTurn)) });
                    resolve();
                }
            }
        }
    })
}


// Starting fresh:

// Game variables init:
let cpu = [];
let player = [];
let round = 0;
let playersTurn = false;
let allCorrect;
let iterator;
let highscore; // strech goal: db store?

// HTML element connect:
const highscoreDisplay = document.querySelector("#highscore");

function playerInput() {
    iterator = 0;
    allCorrect = true;
    return new Promise ((resolve, reject) => {
        const buttons = document.querySelectorAll(".quarter");
        buttons.forEach(button => { button.addEventListener('click', (event) => {
            if (playersTurn) {
                // if correct --> resolve (new round) & remove listeners
                // if incorrect --> reject (game over) & remove listeners
                const Quarter = event.target;
                const buttonClassValue = parseInt(Quarter.classList[1].slice(1)); 
                if (buttonClassValue === cpu[iterator]) {
                    player[iterator] = buttonClassValue;
                    iterator++;
                } else {
                    wrongChoice.play(); 
                    allCorrect = false;
                    // Remove Event listeners:
                    buttons.forEach(button => { button.removeEventListener('click') });
                    reject();
                }  

                if (player.length === cpu.length && allCorrect) {
                    // Remove Event listeners:
                    buttons.forEach(button => { button.removeEventListener('click') });
                    resolve();
                }
            }
        })});
    })
}

async function gameRound() {
    playersTurn = false;
    player = [];

    // generate color:
    let newColor = Math.floor((Math.random()*4)+1);
    cpu[round] = newColor;

    // display each cpu color:
    displayColors(cpu);

    // player turn:
    await playerInput().then(() => {
        round++;
        // update score and highscore(?)
        gameRound();
    }).catch(() => {
        round = 0;
        cpu = [];
        // set text = "Try Again!":
        const tryAgain = document.querySelector("#playButton");
        tryAgain.innerHTML = "Try Again!";
        return; // escape 
    });

}
