import React from 'react';
import './App.css';
import Game from './Game.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Incremental Game</h1>
        <hr></hr>
        <Game />
      </header>
    </div>
  );
}

export default App;
