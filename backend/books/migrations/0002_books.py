# Generated by Django 2.2.4 on 2019-08-05 18:30

from django.db import migrations

def create_data(apps, schema_editor):
    Book = apps.get_model('books', 'book')
    Book(title="Book 001", author="Author 001", publication_year="1984", edition="3", image_cover="/media/frame.png", quantity= "23").save()
    Book(title="Book 002", author="Author 002", publication_year="1984", edition="3", image_cover="/media/frame.png", quantity= "21").save()
    Book(title="Book 003", author="Author 003", publication_year="1984", edition="3", image_cover="/media/frame.png", quantity= "10").save()


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
