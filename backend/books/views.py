from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend 
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Book 
from .serializers import *
from . import serializers
from rest_framework import viewsets


class BooksView(viewsets.ModelViewSet):
    """
    Books Model View set.
    It is protected. Only authenticated user can access
    SearchFilter and DjangoFilterBackend setup.
    Fields for search Filter: title and author
    Fields for filed filter: title and publication year
    For search example: /api/books/?search=mysearch
    for field filter example: /api/boooks/?tittle=it
    """
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'author']
    filter_fields = ['title', 'publication_year']


