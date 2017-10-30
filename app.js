/*
1. start() function starts game on the click of the start button
2. nextLevel() function selects random buttons at an increasingly difficult level
3. storeClicks() function stores user's pattern of clicks in array
4. validate() compares user's moves to AI moves and checks if the user advances to next level or fails
5. If user fails the gameOver() function ends the game and returns game state to original page
6. If it's the last level and player wins call win() function
*/
var playerMoves = [];
var aiMoves = [1,2,3];
var playerTurn = false;
var lastLevel = false;
var level = 0;

function randomNumber() {
    var num = Math.floor((Math.random() * 4) + 1);
    aiMoves.push(num);
    return aiMoves;
}

// loop over the array using the iteratee function
// at the specified interval
function intervalForEach(array, iteratee, delay) {
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
    if (move === 1) {
        sound1();
        $('#green').addClass('active')
        setTimeout(() => {
            $('#green').removeClass('active')
        }, 1000)
    } else if (move === 2) {
        sound2();
        $('#red').addClass('active')
        setTimeout(() => {
            $('#red').removeClass('active')
        }, 1000)
    } else if (move === 3) {
        sound3();
        $('#yellow').addClass('active')
        setTimeout(() => {
            $('#yellow').removeClass('active')
        }, 1000)
    } else if (move === 4) {
        sound4();
        $('#blue').addClass('active')
        setTimeout(() => {
            $('#blue').removeClass('active')
        }, 1000)
    }
    playerTurn = true;
}


function storeClicks() {
    $('.button').each(function() {
        $(this).click(function() {
            playerMoves.push($(this).attr('data-simonButton'));
            console.log("Player moves: " + playerMoves);
            if(playerMoves.length === aiMoves.length){
              validate(playerMoves, aiMoves);
            }
        });
    });
}


function convert(moves){
  moves.split(',').map(function(i){
    return parseInt(i, 10);
  })
}


function runNextLevel(){
  randomNumber();
  intervalForEach(aiMoves, handleMove, 1000);
  playerTurn = true;
}

// runNextLevel runs before checking ALL the elements of the array. Runs after the first iteration. arr.Prototype.every can fix this I think
function validate(userMoves, computerMoves) {

    var compare = //userMoves.length == computerMoves.length &&
                  userMoves.every(function(element, index){
                    return element == computerMoves[index];
                  });

    if(compare){
      console.log("You win");
      alert("Arrays are the same");
      runNextLevel();
    }
    else {
      console.log("You lose");
      alert("Arrays are not the same");
    }
}


function win() {
    alert('You win!');
    aiTurn = true;
    playerTurn = false;
}

function gameOver() {
    alert('You lose');
    aiTurn = true;
    playerTurn = false;
}


// Sounds  ********************************************************************/
function sound1() {
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
    audio.play();
}

function sound2() {
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
    audio.play();
}

function sound3() {
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
    audio.play();
}

function sound4() {
    var audio = new Audio();
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
    audio.play();
}



$(document).ready(function() {



    runNextLevel();
    storeClicks();

    console.log(playerMoves);
    console.log(aiMoves);



    $('#green').click(function() {
        sound1();
    })

    $('#red').click(function() {
        sound2();
    })

    $('#yellow').click(function() {
        sound3();
    })

    $('#blue').click(function() {
        sound4();
    })

});
