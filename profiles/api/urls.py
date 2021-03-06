
from django.urls import path

from .views import profile_detail_api_view, profile_search_api_view

# base endpoint is '/api/profile'

urlpatterns = [
    path('<str:username>/follow', profile_detail_api_view),
    path('<str:username>', profile_detail_api_view),
    path('search/<str:keyword>', profile_search_api_view),
]
