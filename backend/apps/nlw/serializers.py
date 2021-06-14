from rest_framework import serializers
from nlw.models import Orphanage, Image

class OrphanageSerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Orphanage
        fields = [
            'id', 'name', 'created_at', 'latitude',
            'longitude', 'about', 'instructions',
            'opening_hours', 'open_on_weekends', 'images' ]

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        orphanage = Orphanage.objects.create(**validated_data)

        files = request.FILES
        print(files)
        if files:
            try:
                for f in files.getlist('images'):
                    image_object = Image.objects.create(path_image=f, orphanage=orphanage)
                    image_object.save()
            except Exception as e:
                print(e)
        else:
            orphanage.save()
        return orphanage

    def validate(self, data):
        return data


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

    def validate(self, data):
        return data