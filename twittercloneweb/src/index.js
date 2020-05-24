import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TweetsComponent } from './tweets'
import * as serviceWorker from './serviceWorker';

const appElement = document.getElementById('tweets')

if (appElement) {
  ReactDOM.render(
    <React.StrictMode>
      <TweetsComponent />
    </React.StrictMode>,
    appElement
  );
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
