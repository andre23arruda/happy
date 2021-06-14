from rest_framework import viewsets, filters
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend # ferramenta para filtrar info na API
from nlw.serializers import OrphanageSerializer, ImageSerializer
from nlw.models import Orphanage, Image

class OrphanagesViewSet(viewsets.ModelViewSet):
    '''Lista de orfanatos'''
    queryset = Orphanage.objects.all()
    serializer_class = OrphanageSerializer

    # Ferramentas de filtragem
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['name']
    search_fields = ['name',]
    filterset_fields = ['open_on_weekends',]


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def perform_create(self, serializer):
        obj = serializer.save()
        for f in self.request.data.getlist('files'):
            img = Image.objects.create(file=f)
            obj.files.add(img)
