import {getSymbol} from '../Card/Card';

interface Suit {
  diams: number;
  hearts: number;
  clubs: number;
  spades: number;
}

interface Subsequence {
  subsequence: number[];
  subsequenceSuit: Suit;
}

interface Combination {
  highCard: string;
  pair: string[];
  subsequence: Subsequence;
  suitCounter: Suit;
}

const findSubsequence = (subsequence: number[]): number[] => {
  let result: number[] = [];
  for (let i = 0; i < subsequence.length; i++) {
    if (subsequence[i] + 1 === subsequence[i + 1]) {
      result.push(subsequence[i]);
    }
  }
  result.push(result[result.length - 1] + 1);
  return result;
};

const bubbleSort = (arr) => {
  let len = arr.length;
  let swapped: boolean;

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
};

class PokerHand {
  public combination: Combination = {
    highCard: '',
    pair: [],
    subsequence: {
      subsequence: [],
      subsequenceSuit: {
        diams: 0,
        hearts: 0,
        clubs: 0,
        spades: 0,
      },
    },
    suitCounter: {
      diams: 0,
      hearts: 0,
      clubs: 0,
      spades: 0,
    },
  };

  constructor(public hand) {
    if (!hand) {
      return;
    }
    const ranks: string[] = [];
    const suits: string[] = [];
    hand.forEach((card) => {
      ranks.push(card.rank);
      suits.push(card.suit);
    });

    this.combination.highCard = this.getHighCard(ranks, suits);
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
    this.getSuits(suits, this.combination.suitCounter);
  }

  getSuits(suits, counter) {
    suits.forEach((suit) => {
      switch (suit) {
        case 'diams':
          counter.diams++;
          break;
        case 'hearts':
          counter.hearts++;
          break;
        case 'clubs':
          counter.clubs++;
          break;
        case 'spades':
          counter.spades++;
          break;
      }
    });
  }

  getSubsequence(ranks, suits) {
    let result: number[];
    let isHaveA = false;
    let indexFromSubsequence: number[] = [];
    let suitsForSubsequence: string[] = [];
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
    result = findSubsequence(subsequence);
    result = findSubsequence(result);
    if (isHaveA && result[0] === 2) {
      result.push(14);
    }
    for (let rank of result) {
      let index: number;
      if (rank > 10) {
        let rankClone: string;
        switch (rank) {
          case 14:
            rankClone = 'a';
            break;
          case 13:
            rankClone = 'k';
            break;
          case 12:
            rankClone = 'q';
            break;
          case 11:
            rankClone = 'j';
            break;
        }
        index = ranks.indexOf(rankClone, 0);
      } else {
        index = ranks.indexOf(rank.toString(), 0);
      }
      indexFromSubsequence.push(index);
    }
    for (let index of indexFromSubsequence) {
      suitsForSubsequence.push(suits[index]);
    }
    this.getSuits(suitsForSubsequence, this.combination.subsequence.subsequenceSuit);
    this.combination.subsequence.subsequence = result;
  }

  getHighCard(ranks, suits) {
    let highCard = {
      rank: 0,
      index: 0,
    };
    ranks.forEach((rank, index) => {
      switch (rank) {
        case 'a':
          if (highCard.rank <= 14) {
            highCard.rank = 14;
            highCard.index = index;
          }
          break;
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
      switch (highCard.rank) {
        case 11:
          return `J ${getSymbol(suits[highCard.index])}`;
        case 12:
          return `Q ${getSymbol(suits[highCard.index])}`;
        case 13:
          return `K ${getSymbol(suits[highCard.index])}`;
        case 14:
          return `A ${getSymbol(suits[highCard.index])}`;
      }
    } else {
      return `${highCard.rank} ${getSymbol(suits[highCard.index])}`;
    }
  }

  getFlash(counter) {
    for (let suit in counter) {
      if (counter[suit] === 5) {
        return true;
      }
    }
    return false;
  }

  getResult(): string {
    let isFlash = this.getFlash(this.combination.suitCounter);
    let isSubsequenceFlash = this.getFlash(this.combination.subsequence.subsequenceSuit);
    if (this.combination.subsequence.subsequence.length >= 5 && this.combination.subsequence.subsequence[0] === 10 && isSubsequenceFlash) {
      return 'Старшая комбинация Роял-флэш';
    } else if (this.combination.subsequence.subsequence.length >= 5 && isSubsequenceFlash) {
      return 'Старшая комбинация Стрит-флэш';
    } else if (this.combination.pair.length >= 4 && (this.combination.pair[0] === this.combination.pair[1] && this.combination.pair[0] === this.combination.pair[2])) {
      return `Старшая комбинация четверка ${this.combination.pair[0].toUpperCase()}`;
    } else if (this.combination.pair.length >= 3 && (this.combination.pair[0] === this.combination.pair[1] || this.combination.pair[0] === this.combination.pair[2])) {
      return 'Старшая комбинация Фулл-хаус';
    } else if (isFlash) {
      return 'Старшая комбинация Флэш';
    } else if (this.combination.subsequence.subsequence.length >= 5) {
      return 'Старшая комбинация Стрит';
    } else if (this.combination.pair.length === 2 && this.combination.pair[0] === this.combination.pair[1]) {
      return `Старшая комбинация тройка ${this.combination.pair[0].toUpperCase()}`;
    } else if (this.combination.pair.length === 2 && this.combination.pair[0] !== this.combination.pair[1]) {
      return `Старшая комбинация две пары ${this.combination.pair[0].toUpperCase()}, ${this.combination.pair[1].toUpperCase()}`;
    } else if (this.combination.pair.length === 1) {
      return `Старшая комбинация пара ${this.combination.pair[0].toUpperCase()}`;
    } else {
      return `Старшая карта ${this.combination.highCard}`;
    }
  }
}

export default PokerHand;
