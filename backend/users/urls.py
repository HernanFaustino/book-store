from django.urls import include, path
from . import views

# URL for CustomUSer view
urlpatterns = [
    path('', views.UserListView.as_view()),
]