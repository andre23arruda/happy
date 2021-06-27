from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from nlw.serializers import OrphanageSerializer
from nlw.models import Orphanage, Image


def create_images(images):
    '''Create images instances and return list of created instances'''
    obj_list = []
    for image in images:
        obj = Image.objects.create(image=image)
        obj_list.append(obj)
    return obj_list


class OrphanagesViewSet(viewsets.ModelViewSet):
    '''API endpoint that allows Orphanages to be viewed or edited'''
    queryset = Orphanage.objects.all()
    serializer_class = OrphanageSerializer
    parser_classes = [MultiPartParser, FormParser]

    # Ferramentas de filtragem
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['name']
    search_fields = ['name',]
    filterset_fields = ['open_on_weekends', 'is_working']

    def create(self, serializer):
        '''Create Orphanage'''
        data = serializer.data
        data_dict = data.dict()
        data_dict['open_on_weekends'] = True if 'true' in data_dict['open_on_weekends'] else False

        data_dict.pop('images', None)
        csrf = data_dict.pop('csrfmiddlewaretoken', None)

        images =  None if not 'images' in data else create_images(data.getlist('images'))

        orphanage = Orphanage.objects.create(**data_dict)
        if images: orphanage.images.set(images)
        created_orphanage = {
            'id': orphanage.id,
            **data_dict
        }
        return Response(created_orphanage, status=status.HTTP_200_OK)
        return Response({'detail': 'Forbidden operation'}, status=status.HTTP_401_UNAUTHORIZED)