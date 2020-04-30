from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.conf import settings
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from .serializers import TweetSerializer, TweetActionSerializer
from .models import Tweet
from .forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def home_view(request, *args, **kwargs):
  return render(request, 'home.html', context={})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
  serializer = TweetSerializer(data=request.POST )
  if serializer.is_valid(raise_exception=True):
    serializer.save(author=request.user)
    return Response(serializer.data, status=201)
  return Response({}, status=400)

@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
  query_set = Tweet.objects.all()
  serializer = TweetSerializer(query_set, many=True)
  return Response(serializer.data)


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
  query_set = Tweet.objects.filter(id=tweet_id)
  if not query_set.exists():
    return Response({}, status=404)
  obj = query_set.first()
  serializer = TweetSerializer(obj)
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
    query_set = Tweet.objects.filter(id=tweet_id)
    if not query_set.exists():
      return Response({}, status=404)
    obj = query_set.first()
    if action == 'like':
      obj.likes.add(request.user)
      serializer = TweetSerializer(obj)
      return Response(serializer.data, status=200)
    elif action == 'unlike':
      obj.likes.remove(request.user)
    elif action == 'retweet':
      pass
  return Response({}, status=200)
