from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.conf import settings
from django.contrib.auth.decorators import login_required


ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request, *args, **kwargs):
    context = {
        'profile_username': request.user.username
    }
    return render(request, 'feed.html', context)


def tweets_list_view(request, *args, **kwargs):
    return render(request, 'tweets/list.html')


def tweets_detail_view(request, tweet_id, *args, **kwargs):
    context = {
        "tweet_id": tweet_id
    }
    return render(request, 'tweets/detail.html', context=context)


def trending_view(request, *args, **kwargs):
    return render(request, 'trending.html', context={})
