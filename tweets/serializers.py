from rest_framework import serializers
from django.conf import settings
from .models import Tweet

TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS

class TweetActionSerializer(serializers.Serializer):
  id = serializers.IntegerField()
  action = serializers.CharField()
  content = serializers.CharField(required=False, allow_blank=True)

  def validate_action(self, value):
    value = value.lower().strip()
    if not value in TWEET_ACTION_OPTIONS:
      raise serializers.ValidationError('This is not a valid action for tweets')
    return value

class TweetCreateSerializer(serializers.ModelSerializer):
  likes = serializers.SerializerMethodField(read_only=True)
  
  class Meta:
    model = Tweet
    fields = ['id', 'content', 'likes']
  
  def get_likes(self, obj):
    return obj.likes.count()

  def validate_content(self, value):
    if len(value) > settings.MAX_TWEET_LENGTH:
      raise serializers.ValidationError('Maximum of 180 characters in one tweet.')
    return value


class TweetReadSerializer(serializers.ModelSerializer):
  likes = serializers.SerializerMethodField(read_only=True)
  og_tweet = TweetCreateSerializer(source='parent', read_only=True)

  class Meta:
    model = Tweet
    fields = ['id', 'content', 'likes', 'is_retweet', 'og_tweet']
  
  def get_likes(self, obj):
    return obj.likes.count()

  def get_content(self, obj):
    content = obj.content
    if obj.is_retweet:
      content = obj.parent.content
    
    return content