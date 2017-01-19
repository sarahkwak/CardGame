# CardGame
Simple Card matching game!
Using javascript and jquery 

Requirements
- The game consists of a regular 52 card deck
- To start a game, the cards are randomly shuffled and placed on a game board
A user can:
- turn cards over
- choose 2 cards per “turn” from the board
- if the card values match (ignoring suit), the cards are removed from the game board
- if not, cards are returned to the game board in their previous positions
- view successfully matched pairs of cards
- can count how many matched pairs they have found
Other requirements
- The cards on the board maintain their initial location on the board when other cards are removed
- Game completes when all pairs have been found

FEATURES
Although a timer isn't a requirement, since it takes long time to match 52 cares, 3-min-timeline is added to see the full GAME OVER effect
If a user clicks the same card twice, it will NOT increase the score 
An user is not allow to click the card before start
An user is not allow to click before all cards turned
The requirement was to match the card value ignoring suit but jack, queen and king need to be matched for suit. I could have make them as 1 but that makes the game too easy to finish.

FUTURE FEATURES
Currently, user isn't allow to click faster than 0.8sec. 
Due to different size of the cards, the card size is fixed as width: 85px;, height: 105px; This makes the the card img being cut-off for the small browser.
More dynamic card turn when user match the card
Two person play feature using web-socket 
![alt tag](https://github.com/sarahkwak/CardGame/blob/master/card_game.png)
