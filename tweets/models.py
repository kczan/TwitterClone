from django.db import models

# Create your models here.
class Tweet(models.Model):
  content = models.TextField(blank=True, null=True, max_length=180)
  image = models.FileField(upload_to='images/', blank=True, null=True)
  likes = 0

  def serialize(self):
    return {
      "id": self.id,
      "content": self.content,
      "likes": self.likes
    }