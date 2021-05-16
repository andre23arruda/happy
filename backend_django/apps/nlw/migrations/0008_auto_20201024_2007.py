# Generated by Django 3.1 on 2020-10-24 23:07

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('nlw', '0007_auto_20201024_1913'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orphanage',
            old_name='register_date',
            new_name='created_at',
        ),
        migrations.AddField(
            model_name='image',
            name='added_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
