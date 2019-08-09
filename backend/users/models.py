from django.db import models
from django.contrib.auth.models import AbstractUser

#Custom User Model,

class CustomUser(AbstractUser):
	""""
	Custom User without aditional Fields, but necesary for futter customizations
	"""
	def _str_(self):
		return self.email