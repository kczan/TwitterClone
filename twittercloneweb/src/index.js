import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ProfileBadgeComponent } from "./profiles";
import {
  TweetsComponent,
  TweetDetailComponent,
  TweetsListFeed,
  FeedComponent,
} from "./tweets";
import * as serviceWorker from "./serviceWorker";

const tweetsElement = document.getElementById("tweets");

const reactElement = React.createElement;

if (tweetsElement) {
  const MyTweetsComponent = reactElement(
    TweetsComponent,
    tweetsElement.dataset
  );
  ReactDOM.render(MyTweetsComponent, tweetsElement);
}

const tweetsFeedElement = document.getElementById("tweets-feed");
if (tweetsFeedElement) {
  const MyFeedComponent = reactElement(
    FeedComponent,
    tweetsFeedElement.dataset
  );
  ReactDOM.render(MyFeedComponent, tweetsFeedElement);
}

const tweetDetailElement = document.querySelectorAll(".tweet-detail");

tweetDetailElement.forEach((container) => {
  const MyTweetDetailComponent = reactElement(
    TweetDetailComponent,
    container.dataset
  );
  ReactDOM.render(MyTweetDetailComponent, container);
});

const userProfileBadgeElement = document.querySelectorAll(
  ".tweet-profile-badge"
);

userProfileBadgeElement.forEach((container) => {
  const MyProfileBadgeComponent = reactElement(
    ProfileBadgeComponent,
    container.dataset
  );
  ReactDOM.render(MyProfileBadgeComponent, container);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
