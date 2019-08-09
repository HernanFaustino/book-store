from django.db import models
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator

def current_year():
    """
    Return the current Year which will be used as a max validatior for the year entry
    """
    return datetime.date.today().year


def max_value_current_year(value):
    """
    Return Max value Validator
    """
    return MaxValueValidator(current_year())(value)


class Book(models.Model):
    """
    Book Model which contains the following fields:
    title: The book's titile. Is a ChartField
    author: The book's autor. Is a ChartField
    publication_year: The book's publication year. This cuold be sice 500 until current year
    edition: Book's edition. Thera are version like 1.3, solo it will be Decimal
    cover_image: The cover image. It will be a fiel, it is optional
    quaantity: The numbers of available books. The default is zero.
    """
    title = models.CharField("Title", max_length=255)
    author = models.CharField("Author", max_length=255)
    publication_year = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(500), max_value_current_year])
    edition = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    cover_image = models.FileField(blank=True)
    quantity = models.IntegerField(default=0)

    def _str_(self):
        return self.title
