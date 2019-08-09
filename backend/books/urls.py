# Basic imports
from django.urls import include, path
from rest_framework import routers

# view imports
from . import views

"""
 Register the routes for the Book View.
 To avoid 301 error Trailling_slash is set to false beacuse in the frontend it is omited.
 The basic routes registered are
 GET: /books/, /books/pk
 POST /books
 PUT  /books/pk
 DELETE /books/pk
"""
router = routers.DefaultRouter(trailing_slash=False)
router.register(r'', views.BooksView)

urlpatterns = [
     path(r'', include(router.urls)),
]