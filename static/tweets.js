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
      console.log(tweetsContent);
      tweetsContent.map(tweet => {
        tweetsElement.innerHTML += `<h2 class='mb-4'>${tweet.content}</h2>`;
      })
    } else {
    throw new Error('Request Failed!');
    }
  } catch(error) {
    console.log(error);
  }
}

getData();