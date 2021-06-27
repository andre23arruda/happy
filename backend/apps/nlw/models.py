from django.conf import settings
from django.db import models
from datetime import date


class Image(models.Model):
    '''Model definition for Images'''
    image = models.ImageField(upload_to=f'images/%Y/%m/%d/',)
    added_at = models.DateTimeField(auto_now_add=True)

    def url(self):
        if self.image:
            return f'{ settings.BASE_URL }{ self.image.url }'
        return ''


class Orphanage(models.Model):
    '''Model definition for Orphanages'''
    created_at = models.DateField(auto_now_add=True)
    name = models.CharField(max_length=100)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    whatsapp = models.CharField(max_length=12, blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)
    opening_hours = models.CharField(max_length=100, blank=True, null=True)
    open_on_weekends = models.BooleanField(default=False)
    images = models.ManyToManyField(Image, related_name='images', blank=True, null=True)
    is_working = models.BooleanField(default=True)

    def __str__(self):
        return self.name
