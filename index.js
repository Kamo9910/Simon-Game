buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
userClickedPattern = [];
var level = 1

$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
   userClickedPattern = [];
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColour  = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   var increase_level = level++;
   $("h1").html("Level " + increase_level )
  
};

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
};

function animatePress(currentColor){
   $("#" + currentColor).addClass("pressed");

   setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


$(document).one("keydown",function(event) {
   setTimeout(nextSequence,1000);
});

function checkAnswer(currentLevel){
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
   } 
 } else{
       console.log("Wrong");
       startOver();
       playSound("wrong");
       $("h1").html("Game Over, Press Any Key to Restart");
       $("body").addClass("game-over");
       setTimeout(function(){
       $("body").removeClass("game-over")
      },200);


   }

}

function startOver(){
   gamePattern = [];
   level = 1;
   $(document).one("keydown",function(event) {
   setTimeout(nextSequence,1000);
});
}


