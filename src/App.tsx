import './App.css';
import CardRender from './CardRender/CardRender';
import {CardDeck, getCardIndex} from './lib/CardDeck';
import {useState} from 'react';
import PokerHand from './lib/PokerHand';
import Combination from './Combination/Combination';
import {Card} from './lib/Card';

const App = () => {
  const [hand, setHand] = useState([]);
  const [combination, setCombination] = useState('');
  const cardsDeckClone = new CardDeck();
  const getCardsToTable = () => {
    const cards = new CardDeck();
    const myHand = cards.getCards();
    const winCombination = new PokerHand(myHand);
    setHand(myHand);
    setCombination(winCombination.getResult());
  };

  const removeCard = (rank, suit) => {
    hand.forEach(card => cardsDeckClone.removeCard(card.rank, card.suit));
    let cardIndex = getCardIndex(hand, rank, suit);
    hand.splice(cardIndex, 1);
  };

  const changeCard = () => {
    if (hand) {
      let currentHand:Card[] = hand.map(card => {
        return {...card}
      });
      const howMany = 5 - currentHand.length;
      let cards = cardsDeckClone.getCards(howMany);
      cards.forEach(card => currentHand.push(card));
      const winCombination = new PokerHand(currentHand);
      setHand(currentHand);
      setCombination(winCombination.getResult());
      const inputs = document.querySelectorAll('input');
      for (let input of inputs) {
        input.checked = false;
      }
    }
  };

  const renderCard = () => {
    let table: CardRender[] = [];
    for (let card of hand) {
      table.push(<span key={table.length}><input type="checkbox"
                                                 onClick={() => removeCard(card.rank, card.suit)}/><CardRender
        rank={card.rank} suit={card.suit}/></span>);
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
      <button onClick={changeCard}>Поменять карты</button>
    </div>
  );
};

export default App;
