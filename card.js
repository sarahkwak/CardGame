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
	for (var i= 0; i<53; i++){
		var card_id = 'card_' + i;
		$('.card-container').append("<div id= "+card_id+" ><img onclick=cardClick("+i+") src='cardpack/back.png'></div>")
	}
}

var score = 0;
var flip_count = 0;
var thisCard = shuffleCard(card);

var startGame = function() {
	$('.card-container div').css("pointer-events", "auto")
  display = document.querySelector('#time');
  startTimer(60*3, display);
}

function startTimer(duration, display) {
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


var cardClick = function(id) {
	current_card = thisCard[id]
	console.log(thisCard[51]);
	console.log(flip_count)
	console.log("CURRENT CARD IS  " + current_card + id)
	if (flip_count === 0 ){
		flip_count ++
	} else {
		flip_count = 0
	}
	showCard(current_card, id);
	verifyMatching(flip_count, current_card, id);
}
var showCard = function(current_card, id) {
	var el = document.getElementById("card_" + id);
  el.firstChild.src = "cardpack/"+current_card + ".png";
  el.style.height = '105px'
}
var verifyMatching = function(flip_count, card, id) {
	if (flip_count > 0){
		previous_card = card 
		previous_id = id
	} else {
		if ((previous_card !== card) && (previous_card[0] === card[0])) {
			score ++
			updateScore(score);
			changeMatchingCard(previous_card, previous_id, card, id)
		}else {
			setTimeout(
				function(){
					turnBackNonMatchingCard(previous_card, previous_id, card, id)
				}, 800
			)
		}
	}
	gameContinue();
}

var changeMatchingCard = function(card1, card1_id, card2, card2_id) {
	$("#card_" + card1_id).css('visibility', 'hidden').unbind("click")
	$("#card_" + card2_id).css('visibility', 'hidden').unbind("click");
}
var turnBackNonMatchingCard = function(card1, card1_id, card2, card2_id) {
	el1 = document.getElementById("card_" + card1_id)
	el2 = document.getElementById("card_" + card2_id)
	el1.firstChild.src = 'cardpack/back.png';
	el2.firstChild.src = 'cardpack/back.png';
}
var updateScore = function() {
	$('#score').text(score);
}
var gameContinue = function() {
	if (score == 28){
		gameOver();
	}
}
var gameOver = function() {
	$(".result").removeClass('hidden');
}

var gameInitializer = function() {
	$(".result").addClass('hidden');
}

$(document).ready(function() {
	readyCard();
	$('.container div').unbind("click")
	$(".start").click(function(){
		console.log("START GAME")
		startGame();
	})
})
