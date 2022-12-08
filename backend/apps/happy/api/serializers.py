from rest_framework import serializers
from ..models import Orphanage


class OrphanageSerializer(serializers.ModelSerializer):
    '''Orphanage Serializer '''
    images = serializers.SerializerMethodField()
    def get_images(self, obj):
        request = self.context['request']
        return [ image.absolute_url(request) for image in obj.images.all() ] or None

    class Meta:
        model = Orphanage
        fields = '__all__'
        read_only_fields = ['images']


class OrphanageParser(serializers.ModelSerializer):
    '''Orphanage Serializer '''
    class Meta:
        model = Orphanage
        fields = '__all__'
