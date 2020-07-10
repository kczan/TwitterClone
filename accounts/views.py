from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout

# Create your views here.


def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user = form.get_user()
        login(request, user)
        return redirect('/')
    context = {
        "form": form,
        "title": 'Log in',
        "btn_label": 'Log in',
        "register": False,
        "login": True
    }
    return render(request, 'accounts/auth.html', context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        new_user = form.save()
        login(request, new_user)
        return redirect('/')
    context = {
        "form": form,
        "title": 'Register',
        "btn_label": 'Register',
        "register": True,
        "login": False
    }
    return render(request, 'accounts/auth.html', context)


def logout_view(request, *args, **kwargs):
    if request.method == 'POST':
        logout(request)
        return redirect('/')
    context = {
        "form": None,
        "title": 'Logout?',
        "btn_label": 'Logout'
    }
    return render(request, 'accounts/auth.html', context)
