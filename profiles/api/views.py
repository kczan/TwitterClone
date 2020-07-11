from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from ..models import Profile
from ..serializers import PublicProfileSerializer
from django.contrib.auth import get_user_model

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS
PROFILES_ON_SINGLE_PAGE = 30


def get_paginated_queryset_response(qs, request, *args, **kwargs):
    paginator = PageNumberPagination()
    paginator.page_size = PROFILES_ON_SINGLE_PAGE
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = PublicProfileSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET', 'POST'])
def profile_detail_api_view(request, username, *args, **kwargs):
    query_set = Profile.objects.filter(user__username=username)
    if not query_set.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = query_set.first()

    data = request.data or {}
    if request.method == 'POST':
        current_user = request.user
        action = data.get('action')
        if profile_obj.user != request.user:
            if action == 'follow':
                profile_obj.followers.add(current_user)
            elif action == 'unfollow':
                profile_obj.followers.remove(current_user)
            else:
                pass
    serializer = PublicProfileSerializer(
        instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)


@api_view(['GET', 'POST'])
def profile_search_api_view(request, keyword, *args, **kwargs):

    if keyword is not None:
        query_set = Profile.objects.search(query=keyword)
    print(query_set)
    return get_paginated_queryset_response(query_set, request)
