interface Card {
  rank: string;
  suit: string;
}

const Card = ({rank, suit}) => {
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
    <span className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{getSymbol(suit)}</span>
    </span>
  );
};

export default Card;