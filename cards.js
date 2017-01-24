var card_value = "2_of_clubs 2_of_diamonds 2_of_hearts 2_of_spades 3_of_clubs 3_of_diamonds 3_of_hearts 3_of_spades 4_of_clubs 4_of_diamonds 4_of_hearts 4_of_spades 5_of_clubs 5_of_diamonds 5_of_hearts 5_of_spades 6_of_clubs 6_of_diamonds 6_of_hearts 6_of_spades 7_of_clubs 7_of_diamonds 7_of_hearts 7_of_spades 8_of_clubs 8_of_diamonds 8_of_hearts 8_of_spades 9_of_clubs 9_of_diamonds 9_of_hearts 9_of_spades 10_of_clubs 10_of_diamonds 10_of_hearts 10_of_spades 1_of_clubs 1_of_diamonds 1_of_hearts 1_of_spades jack_of_clubs jack_of_diamonds jack_of_hearts jack_of_spades king_of_clubs king_of_diamonds king_of_hearts king_of_spades queen_of_clubs queen_of_diamonds queen_of_hearts queen_of_spades"
var card = card_value.split(" ") 

var shuffleCard = function(card) {
	var i = card.length;
	if ( i == 0 ) return false;
	while ( --i ) {
		var j = Math.floor( Math.random() * ( i + 1 ) );
		var tempi = card[i];
		var tempj = card[j];
		card[i] = tempj;
		card[j] = tempi;
	}
	return card
}
var readyCard = function() {
	for (var i= 0; i<52; i++){
		var card_id = 'card_' + i;
		$('.card-container').append("<div id= "+card_id+" ><img onclick=mygame.cardClick("+i+") src='cardpack/back.png'></div>")
	}
}
var thisCard = shuffleCard(card)

function Game(thisCard) {
	this.card = thisCard;
	this.board = readyCard();
	this.score = 0;
	this.flip_count = 0;
}

Game.prototype.startGame = function(){
	$('.card-container div').css("pointer-events", "auto")
  display = document.querySelector('#time');
  this.startTimer(60*3, display);
};

Game.prototype.startTimer = function(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
       gameOver()
       timer = 0;
    } 
  }, 1000);
}

Game.prototype.cardClick = function(id) {
	current_card = thisCard[id]
	if (this.flip_count === 0 ){
		this.flip_count ++
	} else {
		this.flip_count = 0
	}
	this.showCard(current_card, id);
	this.verifyMatching(this.flip_count, current_card, id);
}
Game.prototype.showCard = function(current_card, id) {
	var el = document.getElementById("card_" + id);
  el.firstChild.src = "cardpack/" + current_card + ".png";
}
Game.prototype.verifyMatching = function(flip_count, card, id) {
	if (this.flip_count > 0){
		previous_card = card 
		previous_id = id
	} else {
		if ((previous_card !== card) && (previous_card[0] === card[0])) {
			score ++
			this.updateScore(score);
			this.hideMatchingCard(previous_card, previous_id, card, id)
		} else {
			$('.card-container div').css("pointer-events", "none")
			setTimeout(
				function(){
					mygame.turnBackNonMatchingCard(previous_card, previous_id, card, id)
					$('.card-container div').css("pointer-events", "auto")
				}, 800
			)
		}
	}
	this.gameContinue();
}

Game.prototype.hideMatchingCard = function(card1, card1_id, card2, card2_id) {
	$("#card_" + card1_id).css('visibility', 'hidden').unbind("click")
	$("#card_" + card2_id).css('visibility', 'hidden').unbind("click");
}
Game.prototype.turnBackNonMatchingCard = function(card1, card1_id, card2, card2_id) {
	el1 = document.getElementById("card_" + card1_id)
	el1.firstChild.src = 'cardpack/back.png';
	el2 = document.getElementById("card_" + card2_id)
	el2.firstChild.src = 'cardpack/back.png';
}
Game.prototype.updateScore = function() {
	$('#score').text(score);
}
Game.prototype.gameContinue = function() {
	if (score == 28){
		this.gameOver();
	}
}
Game.prototype.gameOver = function() {
	$(".result").removeClass('hidden');
	$('.card-container div').css("pointer-events", "none")
}

Game.prototype.gameInitializer = function() {
	$(".result").addClass('hidden');
}

$(document).ready(function() {
	mygame = new Game();
	$('.container div').unbind("click")
	$(".start").click(function(){
		mygame.startGame();
	})
})
