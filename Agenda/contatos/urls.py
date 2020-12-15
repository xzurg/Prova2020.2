from django.urls import path
from .views import RegisterView, LoginView, current_user

urlpatterns = [
    path('register/',RegisterView.as_view()),
    path('login/',LoginView.as_view()),
    path('current_user/',current_user),
]