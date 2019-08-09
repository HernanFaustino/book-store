# standard libraris
from django.urls import include, path
"""
Api urls registration for user, auth, and books aplication
"""
urlpatterns = [
    path('users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('books/', include('books.urls'))
]