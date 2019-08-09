from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser 
from . import serializers
from rest_framework.response import Response


# View for Custom User using the generic ListCreateAPIView.
class UserListView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = serializers.UserSerializer(queryset, many=True)
        return Response({'users': serializer.data})