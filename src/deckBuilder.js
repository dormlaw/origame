// TODO: добавить split(quantity) метод, который будет создавать количество piles и discards в зависимости от quantity
class DeckBuilder {
  // deck, goals, ...args
  constructor() {
    this.goals = {
      allGoals: {
        first: [],
        second: [],
        third: []
      },
      gameGoals: [],
    };
    this.deck = {
      mainDeck: [],
      piles: [
        [],
        [],
        [],
      ],
      discard: [
        [],
        [],
        [],
      ],
    };
    // createDeck(deck, ...args);
    // createGoals(goals, ...args);
  }

  // TODO: переделать в static и отказаться от this.deck.mainDeck
  createDeck(deck, ...args) {
    const mainDeck = [...deck.main];
    args.forEach(arg => {
      if (deck[arg]) {
        mainDeck.push(...deck[arg]);
      }
    });
    this.deck.mainDeck = mainDeck
    return this;
  };

  // TODO: переделать в static и отказаться от this.goals.allGoals
  createGoals(goals, ...args) {
    Object.keys(goals).forEach(key => {
      const goalLevel = [...goals[key].main];
      args.forEach(arg => {
        if (goals[key][arg]) {
          goalLevel.push(...goals[key][arg]);
        }
      });
      this.goals.allGoals[key] = goalLevel;
    });
    return this;
  };

  // TODO: переписать рандомизацию
  dealGameGoals() {
    let { allGoals, gameGoals } = this.goals;
    gameGoals = [];
    Object.keys(allGoals).forEach(key => {
      const goal = allGoals[key];
      const shuffledGoals = goal.sort(() => Math.random() - 0.5);
      gameGoals.push(shuffledGoals[0]);
    });
    this.goals.gameGoals = gameGoals;
    return gameGoals;
  };

  shuffleDeck() {
    const { mainDeck } = this.deck
    this.deck.piles = [[], [], []];
    this.deck.discard = [[], [], []];
    for (let i = mainDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mainDeck[i], mainDeck[j]] = [mainDeck[j], mainDeck[i]];
    }
    for (let i = 0; i < mainDeck.length; i++) {
      this.deck.piles[i % 3].push(mainDeck[i]);
    }
    return this;
  }

  //TODO: разделить deal и pop на 2 метода
  dealCards() {
    this.deck.piles.forEach((pile, index) => {
      const topCard = pile.pop();
      this.deck.discard[index].push(topCard);
    });

    const pileTopCards = this.deck.piles.map(pile => pile[pile.length - 1]);
    const discardTopCards = this.deck.discard.map(discard => discard[discard.length - 1]);
    return { pileTopCards, discardTopCards };
  };

  shuffleDiscardIntoPiles() {
    for (let i = 0; i < 3; i++) {
      for (let j = this.deck.discard[i].length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [this.deck.discard[i][j], this.deck.discard[i][k]] = [this.deck.discard[i][k], this.deck.discard[i][j]];
      }
      this.deck.piles[i] = this.deck.piles[i].concat(this.deck.discard[i]);
      this.deck.discard[i] = [];
    }
    return this;
  };
}

export default DeckBuilder;