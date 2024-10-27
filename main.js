// Game variable initation:
let correctOrder = [];
let playerOrder = [];
let counter;
let gameover;
let highscore;

// HTML element initation:
const greenQuarter = document.querySelector(".q1");
const redQuarter = document.querySelector(".q2");
const yellowQuarter = document.querySelector(".q3");
const blueQuarter = document.querySelector(".q4");
const highscoreDisplay = document.querySelector("#highscore");


// Audio file initation:
const bgTrack = new Audio("wavs/AveSatani.wav");
const greenBleep = new Audio("wavs/green.wav");
const redBleep = new Audio("wavs/red.wav");
const yellowBleep = new Audio("wavs/yellow.wav");
const blueBleep = new Audio("wavs/blue.wav");
const wrongChoice = new Audio("wavs/gameover.wav");

// Image preloading:
var mutePreload = new Image();
mutePreload.src = "images/mute.png";
var soundPreload = new Image();
soundPreload.src = "images/volume.png";
var damienPreload = new Image();
damienPreload.src = "images/damien.png";

// On Load actions:
window.addEventListener("DOMContentLoaded", event => {
    bgTrack.volume = 0.2;
    bgTrack.play();
    const scoreDisplay = document.querySelector("#score");
    scoreDisplay.innerHTML = "0";
});

// Background Music button functionality:
function toggleMusic() {
    const musicIcon = document.querySelector("#musicIcon");
    if (musicIcon.src.endsWith("volume.png")) {
        musicIcon.src = mutePreload.src;
        bgTrack.pause();
    } else {
        musicIcon.src = soundPreload.src;
        bgTrack.play();
    }
}

function addToScore() {
    let Bloop = new Audio("wavs/red.wav");
    let currentScore = parseInt(document.getElementById("score").textContent);
    currentScore++;
    Bloop.play();
    document.getElementById("score").textContent = String(currentScore);
}

// Main game code:
function gameSession() {
    gameover = false;
    correctOrder = [];
    playerOrder = [];
    counter = 0;
    while (!gameover) {
        // Generate new color:
        let currentColor = Math.floor((Math.random()*4)+1);
        correctOrder[counter] = currentColor;

        // Displaying colors:
        for (j=0;j<correctOrder.length;j++) {
            setTimeout(function() {
                switch (correctOrder[j]) {
                    case 1:
                        greenQuarter.style.backgroundColor = "hsl(94,100%,100%)";
                        greenBleep.play();
                        break;
                    case 2:
                        redQuarter.style.backgroundColor = "hsl(0,100%,100%)";
                        redBleep.play();
                        break;
                    case 3:
                        yellowQuarter.style.backgroundColor = "hsl(53,100%)";
                        yellowBleep.play();
                        break;
                    case 4:
                        blueQuarter.style.backgroundColor = "hsl(214,100%)";
                        blueBleep.play();
                        break;
                }
            },1000);
        }

        playerOrder = [];
        iterator = 0;

        /* 
            1: Logic to force wait for enough user button presses (while?)
            2: Detect what button is pressed, and add value to playerOrder[]
            3: Check each playerOrder[i] against correctOrder[i]
            4: If incorrect, game over. If correct, next round
            5: Update scores and highscore if necessary
        */

        while (playerOrder.length < correctOrder.length) {
            greenQuarter.addEventListener("click", (event) => {
                playerOrder[iterator] = 1;
                if (playerOrder[iterator] != correctOrder[iterator]) {
                    gameover=true;
                    return;
                    // exit game
                }; 
            });
            redQuarter.addEventListener("click", (event) => {
                playerOrder[iterator] = 2;
            });
            yellowQuarter.addEventListener("click", (event) => {
                playerOrder[iterator] = 3;
            });
            blueQuarter.addEventListener("click", (event) => {
                playerOrder[iterator] = 4;
            });
        
            if (gameover) {
                // game over logic
                // reveal text element that says "game over"
                wrongChoice.play();
                break;
            } else { iterator++ }
        }

        if (gameover) {
            return;
        } else {
            counter++;
            scoreDisplay.textContent = String(counter);
            if (counter > highscore) {
                highscore = counter;
                highscoreDisplay.textContent = String(highscore);
            }
        }
    }
}
