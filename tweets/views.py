from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.conf import settings

from .models import Tweet
from .forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def home_view(request, *args, **kwargs):
  return render(request, 'home.html', context={})

def tweet_list_view(request, *args, **kwargs):
  query_set = Tweet.objects.all()
  tweets_list = [x.serialize() for x in query_set]
  data = {
    "response": tweets_list
  }

  return JsonResponse(data)

def tweet_create_view(request):
  form = TweetForm(request.POST or None)
  next_url = request.POST.get('next') or None
  print(request.POST, 'asdads')
  print(next_url, 'dupa')
  if form.is_valid:
    obj = form.save(commit=False)
    obj.save()
    if request.is_ajax():
      return JsonResponse(obj.serialize(), status=201)
    if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
      return redirect(next_url)
    form = TweetForm()

  return render(request, 'components/form.html', context={'form': form})

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