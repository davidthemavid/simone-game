let colors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userPattern = [];
let scoreboard = [0];
let level = 1;
let started = false;

//sets & removes listener to start the game
document.addEventListener("keydown", function(event) {
  if (!started && event.key === "a") {
    nextSeq();
    started = true;
  } else if (started && event.key !== "a") {
    console.log("Game has already started.");
  } else {
    console.log("WARNING: Follow the on-screen instructions.");
    document.removeEventListener("keydown", function() {});
  }
});

//creates a new color sequence
function nextSeq() {
  userPattern = [];
  let num = Math.round(Math.random() * 3);
  let randomColor = colors[num];
  gamePattern.push(randomColor);
  playSound(randomColor);
  document.getElementById(`${randomColor}`).classList.add("randomColor");
  setTimeout(function() {
    document.getElementById(`${randomColor}`).classList.remove("randomColor");
  }, 400);
  document.getElementById("level-title").innerHTML = "Level " + level++;
}

//creates click listener & animations
let buttons = document.querySelectorAll(".btn");
Array.from(buttons).forEach(button => {
  button.addEventListener("click", function(event) {
    let chosenColor = event.target.id;
    let chosenButton = event.target;
    animate(chosenButton);
    if (started == true) {
      userPattern.push(chosenColor);
      checkAnswer(userPattern.length - 1);
      playSound(chosenColor);
    } else {
      playSound("hal");
    }
  });
});

//contols sounds
function playSound(color) {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

//checks for correct order
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSeq();
      }, 1000);
    }
  } else if (gamePattern[currentLevel] !== userPattern[currentLevel]) {
    let background = document.getElementsByTagName("body")[0];
    let title = document.getElementById("level-title");
    playSound("wrong");
    background.classList.add("game-over");
    title.innerHTML = "Game over, man";
    playSound("game-over");
    setTimeout(function() {
      title.innerHTML = "Press A Key to Start";
      background.classList.remove("game-over");
      restart();
    }, 1550);
  }
}

//controls animations on
function animate(event) {
  let buttonPressed = event;
  buttonPressed.classList.add("pressed");
  setTimeout(function() {
    buttonPressed.classList.remove("pressed");
  }, 100);
}

//sets scoreboard & restarts the game
function restart() {
  let lastScore = level - 1;
  console.log(lastScore);
  scoreboard.push(lastScore);
  console.log(scoreboard);
  let highestScore = Math.max.apply(0, scoreboard);
  document.getElementById("last-score").innerHTML =
    "Previous Level: " + lastScore;
  document.getElementById("highest-score").innerHTML =
    "Highest Level: " + highestScore;
  started = false;
  level = 1;
  gamePattern = [];
  userPattern = [];
}
