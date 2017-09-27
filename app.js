/*
1. start() function starts game on the click of the start button
2. nextLevel() function selects random buttons at an increasingly difficult level
3. storeClicks() function stores user's pattern of clicks in array
4. validate() compares user's moves to AI moves and checks if the user advances to next level or fails
5. If user fails the gameOver() function ends the game and returns game state to original page
6. If it's the last level and player wins call win() function
*/

var playerMoves = [];
var aiMoves = [];
var aiTurn = true;
var playerTurn = false;
var lastLevel = false


  function randomNumber(){
    var num = Math.floor((Math.random() * 5) + 1);
    console.log("Random number is " + num);
    aiMoves.push(num);
    return aiMoves;
  }




  function simulateClick(moves){

    for(var i = 0; i < aiMoves.length; i++) {
        if(aiMoves[i] === 1) {
          $('#green').on('click', function(){
              sound1();
              alert("Green button clicked");
          });
            $('#green').trigger('click');

        }
        else if(aiMoves[i] === 2) {
          $('#red').on('click', function(){
            sound2();
            alert("Red button clicked");
          })
            $('#red').trigger('click');

        }
        else if(aiMoves[i] === 3) {
          $('#yellow').on('click', function(){
            sound3();
            alert("Yellow button clicked");
          })
            $('#yellow').trigger('click');

        }

        else if(aiMoves[i] === 4) {
        $('#blue').on('click', function(){
          sound3();
          alert("Blue button clicked");
        })
          $('#blue').trigger('click');

      }
    }
  }



  function nextLevel(moves){
    // Logic for AI's turn goes here, call storeClicks function and make it the user's turn
    // Number of moves in aiMoves[] increases by 1, push additional element to array
    // After AI goes it's the player's turn
    aiTurn = false;
    playerTurn = true;
    storeClicks(moves);
  }


  function storeClicks(){
   $('.button').each(function() {
     $(this).click(function() {
        playerMoves.push($(this).attr('data-simonButton'));
        //console.log(playerMoves);
        return playerMoves;
      });
    });
  }


  function validate(userMoves, computerMoves){
    // Compare playerMoves array to aiMoves array to see if player advances to next level
    if(playerMoves.length != aiMoves.length){
      aiTurn = true;
      playerTurn = false;
      //console.log("Player moves is not the same length as AI moves");
      //gameOver();
      return false;
    }

    for(var i = 0; i < playerMoves.length; i++) {
      for(var j = 0; j < aiMoves.length; j++){
        // If playerMoves != aiMoves player loses, return false
        if(playerMoves[i] < aiMoves[j] || playerMoves[i] > aiMoves[j]) {
          aiTurn = true;
          playerTurn = false;
          //gameOver();
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


  randomNumber();

  var x = simulateClick(aiMoves);
  alert(x);

  //simulateClick();

  //storeClicks();

  //validate(playerMoves, aiMoves);

  /*if(validate()){
    console.log("Yo motherfucker you just won!");
  }
  */




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
