import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TweetsComponent, TweetDetailComponent } from './tweets'
import * as serviceWorker from './serviceWorker';

const tweetsElement = document.getElementById('tweets')

const reactElement = React.createElement

if (tweetsElement) {
  const MyTweetsComponent = reactElement(TweetsComponent, tweetsElement.dataset)
  ReactDOM.render(MyTweetsComponent, tweetsElement);
}

const tweetDetailElement = document.querySelectorAll('.tweet-detail')

tweetDetailElement.forEach(container => {
  const MyTweetDetailComponent = reactElement(TweetDetailComponent, container.dataset)
  ReactDOM.render(MyTweetDetailComponent, container);
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
