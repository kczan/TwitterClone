
from django.urls import path

from .views import (tweet_detail_view, tweet_list_view, tweet_create_view, 
tweet_delete_view, tweet_action_view, tweet_feed_view)

urlpatterns = [
    path('', tweet_list_view, name='tweets_list'),
    path('action/', tweet_action_view),
    path('create-tweet/', tweet_create_view, name='create_tweet'),
    path('feed/', tweet_feed_view),
    path('<int:tweet_id>/', tweet_detail_view),
    path('<int:tweet_id>/delete/', tweet_delete_view),
]
