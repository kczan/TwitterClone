from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from ..models import Profile
from ..serializers import PublicProfileSerializer
from django.contrib.auth import get_user_model

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def user_follow_view(request, username, *args, **kwargs):
#   current_user = request.user
#   to_follow_user_qs = User.objects.filter(username=username)

#   if current_user.username == username:
#       my_followers = current_user.profile.followers.all()
#       return Response({"count": my_followers.count()}, status=200)

#   if not to_follow_user_qs.exists():
#     return Response({}, status=404)

#   to_follow_user = to_follow_user_qs.first()
#   profile = to_follow_user.profile
#   data = request.data or {}
#   action = data.get('action')


#   if action == 'follow':
#     profile.followers.add(current_user)
#   elif action == 'unfollow':
#     profile.followers.remove(current_user)
#   else:
#     pass
#   data = PublicProfileSerializer(
#       instance=profile, context={"request": request})
#   return Response(data.data, status=200)


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
