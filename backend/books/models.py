from django.db import models
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator

def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)

# Create your models here.
class Book(models.Model):
    title = models.CharField("Title", max_length=255)
    author = models.CharField("Author", max_length=255)
    publication_year = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(500), max_value_current_year])
    edition = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    cover_image = models.FileField(blank=True)
    quantity = models.IntegerField(default=0)

    def _str_(self):
        return self.title
