"""TwitterClone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

from tweets.views import (
    tweets_detail_view, tweets_list_view, home_view, trending_view)
from accounts.views import (login_view, logout_view, register_view)
from profiles.views import profiles_search_view, profile_update_view


urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('global', tweets_list_view, name='global'),
    path('<int:tweet_id>', tweets_detail_view),
    path('api/profile/', include('profiles.api.urls')),
    path('profile/', include('profiles.urls')),
    path('search/<str:keyword>', profiles_search_view),
    path('api/tweets/', include('tweets.api.urls')),
    path('react/', TemplateView.as_view(template_name='react.html')),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('update-profile', profile_update_view),
    path('trending', trending_view),


]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
