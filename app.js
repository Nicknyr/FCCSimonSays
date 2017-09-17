/*
1. start() function starts game on the click of the start button
2. nextLevel() function selects random buttons at an increasingly difficult level
3. storeClicks() function stores user's pattern of clicks in array
4. validate() function checks if the user advances to next level or fails
5. If user fails the gameOver() function ends the game and returns game state to original page
6. If it's the last level and player wins call win() function
*/

var playerMoves = [];
var aiMoves = [];
var aiTurn = true;
var playerTurn = false;

$(document).ready(function(){

  start();

  function start(){
    $('.switch').click(function(){
      nextLevel();
    })
  }

  function nextLevel(){
    // Logic for AI's turn goes here, call storeClicks function and make it the user's turn

    // Number of moves in aiMoves[] increases by 1, push additional element to array

    // After AI goes it's the player's turn
    aiTurn = false;
    playerTurn = true;
    storeClicks();
  }

  function storeClicks(){
   $('.button').each(function(elem) {
     $(this).click(function(e) {
      playerMoves.push($(this).attr('data-simonButton'));
      console.log(playerMoves);
        // Player has made their moves, validate their moves
        //validate(playerMoves);
      });
    });
  }

storeClicks();

  function validate(playerMoves){
    // If player's moves are the same as AI moves player advances to next level, call nextLevel
    nextLevel();
    aiTurn = true;
    playerTurn = false;
      // If it's the last level and player wins call win() function
      win();
    // If player's moves are wrong player loses, call gameOver()
    gameOver();
    aiTurn = true;
    playerTurn = false;
  }

  function win(){
    gameOver();
    //alert('You win!');
    aiTurn = true;
    playerTurn = false;
  }

  function gameOver(){

  }



// Sounds  ********************************************************************/
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
