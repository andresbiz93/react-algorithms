from django.urls import path
from . import views

# Just serving the root url. No other routes
urlpatterns = [
    path('', views.index ),
]