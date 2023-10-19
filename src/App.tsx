import './App.css';
import Card, {Cards} from './Card/Card';

const value:Cards = {
  rank: '3',
  suit: 'hearts',
}

function App() {
  return (
    <div className="playingCards">
      <Card rank={value.rank} suit={value.suit}/>
    </div>
  );
}

export default App;
