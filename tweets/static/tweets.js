const tweetsElement = document.getElementById('tweets');
tweetsElement.innerHTML = 'Loading...';
// AJAX request
url = '/tweets';

async function getData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      tweetsElement.innerHTML = '';
      const jsonResponse = await response.json();
      const tweetsContent = jsonResponse.response;
      tweetsContent.map(tweet => {
        tweetsElement.innerHTML += formatTweet(tweet);
      })
    } else {
    throw new Error('Request Failed!');
    }
  } catch(error) {
    console.log(error);
  }
}

function formatTweet(tweet) {
  return (
    `
    <section class='col-12 mb-4 border'>
    <article>
    <h2 class='mb-4 tweet' id='tweet-${tweet.id}'>${tweet.content}</h2>
    </article>
    <aside class='btn-group'>
    ${likeButton(tweet)}
    </aside>
    </section>
    `);
}

function likeButton(tweet){
  return `<button class='btn btn-primary' onclick=handleDidLike(${tweet.id},${tweet.likes})>Like(${tweet.likes})</button>`
}

function handleDidLike(tweet_id, currentLikes) {
  currentLikes++;
  console.log(currentLikes);
}

getData();