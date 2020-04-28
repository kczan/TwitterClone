from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render

from .models import Tweet

# Create your views here.

def home_view(request, *args, **kwargs):
  return render(request, 'home.html', context={})

def tweet_list_view(request, *args, **kwargs):
  query_set = Tweet.objects.all()
  tweets_list = [{"id": x.id, "content": x.content, "likes": 0} for x in query_set]
  data = {
    "response": tweets_list
  }

  return JsonResponse(data)

def tweet_detail_view(request, tweet_id):
  data = {
    "id": tweet_id,
    # "img_path": obj.image.url
  }
  status = 200
  try:
    obj = Tweet.objects.get(id=tweet_id)
    data['content'] = obj.content
  except:
    data['message'] = '404 not found'
    status = 404
  
  return JsonResponse(data, status=status)