from django.shortcuts import render, redirect
from django.http import Http404

from .forms import ProfileForm
from .models import Profile

# Create your views here.

def profile_detail_view(request, username, *args, **kwargs):
  query_set = Profile.objects.filter(user__username=username)
  if not query_set.exists():
    raise Http404

  profile_obj = query_set.first()
  context = {
    "profile_username": username,
    "profile": profile_obj
  }

  return render(request, 'profiles/detail.html', context)


def profile_update_view(request, *args, **kwargs):
  user = request.user

  if not user.is_authenticated:
    return redirect('/login?next=/profile/update')

  my_profile = user.profile
  form = ProfileForm(request.POST or None, instance=my_profile)
  print('profil updat wiu')
  if form.is_valid():
    profile_obj = form.save(commit=False)
    name = form.cleaned_data.get('name')
    email = form.cleaned_data.get('email')
    bio = form.cleaned_data.get('bio')
    user.name = name
    user.email = email
    user.bio = bio
    user.save()
    profile_obj.save()
  context = {
    "form": form,
    "title": "Update profile",
    "btn_label": "Update"
  }
  return render(request, 'profiles/form.html', context)
