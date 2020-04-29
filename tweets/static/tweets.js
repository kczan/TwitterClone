const tweetsElement = document.getElementById('tweets');
const tweetCreateForm = document.getElementById('tweet-create-form');
const alertBar = document.getElementById('alert-bar');
tweetsElement.innerHTML = 'Loading...';

home_url = '/tweets';

// AJAX requests

async function getData(url) {
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

function postFormData(url, data) {  // try to convert that into async/await fetch
  event.preventDefault()
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json';
  xhr.open('POST', url)
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  xhr.onload = function () {
    if (xhr.status === 201) {
      if (alertBar.classList.contains('alert-danger')) {
        alertBar.classList.remove('alert-danger')
        alertBar.innerHTML = ''
      }
      const newTweetJson = xhr.response
      const newTweetElement = formatTweet(newTweetJson);
      const originalHtml = tweetsElement.innerHTML;
      tweetsElement.innerHTML = newTweetElement + originalHtml;
    } else if (xhr.status === 400) {
      const errorJson = xhr.response.content
      alertBar.classList.add('alert-danger');
      alertBar.innerHTML = errorJson
    }
  }
  xhr.onerror = () => {
    alert('An error occured. Please contact the dev team.')
  }
  xhr.send(data)
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
}

function handleTweetSubmitForm(e) {
  e.preventDefault();
  const myForm = e.target;
  const myFormData = new FormData(myForm);
  const endpoint = myForm.getAttribute('action');
  postFormData(endpoint, myFormData);
  myForm.reset();
}

tweetCreateForm.addEventListener('submit', handleTweetSubmitForm)

getData(home_url);