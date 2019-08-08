from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser 
from . import serializers


# Create your views here.
class UserListView(generics.ListCreateAPIView):
	queryset = CustomUser.objects.all()
	serializer_class = serializers.UserSerializer