// N grid version
var whosTurn = 1; // start off on player 1's turn

var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
var winners = [];
var gridSize = 5;

// a0, a1, a2, a3, a4...aN
// b0, b1, b2, b3, b4...bN

var diag1 = [];
var diag2 = [];

// 1. build a winners array
for (var i = 0; i < gridSize; i++){
	diag1.push(alph[i] + (gridSize-i)); // diag1
	diag2.push(alph[i] + i); // diag 2
	var winnersInsideH = [];
	var winnersInsideV = [];
	for (var j = 0; j < gridSize; j++){
		// vertical winners
		winnersInsideV.push(alph[j] + i);
		// horizontal winners
		winnersInsideH.push(alph[i] + j);
	}
	winners.push(winnersInsideV);
	winners.push(winnersInsideH);
}
winners.push(diag1);
winners.push(diag2);


// 2. we need to populate the board

var player1 = []; // array where we will stash the squares player1 has checked
var player2 = []; // array for player2
var someoneWon = false;

function markSquare(square){
	if (someoneWon){
		console.log("Someone already won"); // edit this to display in message area
	}
	// check to see if this square is in either player array. if so, goodbye
	else if ((player1.indexOf(square.id) == -1) // look in player1 array for this square
		&& (player2.indexOf(square.id) == -1)){ // look in player2 array for this square
		// if both are -1, then it's in neither array
		if (whosTurn == 1){
			square.innerHTML = 'X';
			whosTurn = 2;
			player1.push(square.id);
			checkWin(player1,1);
		}else{
			square.innerHTML = 'O';
			whosTurn = 1;
			player2.push(square.id);
			checkWin(player2,2);
		}
		console.dir(player1);
	}else{
		console.log("Something's already there!! No cheating!!");
	}
}

function checkWin(currentPlayersSquares, whoJustMarked){
	var rowCount = 0;
	// loop through the outer array
	for(var i = 0; i < winners.length; i++){
		//loop through each inner array
		rowCount = 0;
		for(var j = 0; j < winners[i].length; j++){
			if(currentPlayersSquares.indexOf(winners[i][j]) > -1){
				// HIT
				rowCount++;
			}
			if(rowCount == 3){
				// bingo
				gameOver(whoJustMarked, winners[i]);
			}
		}
	}
}

function gameOver(whoWon, winningCombo){
	document.getElementById('message');
	message.innerHTML = "Congratulations, player " + whoWon + "! You won with " + winningCombo.join(', ');
	for (var i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winner'; // adds 'winner' class to 
	}
	someoneWon = true;
}

function reset(){
	whosTurn = 1; // reset turn-detection variable
	player1 = []; // reset player1 array
	player2 = []; // reset player2 array
	someoneWon = false; // reset win-detection variable
	document.getElementById('message').innerHTML = "";
	for (var i = 0; i < buttonArr.length; i++){ // loop through button resetting text to '-' and class name to 'box'
		if ((buttonArr[i].textContent == 'X') || (buttonArr[i].textContent == 'O')){
			buttonArr[i].innerHTML = "-";
			buttonArr[i].className = 'box';
		}
	}
}

function compTurn(){ // stupid; ERRORS - 1. can choose chosen square, 2. no strategy, 3. if chooses chosen square, players swap symbols
	var randNum = Math.floor(((Math.random() * 9) + 1));
	var compChoice = buttonArr[randNum];
	markSquare(compChoice);
}

function compTurnSmart(){

}