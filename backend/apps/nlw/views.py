from django.forms.models import model_to_dict
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response

from nlw.serializers import OrphanageSerializer
from nlw.models import Orphanage, OrphanageImage


def create_images(images_data, orphanage):
    '''Create images instances and return list of created instances'''
    for image in images_data:
        OrphanageImage.objects.create(
            orphanage=orphanage,
            image=image)

def clean_data(data_dict):
    '''Clean data'''
    data_dict['open_on_weekends'] = True if data_dict.get('open_on_weekends') else False
    data_dict['is_working'] = True if data_dict.get('is_working') else False
    data_dict.pop('images', None)
    data_dict.pop('csrfmiddlewaretoken', None)
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
        data = serializer.data
        data_dict = clean_data(data.dict())
        orphanage = Orphanage.objects.create(**data_dict)
        images_data = data.getlist('images')
        create_images(images_data, orphanage)
        return Response(model_to_dict(orphanage), status=status.HTTP_200_OK)
