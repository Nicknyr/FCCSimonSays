/*
1. start() function starts game on the click of the start button
2. nextLevel() function selects random buttons at an increasingly difficult level
3. storeClicks() function stores user's pattern of clicks in array
4. validate() compares user's moves to AI moves and checks if the user advances to next level or fails
5. If user fails the gameOver() function ends the game and returns game state to original page
6. If it's the last level and player wins call win() function
*/

var playerMoves = [];
var aiMoves = [1];
var aiTurn = true;
var playerTurn = false;
var lastLevel = false;

  function randomNumber(){
    var num = Math.floor((Math.random() * 4) + 1);
    console.log("Random number is " + num);
    aiMoves.push(num);
    return aiMoves;
  }

  // loop over the array using the iteratee function
  // at the specified interval
  function intervalForEach (array, iteratee, delay) {
    let current = 0

    let interval = setInterval(() => {
      if (current === array.length) {
        clearInterval(interval)
      } else {
        iteratee(array[current])
        current++
      }
    }, delay)
  }

  // this will be applied to each item in the array
  function handleMove(move) {
    if(move === 1) {
      sound1();
      $('#green').addClass('active')
      setTimeout(() => {
        $('#green').removeClass('active')
      }, 1000)
    }
    else if(move === 2) {
      sound2();
      $('#red').addClass('active')
      setTimeout(() => {
        $('#red').removeClass('active')
      }, 1000)
    }
    else if(move === 3) {
      sound3();
      $('#yellow').addClass('active')
      setTimeout(() => {
        $('#yellow').removeClass('active')
      }, 1000)
    }
    else if(move === 4) {
      sound4();
      $('#blue').addClass('active')
      setTimeout(() => {
        $('#blue').removeClass('active')
      }, 1000)
    }
    playerTurn = true;
  }


  function storeClicks(){
   $('.button').each(function() {
     $(this).click(function() {
        playerMoves.push($(this).attr('data-simonButton'));
        console.log("Player moves: " + playerMoves);
        return playerMoves;
      });
    });
  }


  function validate(userMoves, computerMoves){
    // Compare playerMoves array to aiMoves array to see if player advances to next level
    if(playerMoves.length != aiMoves.length){
      aiTurn = true;
      playerTurn = false;
      console.log("Player moves is not the same length as AI moves");
      gameOver();
      return false;
    }

    for(var i = 0; i < playerMoves.length; i++) {
      for(var j = 0; j < aiMoves.length; j++){
        // If playerMoves != aiMoves player loses, return false
        if(playerMoves[i] < aiMoves[j] || playerMoves[i] > aiMoves[j]) {
          aiTurn = true;
          playerTurn = false;
          gameOver();
          return false;
        }
        // If playersMoves === aiMoves advance to next level
        else {
          aiTurn = true;
          playerTurn = false;
          // If this is already the last level player has beaten the game
          if(lastLevel){
            win();
          }
          else {
            nextLevel();
            console.log("Correct moves!")
          }
          return true;
        }
      }
    }
  }


  function win(){
    gameOver();
    alert('You win!');
    aiTurn = true;
    playerTurn = false;
  }

  function gameOver(){
    alert('You lose');
    aiTurn = true;
    playerTurn = false;
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



$(document).ready(function(){

  playerTurn = false;
  if(playerTurn === false){
    randomNumber();
    intervalForEach(aiMoves, handleMove, 1000);
    playerTurn = true;
  }


  if(playerTurn = true){
    storeClicks();
  }

  if(playerMoves.length === aiMoves.length){
    validate(aiMoves, playerMoves);
    playerTurn = false;
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
