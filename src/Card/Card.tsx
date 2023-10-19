export interface Cards {
  rank: string;
  suit: string;
}

const Card = (props:Cards) => {
  const getSymbol = (suit) => {
    let symbol:string;
    switch (suit) {
      case 'diams':
        symbol = '♦';
        break;
      case 'hearts':
        symbol = '♥';
        break;
      case 'clubs':
        symbol = '♣';
        break;
      case 'spades':
        symbol = '♠';
        break;
    }
    return symbol;
  };
  return (
    <span className={`card rank-${props.rank} ${props.suit}`}>
      <span className="rank">{props.rank}</span>
      <span className="suit">{getSymbol(props.suit)}</span>
    </span>
  );
};

export default Card;

