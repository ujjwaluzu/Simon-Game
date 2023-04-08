var colorButton = ["red","green","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSeq();
        started = true;
    }
});


function handler(){
    $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

    });
}
handler();


function nextSeq(){
  userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumebr = Math.floor(Math.random()*4);
    var choosenColor = colorButton[randomNumebr];
    gamePattern.push(choosenColor);
    $("#"+choosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(choosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

 function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
       console.log("Success!");
       if (userClickedPattern.length === gamePattern.length) {
        setTimeout (function() {
           nextSeq();
         }, 1000);
       }

     }else {
       var wrong  = new Audio("sounds/wrong.mp3");
       wrong.play();
       $("body").addClass("game-over");
       setTimeout(function(){
          $("body").removeClass("game-over");
       },200)
       $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
   }

 }

 function startOver(){
  level = 0;
  gamePattern = [];
  started  = false;
 }
