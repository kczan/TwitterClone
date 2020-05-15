from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Tweet

# Create your tests here.
User = get_user_model()

class TweetTestCase(TestCase):
  def setUp(self):
    self.user = User.objects.create_user(username='test', password='password')

  def test_tweet_created(self):
    tweet = Tweet.objects.create(content='My tweet', author=self.user)
    self.assertEqual(tweet.id, 1)
    self.assertEqual(tweet.author, self.user)