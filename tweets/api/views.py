from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.conf import settings
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from ..serializers import TweetCreateSerializer, TweetActionSerializer, TweetReadSerializer
from ..models import Tweet
from ..forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
TWEETS_ON_SINGLE_PAGE = 30


def get_paginated_queryset_response(qs, request, *args, **kwargs):
    paginator = PageNumberPagination()
    paginator.page_size = TWEETS_ON_SINGLE_PAGE
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TweetReadSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@login_required(login_url='/login/')
def tweet_create_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        serializer = TweetCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user)
            return Response(serializer.data, status=201)
    else:
        return Response({}, status=403)
    return Response({}, status=400)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    query_set = Tweet.objects.all()
    username = request.GET.get('username')
    if username != None:
        query_set = query_set.by_username(username)
    return get_paginated_queryset_response(query_set, request)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_feed_view(request, *args, **kwargs):
    user = request.user
    # print(user.follower_count)
    # auth_list = user.followed
    # query_set = Tweet.objects.filter(author in)
    # print(Tweet.objects.filter(author=(user or Tweet.author.is_following)))
    query_set = Tweet.objects.feed(user)
    return get_paginated_queryset_response(query_set, request)


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    query_set = Tweet.objects.filter(id=tweet_id)
    if not query_set.exists():
        return Response({}, status=404)
    obj = query_set.first()
    serializer = TweetReadSerializer(obj)
    return Response(serializer.data)


@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    query_set = Tweet.objects.filter(id=tweet_id)
    if not query_set.exists():
        return Response({}, status=404)
    query_set = query_set.filter(author=request.user)
    if not query_set.exists():
        return Response({"message": "You cannot delete this tweet."}, status=401)
    obj = query_set.first()
    obj.delete()
    return Response({"message": "Tweet removed"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    '''
    id is required
    Actions: like, unlike, retweet
    '''
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')
        query_set = Tweet.objects.filter(id=tweet_id)
        if not query_set.exists():
            return Response({}, status=404)
        obj = query_set.first()
        if action == 'like':
            obj.likes.add(request.user)
            serializer = TweetReadSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'unlike':
            obj.likes.remove(request.user)
            serializer = TweetReadSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'retweet':
            new_tweet = Tweet.objects.create(
                author=request.user,
                parent=obj,
                content=content)
            serializer = TweetReadSerializer(new_tweet)
            return Response(serializer.data, status=201)
    return Response({}, status=200)
