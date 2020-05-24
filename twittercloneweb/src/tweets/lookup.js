import {lookup} from '../lookup'


export async function apiCreateTweet(newTweet, callback) {
  lookup('POST', 'tweets/create-tweet/', callback, { content: newTweet })
}

export async function apiTweetAction(tweetID, action, callback) {
  lookup('POST', 'tweets/action/', callback, { id: tweetID, action: action })
}

export async function apiGetTweets(callback) {
  lookup('GET', 'tweets/', callback, [])
}