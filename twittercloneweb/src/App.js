import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { TweetsList } from './tweets'



function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <TweetsList />
        </div>
          
      </header>
    </div>
  );
}





export default App;
