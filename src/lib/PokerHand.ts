import {getSymbol} from '../Card/Card';

interface Suit {
  diams: number;
  hearts: number;
  clubs: number;
  spades: number;
}

interface Combination {
  highСard: string;
  pair: string[];
  subsequence: number[];
  suitCounter: Suit;
}

const bubbleSort = (arr) => {
  let len = arr.length;
  let swapped:boolean;

  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

class PokerHand {
  private combination: Combination = {
    highСard: '',
    pair: [],
    subsequence: [],
    suitCounter: {
      diams: 0,
      hearts: 0,
      clubs: 0,
      spades: 0,
    },
  };

  constructor(public hand) {
    const ranks: string[] = [];
    const suits:string[] = [];
    hand.forEach((card) => {
      ranks.push(card.rank);
      suits.push(card.suit);
    });

    this.combination.highСard = this.getHighCard(ranks, suits);
    this.getSubsequence(ranks, suits);
    for (let i = 0; i < ranks.length; i++) {
      let rank = ranks[i];
      for (let j = 0; j < ranks.length; j++) {
        if (rank === ranks[j] && j !== i) {
          this.combination.pair.push(rank);
          ranks.splice(j, 1);
        }
      }
    }

    suits.forEach((suit) => {
      switch (suit) {
        case 'diams':
          this.combination.suitCounter.diams++;
          break;
        case 'hearts':
          this.combination.suitCounter.hearts++;
          break;
        case 'clubs':
          this.combination.suitCounter.clubs++;
          break;
        case 'spades':
          this.combination.suitCounter.spades++;
          break;
      }
    });
    console.log(this.combination.subsequence[0]);
    console.log(this.getResult());
  }

  getSubsequence(ranks, suits) {
    let result: number[] = [];
    let isHaveA = false;
    let subsequence = ranks.map(rank => {
      if (!parseInt(rank)) {
        switch (rank) {
          case 'a':
            isHaveA = true;
            return 14;
          case 'k':
            return 13;
          case 'q':
            return 12;
          case 'j':
            return 11;
        }
      } else {
        return parseInt(rank);
      }
    });
    subsequence = bubbleSort(subsequence);
    for (let i = 0; i < subsequence.length; i++) {
      if (subsequence[i] + 1 === subsequence[i + 1]) {
        result.push(subsequence[i]);
      }
    }
    if (isHaveA && result[0] === 2) {
      result.push(14);
    }
    this.combination.subsequence = result;
  }

  getHighCard(ranks, suits) {
    let highCard = {
      rank: 0,
      index: 0,
    };
    ranks.forEach((rank, index) => {
      switch (rank) {
        case 'a':
          return this.combination.highСard = `${rank} ${getSymbol(suits[index])}`;
        case 'k':
          if (highCard.rank < 13) {
            highCard.rank = 13;
            highCard.index = index;
          }
          break;
        case 'q':
          if (highCard.rank < 12) {
            highCard.rank = 12;
            highCard.index = index;
          }
          break;
        case 'j':
          if (highCard.rank < 11) {
            highCard.rank = 11;
            highCard.index = index;
          }
          break;
        default:
          let current = parseInt(rank);
          if (highCard.rank < 10 && highCard.rank <= current) {
            highCard.rank = current;
            highCard.index = index;
          }
      }
    });

    if (highCard.rank > 10) {
      let result = '';
      switch (highCard.rank) {
        case 11:
          return `J ${getSymbol(suits[highCard.index])}`;
        case 12:
          return `Q ${getSymbol(suits[highCard.index])}`;
        case 13:
          return `K ${getSymbol(suits[highCard.index])}`;
      }
    } else {
      return `${highCard.rank} ${getSymbol(suits[highCard.index])}`;
    }
  }

  getFlash() {
    for (let suit in this.combination.suitCounter) {
      if (this.combination.suitCounter[suit] === 5) {
        return true;
      }
    }
    return false;
  }

  getResult(): string {
    let flash = this.getFlash();
    if (this.combination.subsequence.length >= 4 && this.combination.subsequence[0] === 10 && flash) {
      return 'Старшая комбинация Роял-флэш';
    } else if (this.combination.subsequence.length >= 4 && flash) {
      return 'Старшая комбинация Стрит-флэш';
    } else if (this.combination.pair.length === 3 && (this.combination.pair[0] === this.combination.pair[1] && this.combination.pair[0] === this.combination.pair[2])) {
      return `Старшая комбинация четверка ${this.combination.pair[0].toUpperCase()}`;
    } else if (this.combination.pair.length === 3 && (this.combination.pair[0] === this.combination.pair[1] || this.combination.pair[0] === this.combination.pair[2])){
      return 'Старшая комбинация Фулл-хаус';
    } else if (this.combination.subsequence.length >= 4 && flash) {
      return 'Старшая комбинация Флэш';
    } else if (this.combination.subsequence.length >= 4) {
      return 'Старшая комбинация Стрит';
    } else if (this.combination.pair.length === 2 && this.combination.pair[0] === this.combination.pair[1]) {
      return `Старшая комбинация тройка ${this.combination.pair[0].toUpperCase()}`;
    } else if (this.combination.pair.length === 2 && this.combination.pair[0] !== this.combination.pair[1]) {
      return `Старшая комбинация две пары ${this.combination.pair[0].toUpperCase()}, ${this.combination.pair[1].toUpperCase()}`;
    } else if (this.combination.pair.length === 1) {
      return `Старшая комбинация пара ${this.combination.pair[0].toUpperCase()}`;
    } else {
      return `Старшая карта ${this.combination.highСard}`;
    }
  }
}

export default PokerHand;