import Game from './components/Game';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className='title'>Practice Your Card Counting Skills!</div>
        <h3>2-6 → +1, 7-9 → 0, 10-Ace → -1</h3>
      </header>
      <div>
        <Game />
      </div>
    </div>
  );
}

export default App;
