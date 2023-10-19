import './App.css';
import Card, {Cards} from './Card/Card';
import {CardDeck} from './lib/CardDeck';

const cards = new CardDeck()
const value:Cards = cards.getCard();

function App() {
  return (
    <div className="playingCards">
      <Card rank={value.rank} suit={value.suit}/>
    </div>
  );
}

export default App;
