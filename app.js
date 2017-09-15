/*
1. Start() function starts game on the click of the start button
2. NextLevel() function selects random buttons at an increasingly difficult level
3. storeClicks() function stores user's pattern of clicks in array
4. Validate() function checks if the user advances to next level or fails
5. If user fails the GameOver function ends the game and returns game state to original page

*/


var i = [];

$(document).ready(function(){

  function storeClicks(){
   $('.button').each(function(elem) {
     $(this).click(function(e) {
      i.push($(this).val());
        console.log(i);
      });
    });
  }

  storeClicks();







  function sound1(){
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
    audio.play();
  }

  function sound2(){
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
    audio.play();
  }

  function sound3(){
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
    audio.play();
  }

  function sound4(){
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
    audio.play();
  }

  $('#green').click(function(){
    sound1();
  })

  $('#red').click(function(){
    sound2();
  })

  $('#yellow').click(function(){
    sound3();
  })

  $('#blue').click(function(){
    sound4();
  })

});
