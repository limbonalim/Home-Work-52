import {Card} from './Card';

export const getCardIndex = (arr, rank, suit): number => {
  let cardIndex: number;
  arr.forEach((card, index) => {
    if (card.rank === rank && card.suit === suit) {
      cardIndex = index;
    }
  });
  return cardIndex;
};

export class CardDeck {
  private runks: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
  private suits: string[] = ['diams', 'hearts', 'clubs', 'spades'];
  public deck: Card[] = [];

  constructor() {
    for (let runk of this.runks) {
      for (let suit of this.suits) {
        let card = new Card(runk, suit);
        this.deck.push(card);
      }
    }
  }

  getCard(): Card {
    let card = Math.floor(Math.random() * this.deck.length);
    let cardClone = new Card(this.deck[card].rank, this.deck[card].suit);
    this.deck.splice(card, 1);
    return cardClone;
  }

  getCards(howMany: number = 5): Card[] {
    let cardsHand: Card[] = [];
    while (cardsHand.length < howMany) {
      let card = this.getCard();
      cardsHand.push(card);
    }
    return cardsHand;
  }

  removeCard(rank, suit) {
    let index = getCardIndex(this.deck, rank, suit);
    if (index) {
      this.deck.splice(index, 1);
    }
  }
}