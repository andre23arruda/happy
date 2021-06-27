from rest_framework import serializers
from nlw.models import Orphanage, Image

class OrphanageSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    def get_images(self, obj):
        return [ image.url() for image in obj.images.all() ]

    class Meta:
        model = Orphanage
        fields = [
            'id', 'name', 'whatsapp', 'latitude',
            'longitude', 'about', 'instructions',
            'opening_hours', 'open_on_weekends', 'images'
        ]
