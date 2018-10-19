//
//Blackjack
//by Bruce Wayne
//


//Card Variables
let suits=['Hearts','Clubs', 'Diamonds', 'Spades'];
let values=['Ace', 'King', 'Queen', 'Jack',
			'Ten','Nine', 'Eight', 'Seven', 'Six','Five', 'Four', 'Three', 'Two'];
//DOM Variables
let textArea=document.getElementById("text-area");
let newGameButton=document.getElementById("new-game-button");
let hitButton=document.getElementById("hit-button");
let stayButton=document.getElementById("stay-button");

//Game Variables
let gameStarted=false,
	gameOver=false,
	playerWon=false,
	dealerCards=[],
	playerCards=[],
	dealerScore=0,
	playerScore=0,
	deck=[];
//buttons


hitButton.style.display='none';
stayButton.style.display='none';

//next card
function getNextCard(){
	//alert(3);
	return deck.shift();
}
//new game
newGameButton.addEventListener('click', function(){
	//alert(1);
	gameStarted=true;
	gameOver=false;
	playerWon=false;
	deck=createDeck();
	//alert(JSON.stringify(deck));
	shuffleDeck(deck);
	dealerCards=[getNextCard(), getNextCard()];
	playerCards=[getNextCard(), getNextCard()];
	
	newGameButton.style.display='none';
	hitButton.style.display='inline';
	stayButton.style.display='inline';
	showStatus();
});

//hit button

hitButton.addEventListener('click', function(){
	playerCards.push(getNextCard());
	checkForEndOfGame();
	showStatus();
});

//Stay button


stayButton.addEventListener('click', function(){
	gameOver=true;
	checkForEndOfGame();
	showStatus();
});
//create Deck
function createDeck(){
	let deck=[];
	
	for(let suitIdx=0;suitIdx<suits.length;suitIdx++){
		for(let valueIdx=0;valueIdx<values.length;valueIdx++){
			let card={
				suit: suits[suitIdx],
				value: values[valueIdx]
			};
			deck.push(card);
		}
	}
	return deck;
}

//get card string

function getCardString(card){
	return card.value+ ' of ' +card.suit;
}

// Shuffle Deck

function shuffleDeck(deck){
	//alert(2);
	for(let i=0;i<deck.length;i++){
		
		let swapIdx=Math.trunc(Math.random()*deck.length);
		
		let tmp=deck[swapIdx];
		deck[swapIdx]=deck[i];
		deck[i]=tmp;
	}
	//alert(JSON.stringify(deck));
}
//get card value
function getCardNumericValue(card){
	//alert(8);
	switch(card.value){
		case 'Ace':
			return 1;
		case 'Two':
			return 2;
		case 'Three':
			return 3;
		case 'Four':
			return 4;
		case 'Five':
			return 5;
		case 'Six':
			return 6;
		case 'Seven':
			return 7;
		case 'Eight':
			return 8;
		case 'Nine':
			return 9;
		default:
			return 10;
}
}
//get score
function getScore(cardArray){
	//alert(7)
	let score=0;
	let hasAce=false;
	
	for(let i=0;i<cardArray.length;i++){
		let card=cardArray[i];
		score+=getCardNumericValue(card);
		if(card.value=='Ace'){
			hasAce=true;
		}
	}
	
	if(hasAce && score+10<=21){
		return score+10;
	}
	
	return score;
	
}
//update Scores
function updateScores(){
	//alert(6);
	dealerScore=getScore(dealerCards);
	playerScore=getScore(playerCards);
}

function checkForEndOfGame(){
	updateScores();
	
	if(gameOver){
		//let Dealer take cards
		while(dealerScore < playerScore && playerScore<=21 && dealerScore<=21){
			dealerCards.push(getNextCard());
			updateScores();
		}
	}
	
	if(playerScore>21){
		playerWon=false;
		gameOver=true;
	}
	else if(dealerScore>21){
		playerWon=true;
		gameOver=true;
	}
	
	else if(gameOver){
		
		if(playerScore>dealerScore){
			playerWon=true;
		}
		else{
			playerWon=false;
		}
	}
}


function showStatus(){
	//alert(4);
	if(!gameStarted){
		//alert(5);
		textArea.innerText='Welcome to Blackjack!';
		return;
	}
	
	let dealerCardString='';
	for( let i=0;i<dealerCards.length;i++){
		dealerCardString+=getCardString(dealerCards[i])+'\n';
	}
	
	let playerCardString='';
	for( let i=0;i<playerCards.length;i++){
		playerCardString+=getCardString(playerCards[i])+'\n';
	}
	
	updateScores();
	
	textArea.innerText=
		'Dealer has:\n'+
		dealerCardString+
		'(score: '+ dealerScore+ ')\n\n'+
		
		'Player has:\n'+
		playerCardString+
		'(score: '+playerScore+ ')\n\n';
		
		if(gameOver){
			if(playerWon){
				textArea.innerText+="YOU WIN!";
			}
			else{
				textArea.innerText+="DEALER WINS";
			}
		
		newGameButton.style.display='inline';
		hitButton.style.display='none';
		stayButton.style.display='none';
	}
}
