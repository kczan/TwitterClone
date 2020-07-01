from django.db import models
from django.db.models import Q
from django.conf import settings


User = settings.AUTH_USER_MODEL

class TweetLike(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
  timestamp = models.DateTimeField(auto_now_add=True)

class TweetQuerySet(models.QuerySet):
  def feed(self, user):
    profiles_exist = user.following.exists()
    followed_users_id = []
    if profiles_exist:
      followed_users_id = user.following.values_list('user__id', flat=True)  # only gets author IDs related to the user

    return self.filter(
      Q(author__id__in=followed_users_id) |
      Q(author=user)
      ).distinct().order_by('-timestamp')

  def by_username(self, username):
    return self.filter(author__username__iexact=username)

class TweetManager(models.Manager):
  def get_queryset(self, *args, **kwargs):
    return TweetQuerySet(self.model, using=self._db)

  def feed(self, user):
    return self.get_queryset().feed(user)

class Tweet(models.Model):
  parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL)
  author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tweet', null=True)
  content = models.TextField(blank=True, null=True)
  image = models.FileField(upload_to='images/', blank=True, null=True)
  likes = models.ManyToManyField(User, related_name='tweet_user', blank=True, through=TweetLike)
  timestamp = models.DateTimeField(auto_now_add=True)


  objects = TweetManager()
  class Meta:
    ordering = ['-id']

  def __str__(self):
    if not self.content:
      return 'EMPTY_TWEET'
    return self.content

  @property
  def is_retweet(self):
    return self.parent != None
  
