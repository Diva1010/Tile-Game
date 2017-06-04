var cols;
var moveIndex =0;
var moveCount = 0;
var seconds = 0, minutes = 0, hours = 0,t;
var h1 ;
    setTimeout(function(){
 h1 = document.getElementById('timer');
    },1000);
 var puzzlepieces = [];

//Function to create puzzlepieces

function puzzle(x,y){
 puzzlepieces = [];
 var finalValue = x * y - 2;
    //input the total number of puzzle Pieces in puzzlepieces array
    for (var i = 0; i <= finalValue; ++i) {
        puzzlepieces.push(i);
    }
    puzzlepieces.push('blank');
    createTilepuzzle(puzzlepieces, x, y);
}
//Function to change the difficulty level of the game
function changeLevel(x, y) {
   puzzle(x,y);
   var e = window.event,
       btn = e.target || e.srcElement;
       if(btn.id == null || btn.id == undefined)
       document.getElementById('difficultyLevel').innerHTML = "Easy";
       else
        document.getElementById('difficultyLevel').innerHTML = btn.id;    
   
    document.getElementById('moves').innerHTML = ""; 
    document.getElementById('moveCount').innerHTML = "";  
    moveCount = 0;    
     
     //create the new tile puzzle
     h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    
   
}

//Function to Randomly shuffle the board 
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ; 
  while (0 !== currentIndex) {
    
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Function to create Sliding Puzzle
function createTilepuzzle(puzzlepieces, x, y) {
    var puzzle = '<div id="slidingpuzzleContainer' + x + 'x' + y + '">';
    cols=x;
    
    puzzlepieces=shuffle(puzzlepieces);
    for (var puzzleNr = 0; puzzleNr < puzzlepieces.length; ++puzzleNr) {
        puzzle += '<img src="images/' + puzzlepieces[puzzleNr] + '.png" class="puzzlepiece" id="position' + puzzlepieces[puzzleNr] + '" alt="' + puzzlepieces[puzzleNr] + '" onclick="shiftPuzzlepieces(this);" width="100" height="100" />';
    }
    puzzle += '</div>';

    displayPuzzle(puzzle);
}

//Function to Display the puzzle on screen
function displayPuzzle(puzzle) {
    document.getElementById('tileContainer').innerHTML = puzzle;
}

//Function called on click of the board tile
function shiftPuzzlepieces(el) {
    var elIndex=0;
    var child=el;
    moveCount++;
    while((child=child.previousSibling)!=null) elIndex++;
    
    
    var blankIndex=0;
    var blank = document.getElementById("positionblank");
    child=blank;
    while((child=child.previousSibling)!=null) blankIndex++;
  
    if((((elIndex==blankIndex-1) || (elIndex==blankIndex+1) )
       && ((Math.floor(elIndex/cols))==(Math.floor(blankIndex/cols)))
       ) || (elIndex==blankIndex+cols) || (elIndex==blankIndex-cols) ){
     var temp = el.parentNode.insertBefore(document.createElement('a'), el);

     //Calculate Element shifted and the row and column of the new position
     var element = parseInt(el.getAttribute('alt'));
     var row = Math.ceil((blankIndex)/3);
     var column = ((blankIndex)%3);
  
    document.getElementById('moves').append('Tile '+(element+1)+ ' : '+ row+','+column);
    document.getElementById('moveCount').innerHTML = (moveCount);
    var br = document.createElement("br");
    document.getElementById('moves').appendChild(br);

    //Swap the blank Tile with the position of the element clicked
    el.parentNode.insertBefore(el, blank);
    el.parentNode.insertBefore(blank, temp);
    el.parentNode.removeChild(temp);
}
if (hasWon()) {
        openModal();
         stop();
    }

}

//Function to Check if User has won the game
function hasWon() {
    var puzzleEl = document.getElementById('tileContainer').children[0];
    var pieces = [].slice.call(puzzleEl.children);
    
    return pieces
    .map(function (piece) {
        return piece.id.substr(8); 
    })
    .every(function (id, index, arr) {
        if (arr.length - 1 == index) {
            return id == "blank"; //check for last element to be blank
        }
        return index == parseInt(id); //check for rest of the elements
    });
}

var overlay = document.getElementById('overlay');

function openModal(){
  overlay.classList.remove("is-hidden");
}

function closeModal(){
  overlay.classList.add("is-hidden");
}   