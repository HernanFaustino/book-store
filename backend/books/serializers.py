from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
	"""
	Book serializer with the Bookmodel. PK is addded to Serializer
	"""
	class Meta:
		model = Book
		fields = ('pk','title', 'author', 'publication_year', 'edition', 'cover_image', 'quantity')


