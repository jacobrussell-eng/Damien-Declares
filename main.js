// Game variables init:
let cpu = [];
let player = [];
let round = 0;
let playersTurn = false;
let allCorrect;
let iterator;
let highscore = 0; // strech goal: db store?

// Color reference for flashing buttons:
const flashHSLValues = {
    1: "hsl(94, 100%, 70%)", // Green
    2: "hsl(0, 100%, 70%)",  // Red
    3: "hsl(53, 100%, 60%)", // Yellow
    4: "hsl(214, 100%, 65%)" // Blue
};

// HTML element connect:
const buttons = document.querySelectorAll(".quarter");
const scoreDisplay = document.querySelector("#score");
const highscoreDisplay = document.querySelector("#highscore");
const buttonList = {
    1: document.querySelector(".q1"), // Green
    2: document.querySelector(".q2"), // Red
    3: document.querySelector(".q3"), // Yellow
    4: document.querySelector(".q4")  // Blue
};

// Audio file initation:
const soundFX = {
    1: "wavs/green.wav",
    2: "wavs/red.wav",
    3: "wavs/yellow.wav",
    4: "wavs/blue.wav"
};


const bgTrack = new Audio("wavs/AveSatani.wav");
const wrongChoice = new Audio("wavs/gameover.wav");

// Image preloading:
var mutePreload = new Image();
mutePreload.src = "images/mute.png";
var soundPreload = new Image();
soundPreload.src = "images/volume.png";
var damienPreload = new Image();
damienPreload.src = "images/damien.png";

// On Load actions:
window.addEventListener("DOMContentLoaded", () => {
    bgTrack.volume = 0.2;
    bgTrack.play(); // < set to loop? >
    disableButtons(false);
    buttons.forEach(button => { button.addEventListener('click', (event) => buttonPress(event.target))});
    scoreDisplay.innerHTML = "0";
    highscoreDisplay.innerHTML = "0";
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

// Prevent button activity:
function disableButtons(isEnabled) {
    buttons.forEach(button => {
        if (isEnabled) {
            button.classList.remove("disabled");
        } else {
            button.classList.add("disabled");
        }
    });
}

// Display color function:
function displayColors(colorSequence) {
    let colorIndex = 0;

    playersTurn = false;

    // Function to flash a single color:
    const flashColor = () => {
        // If complete, end sequence:
        if (colorIndex >= colorSequence.length) {
            return; 
        }

        // Determine which color to flash:
        let colorId = colorSequence[colorIndex]; // = 1, 2, 3 or 4

        // Flash the color & play sound:
        buttonList[colorId].style.backgroundColor = flashHSLValues[colorId]; // Set the brighter color
        const beep = new Audio(soundFX[colorId]);
        beep.play();

        // Reset the color after 0.5s:
        setTimeout(() => {
            buttonList[colorId].style.backgroundColor = "";
            colorIndex++;
            // Wait 0.1s before flashing the next color
            setTimeout(flashColor, 100); 
        }, 500);
    };

    // Start the flashing sequence:
    flashColor(); 
}


// Button function:
function buttonPress(Quarter) {
    if (!playersTurn) { return; };
    const buttonValue = parseInt(Quarter.dataset.value); 
    console.log("buttonValue: ", buttonValue);
    console.log("cpu[iterator]: ", cpu[iterator]);
    if (buttonValue === cpu[iterator]) {
        const beep = new Audio(soundFX[buttonValue]);
        beep.play();
        allCorrect = true;
        console.log("Correct button");
        console.log("iterator before: ", iterator);
        player.push(buttonValue);
        console.log("Player array in check: ", player);
        iterator++;
        console.log("iterator after: ", iterator);
        // If all colors are matched:
        if (iterator === cpu.length && allCorrect) { 
            console.log("All correct");
            resolveInput(); // Start new round
        } 
    } else {
        wrongChoice.play(); 
        allCorrect = false;
        console.log("Wrong button");
        rejectInput(); // Game over
        return;
    }  
    return;
}

// Player Input handling:
function playerInput() {
    iterator = 0;
    allCorrect = true;
    player = [];
    return new Promise ((resolve, reject) => {
        resolveInput = resolve;
        rejectInput = reject;
    });
}

// Main game code:
async function gameRound() {
    console.log("Round counter (start of gameRound): ", round);
    
    // Disable player activity:
    disableButtons(false);
    playersTurn = false;

    // Generate a new color to store:
    let newColor = Math.floor((Math.random()*4)+1);
    cpu.push(newColor);
    console.log("CPU array after new color: ", cpu);

    // Display each cpu color:
    displayColors(cpu);

    // Player's turn:
    disableButtons(true);
    playersTurn = true;
    await playerInput().then(() => {
        console.log("Resolved");
        round++;
        console.log("Round counter (in .then): ", round);
        player = [];
        iterator = 0;
        // Update score and highscore:
        scoreDisplay.textContent = String(round);
        if (round > highscore) {
            highscore = round;
            highscoreDisplay.textContent = String(highscore);
        }
        // Wait 0.5s before next round:
        setTimeout(gameRound, 750); 
    })
    .catch(() => {
        console.log("Rejected");
        console.log("Player array (in .catch): ", player);
        console.log("CPU array (in .catch): ", cpu);
        disableButtons(false); // Disable at end of game
        const tryAgain = document.querySelector("#playButton");
        tryAgain.innerHTML = "Try Again!";
        return; // escape 
    });
}

function startNewGame() {
    cpu = [];
    player = [];
    scoreDisplay.textContent = String(0);
    round = 0;
    disableButtons(false);
    // Wait 0.35s before starting:
    setTimeout(gameRound, 350); 
}