from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient


from .models import Profile
# Create your tests here.
User = get_user_model()

class ProfileTestCase(TestCase):
  def setUp(self):
    self.user = User.objects.create_user(username='filip', password='asdasddsa')
    self.userb = User.objects.create_user(username='filip2', password='asdasddsa')

  def get_client(self):
    client = APIClient()
    client.login(username=self.user.username, password='asdasddsa')
    return client

  def test_profile_created(self):
    qs = Profile.objects.all()
    self.assertEqual(qs.count(), 2)

  def test_following(self):
    user_a = self.user
    user_b = self.userb

    user_a.profile.followers.add(user_b) # follower added
    qs = user_b.following.filter(user=user_a) # check if user in followed
    self.assertTrue(qs.exists())

  def test_follow_api_endpoint(self):
    client = self.get_client()
    response = client.post(
      f"/api/profile/{self.userb.username}/follow",
      {"action": "follow"}
    )
    r_data = response.json()
    count = r_data.get("count")
    self.assertEqual(count, 1)

  def test_unfollow_api_endpoint(self):
    user_a = self.user
    user_b = self.userb
    user_a.profile.followers.add(user_b)
    client = self.get_client()
    response = client.post(
      f"/api/profile/{self.userb.username}/follow",
      {"action": "unfollow"}
    )
    r_data = response.json()
    count = r_data.get("count")
    self.assertEqual(count, 0)

  def test_cannot_follow_api_endpoint(self):
    client = self.get_client()
    response = client.post(
      f"/api/profile/{self.user.username}/follow",
      {"action": "follow"}
    )
    r_data = response.json()
    count = r_data.get("count")
    self.assertEqual(count, 0)
