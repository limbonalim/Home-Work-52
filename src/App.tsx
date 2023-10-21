import './App.css';
import CardRender from './CardRender/CardRender';
import {CardDeck} from './lib/CardDeck';
import {useState} from 'react';
import PokerHand from './lib/PokerHand';
import Combination from './Combination/Combination';

function App() {
  const [hand, setHand] = useState([]);
  const [combination, setCombination] = useState('');
  const getCardsToTable = () => {
    const cards = new CardDeck();
    const myHand = cards.getCards();
    const winCombination = new PokerHand(myHand);
    setHand(myHand);
    setCombination(winCombination.getResult());
  };


  const renderCard = () => {
    let table: CardRender[] = [];
    for (let card of hand) {
      table.push(<CardRender rank={card.rank} suit={card.suit}/>);
    }
    return table;
  };
  return (
    <div>
      <div className="playingCards">
        {renderCard()}
      </div>
      <Combination combinationInfo={combination}/>
      <button onClick={getCardsToTable}>Раздать карты</button>
    </div>
  );
}

export default App;
