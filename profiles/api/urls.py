
from django.urls import path

from .views import user_follow_view

# base endpoint is '/api/profile'

urlpatterns = [
    path('<str:username>/follow', user_follow_view)
]
