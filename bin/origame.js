import { DISTRICT_DECK, DISTRICT_GOALS } from '../assets/districtCards.js'
import DeckBuilder from "../src/deckBuilder.js";

const deck = new DeckBuilder(DISTRICT_DECK, DISTRICT_GOALS, 'stars')
deck.createDeck(DISTRICT_DECK, 'stars')
  .createGoals(DISTRICT_GOALS, 'stars')
  .shuffleDeck();

console.log(deck);
console.log(deck.dealGameGoals());
console.log(deck.dealCards());