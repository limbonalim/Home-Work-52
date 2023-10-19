import './App.css';
import Card from './Card/Card';
import {CardDeck} from './lib/CardDeck';
import {useState} from 'react';

function App() {
  const [hand, setHand] = useState([]);
  const getCardstoTable = () => {
    const cards = new CardDeck();
    const myHand = cards.getCards();
    setHand(myHand);
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
