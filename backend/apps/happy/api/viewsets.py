import json
from django.forms.models import model_to_dict
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response

from .serializers import OrphanageSerializer, OrphanageParser
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
        request_data = serializer.data
        data = OrphanageParser(request_data).data
        orphanage = Orphanage.objects.create(**data)
        if 'images' in request_data:
            images = request_data.getlist('images')
            create_images(images, orphanage)
        response_data = OrphanageParser(orphanage).data
        return Response(response_data)

    # def create(self, serializer):
    #     '''Create Orphanage'''
    #     images = self.request.FILES.getlist('images')
    #     data = serializer.data
    #     post = self.request.POST
    #     if post:
    #         data = OrphanageParser(post).data
    #     orphanage = Orphanage.objects.create(**data)
    #     create_images(images, orphanage)
    #     response_serializer = OrphanageParser(orphanage)
    #     return Response(response_serializer.data)
