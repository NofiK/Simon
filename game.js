
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = true;

var level = 0;


$(document).on("keypress", function (e) {
    if (started === true) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = false;
 }
});

$(".btn").click(function(event) {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

var gamePatternLast = gamePattern[currentLevel];
var gameUserLastChoise = userClickedPattern[currentLevel] ;

if (gamePatternLast === gameUserLastChoise) {
  if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
  }
} else {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  var wrong = $("body");
  wrong.addClass('game-over');
  setTimeout(function() {
      wrong.removeClass('game-over');
  }, 150);

  $("#level-title").text("Game Over, Press Any Key to Restart");

 startOver();
}

}


function nextSequence() {
  level++;

  $("#level-title").text("Level " + level);

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var activeColour = document.querySelector("." + currentColour);
  activeColour.classList.add("pressed");
  setTimeout(function(){activeColour.classList.remove("pressed")}, 100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}
