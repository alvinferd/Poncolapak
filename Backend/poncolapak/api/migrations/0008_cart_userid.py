# Generated by Django 3.2.9 on 2021-11-25 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_cart'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='userid',
            field=models.IntegerField(null=True),
        ),
    ]
