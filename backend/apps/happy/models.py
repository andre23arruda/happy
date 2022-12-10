from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from django.conf.locale.pt_BR import formats as portuguese
from django.conf.locale.en import formats as english
from django.db import models
from django.utils.translation import gettext_lazy as _

portuguese.DATE_FORMAT = 'd/m/Y'
english.DATE_FORMAT = 'd/m/Y'


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
    is_working = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class OrphanageImage(models.Model):
    '''Model definition for Images'''
    orphanage = models.ForeignKey(Orphanage, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=f'happy/%Y/%m/%d/',)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Image')
        verbose_name_plural = _('Images')

    def __str__(self):
        return f'Image { self.id } - { self.orphanage }'

    def absolute_url(self, request):
        if settings.LOCAL_MEDIA:
            http = request.build_absolute_uri().split('://')[0]
            return f'{ http }://{ get_current_site(request) }{ self.image.url }'
        return self.image.url
