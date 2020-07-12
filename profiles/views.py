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
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        'bio': user.profile.bio,
        'email': user.email
    }
    form = ProfileForm(request.POST or None,
                       instance=my_profile, initial=user_data)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        bio = form.cleaned_data.get('bio')
        user.first_name = first_name
        user.last_name = last_name
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


def profiles_search_view(request, keyword, *args, **kwargs):
    context = {
        "keyword": keyword
    }
    return render(request, 'profiles/search.html', context=context)
