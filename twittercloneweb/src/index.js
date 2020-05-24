import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TweetsComponent } from './tweets'
import * as serviceWorker from './serviceWorker';

const tweetsElement = document.getElementById('tweets')

const reactElement = React.createElement

if (tweetsElement) {
  const MyTweetsComponent = reactElement(TweetsComponent, tweetsElement.dataset)
  ReactDOM.render(MyTweetsComponent, tweetsElement);
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
