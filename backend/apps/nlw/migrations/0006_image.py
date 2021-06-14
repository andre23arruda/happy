# Generated by Django 3.1 on 2020-10-24 22:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nlw', '0005_auto_20201024_1755'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path_image', models.ImageField(upload_to='images/<built-in method today of type object at 0x00007FFF22705990>')),
                ('orphanage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='nlw.orphanage')),
            ],
        ),
    ]