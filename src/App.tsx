import './App.css';
import Card from './Card/Card';
import {CardDeck} from './lib/CardDeck';
import {useState} from 'react';
import PokerHand from './lib/PokerHand';
import pokerHand from './lib/PokerHand';

function App() {
  const [hand, setHand] = useState([
    {
      rank: "3",
      suit: "diams"
    },
    {
      rank: "a",
      suit: "hearts"
    },
    {
      rank: "5",
      suit: "hearts"
    },
    {
      rank: "2",
      suit: "hearts"
    },
    {
      rank: "4",
      suit: "hearts"
    },
    {
      rank: "j",
      suit: "hearts"
    }
  ]);
  let test = new PokerHand(hand);

  const getCardstoTable = () => {
    const cards = new CardDeck();
    const myHand = cards.getCards();
    const winCombination = new PokerHand(myHand);
    setHand(myHand);
    console.log(myHand)
  };

  const renderCard = () => {
    let table: Card[] = [];
    for (let card of hand) {
      table.push(<Card rank={card.rank} suit={card.suit}/>);
    }
    return table;
  };
  return (
    <div>
      <div className="playingCards">
        {renderCard()}
      </div>
      <button onClick={getCardstoTable}>Раздать карты</button>
    </div>
  );
}

export default App;
