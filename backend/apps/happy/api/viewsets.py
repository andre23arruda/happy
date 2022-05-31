import json
from django.http import QueryDict
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response

from .serializers import OrphanageSerializer
from ..models import Orphanage, OrphanageImage


def create_images(images: list, orphanage: Orphanage):
    '''Create images instances'''
    for image in images:
        OrphanageImage.objects.create(
            orphanage=orphanage,
            image=image
        )

def clean_data(data_dict: dict):
    '''Clean data'''
    data_dict['open_on_weekends'] = json.loads(data_dict.get('open_on_weekends', 'false'))
    data_dict['is_working'] = True
    data_dict.pop('images', None)
    return data_dict


class OrphanagesViewSet(viewsets.ModelViewSet):
    '''API endpoint that allows Orphanages to be viewed or edited'''
    queryset = Orphanage.objects.all()
    serializer_class = OrphanageSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    # Ferramentas de filtragem
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['name']
    search_fields = ['name',]
    filterset_fields = ['open_on_weekends', 'is_working']

    def get_serializer_context(self):
        context = super(OrphanagesViewSet, self).get_serializer_context()
        context.update({'request': self.request})
        return context

    def create(self, serializer):
        '''Create Orphanage'''
        raw_data = serializer.data
        data_dict = {}
        if isinstance(raw_data, QueryDict):
            data_dict = clean_data(raw_data.dict())
            orphanage = Orphanage.objects.create(**data_dict)
            if 'images' in raw_data:
                images_data = raw_data.getlist('images')
                create_images(images_data, orphanage)
        else:
            orphanage = Orphanage.objects.create(**raw_data)
        return Response(data_dict or raw_data, status=status.HTTP_200_OK)
