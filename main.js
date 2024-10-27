let correctOrder = [];
let playerOrder = [];
let counter;
let gameover;

const greenQuarter = document.querySelector(".q1");
const redQuarter = document.querySelector(".q2");
const yellowQuarter = document.querySelector(".q3");
const blueQuarter = document.querySelector(".q4");
const scoreDisplay = document.querySelector("#score");

function addToScore() {
    let Bloop = new Audio("wavs/player_bloop.wav");
    let currentScore = parseInt(document.getElementById("score").value);
    currentScore++;
    Bloop.play();
    document.getElementById("score").value = currentScore;
}

// try scoreDisplay.innerHTML for score updating?

// this function can be made redundant and condensed in later switch
function Chime(color) {
    switch (color) {
        case "green":
            let cBleep = new Audio("wavs/green.wav");
            cBleep.play();
            break;
        case "red":
            let cBleep = new Audio("wavs/red.wav");
            cBleep.play();
            break;
        case "yellow":
            let cBleep = new Audio("wavs/yellow.wav");
            cBleep.play();
            break;
        case "blue":
            let cBleep = new Audio("wavs/blue.wav");
            cBleep.play();
            break;
    }
}


function gameSession() {
    gameover = false;
    correctOrder = [];
    playerOrder = [];
    counter = 0;
    while (!gameover) {
        let currentColor = Math.floor((Math.random()*4)+1);
        correctOrder[counter] = currentColor;
        // Display colors logic here
        for (j=0;j<correctOrder.length;j++) {
            setTimeout(function() {
                switch (correctOrder[j]) {
                    case 1:
                        greenQuarter.style.backgroundColor = "hsl(94,100%,100%)";
                        Chime(green);
                        break;
                    case 2:
                        redQuarter.style.backgroundColor = "hsl(0,100%,100%)";
                        Chime(red);
                        break;
                    case 3:
                        yellowQuarter.style.backgroundColor = "hsl(53,100%)";
                        Chime(yellow);
                        break;
                    case 4:
                        blueQuarter.style.backgroundColor = "hsl(214,100%)";
                        Chime(blue);
                        break;
                }
            },1000);
        }
        playerOrder = [];

        // use a while loop for player turns?
        // Player pressing button logic here
        
        // init iterator
        let playerChoice = parseInt(buttonstuff);
        playerOrder[iterator] = playerChoice;
        
        if (playerOrder.length == correctOrder.length) {
            compareOrders(playerOrder,correctOrder);
        }

        counter++;
    }
}

// to be finished:
function compareOrders(player,correct) {
    for (i=0;i<correct.length;i++) {
        if (player[i] !== correct[i]) {
            gameover = true;
        }
    }
}
