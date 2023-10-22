interface Cards {
  rank: string;
  suit: string;
}

export const getSymbol = (suit) => {
  let symbol: string;
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

const CardRender = (props: Cards) => {
  return (
    <span className={`card rank-${props.rank} ${props.suit}`}>
      <span className="rank">{props.rank.toUpperCase()}</span>
      <span className="suit">{getSymbol(props.suit)}</span>
    </span>
  );
};

export default CardRender;

