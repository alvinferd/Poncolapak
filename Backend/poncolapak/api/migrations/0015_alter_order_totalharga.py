# Generated by Django 3.2.9 on 2021-11-27 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_rename_totalpembelian_order_totalharga'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='totalHarga',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]