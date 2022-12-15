// import { func } from "prop-types"
import Deck from "./deck.js"

const CARD_VALUE_MAP={
    "A":14,
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "J":11,
    "Q":12,
    "K":13
}
const computerCardSlot=document.querySelector(".computer-card-slot")
const playerCardSlot=document.querySelector(".player-card-slot")
const computerDeckElement=document.querySelector(".computer-deck")
const playerDeckElement=document.querySelector(".player-deck")
const text=document.querySelector(".text")

let deck=[];
let stop=false;

let playerDeck,computerDeck,inRound;
document.addEventListener('click',()=>{
if(inRound){
    cleanBeforeRound()
}
else{
  flipCards()
}
})


startGame()
function startGame() {
    stop=false;
     deck=new Deck()
    deck.shuffle();
    const deckMidPoint=Math.ceil(deck.cards.length/2)
     playerDeck=new Deck(deck.cards.slice(0,deckMidPoint))
     computerDeck=new Deck(deck.cards.slice(deckMidPoint,deck.numberOfCards))
}
deck.shuffle()
computerCardSlot.appendChild(deck.cards[0].getHtml());

cleanBeforeRound();
function cleanBeforeRound() {
    inRound=false;
    computerCardSlot.innerHTML='';
    playerCardSlot.innerHTML=''
    text.innerText=''
    updateDeckCount();
}

function  flipCards(){
inRound=true;
const playerCard=playerDeck.pop()
const computerCard=computerDeck.pop()
playerCardSlot.appendChild(playerCard.getHtml());
computerCardSlot.appendChild(computerCard.getHtml())
updateDeckCount()
if(isRoundWinner(playerCard,computerCard)){
    text.innerText='win'
    playerDeck.push(computerCard)
    playerDeck.push(playerCard)
    
}
else if(isRoundWinner(computerCard,playerCard)){
    text.innerText='lose'
    computerDeck.push(computerCard)
    computerDeck.push(playerCard)
}
else{
    text.innerText
    playerDeck.push(playerCard)
    computerDeck.push(computerCard)
}
if(isGameOver(playerDeck)){
    text.innerText="you lose"
    stop=true;
}
}
function updateDeckCount(){
    computerDeckElement.innerText=computerDeck.cards.length;
    playerDeckElement.innerText=playerDeck.cards.length;
}


function isRoundWinner(cardOne,cardTwo){
return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]

}

function isGameOver(deck){
    return deck.cards.length===0
}