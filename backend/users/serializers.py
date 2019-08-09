from rest_framework import serializers
from . import models

# Custom User Serializer
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.CustomUser
		fields = ('email', 'username', )