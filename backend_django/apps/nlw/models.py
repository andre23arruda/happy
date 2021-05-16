from django.db import models
from datetime import date

class Orphanage(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateField(auto_now_add=True)
    latitude = models.FloatField(blank=True, null= True)
    longitude = models.FloatField(blank=True, null= True)
    about = models.TextField(blank=True, null= True)
    instructions = models.TextField(blank=True, null= True)
    opening_hours = models.CharField(max_length=100, blank=True, null= True)
    open_on_weekends = models.BooleanField(default=False)
    # working = models.BooleanField(blank=True, null= True)

    def __str__(self):
        return self.name


class Image(models.Model):
    '''Model definition for Images.'''
    orphanage = models.ForeignKey('Orphanage', related_name='images', on_delete=models.CASCADE)
    path_image = models.ImageField(upload_to=f'images/%Y/%m/%d/',)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.path_image:
            # return f'http://127.0.0.1:8000{ self.path_image.url }'
            return f'http://192.168.0.12:8000{ self.path_image.url }' # rota do meu pc na rede
        return ''
