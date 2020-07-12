# Twittur

Twittur is a clone of Twitter. Created using Django, DRF and React.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install dependencies.

```bash
pip install -r requirements.txt
```
or if you're using Python 3
```bash
pip3 install -r requirements.txt
```

## Features
* Like and unlike each tweet
* Follow users you can find by exploring global feed or by searching for specific usernames
* Your feed based on followed users' tweets and your own
* Retweet posts that you identify yourself most with
* Express your thoughts by tweeting as often as you can!

## Usage
Cd into main TwitterClone folder and use command:
```bash
python3 manage.py runserver
```

You can uncomment default sqlite3 database settings in TwitterClone/settings.py and comment out PostgreSQL related settings if you want to.

You can now access the website through http://localhost:8000 using any web browser.

**Docker**
You can deploy the app to the Docker container using provided files.
To launch webapp:
- cd into repository
- run ```docker-compose up -d --build ```
- run ```docker ps ``` to display running containers
- find container id for web container
- run ```docker exec -t -i container_id bash ```
- run migrations and create superuser
- connect website at localhost:8000

**If you want to get the Secret key, please contact me via fchrzan@gmail.com**

## Coming soon
* More mobile styling
* Profile picture upload
* Trending page
* Tags
* Deployment to world wide web

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
