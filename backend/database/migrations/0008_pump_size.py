# Generated by Django 5.1 on 2024-09-21 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0007_cartitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='pump',
            name='size',
            field=models.CharField(default='L', max_length=1),
        ),
    ]
