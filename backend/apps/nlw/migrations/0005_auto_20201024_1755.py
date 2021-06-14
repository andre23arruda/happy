# Generated by Django 3.1 on 2020-10-24 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nlw', '0004_orphanage_register_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orphanage',
            name='ativo',
        ),
        migrations.AlterField(
            model_name='orphanage',
            name='open_on_weekends',
            field=models.BooleanField(default=False),
        ),
    ]