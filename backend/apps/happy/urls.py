from django.urls import path, include
from rest_framework import routers
from .api.viewsets import OrphanagesViewSet

app_name = 'happy'

# router
router = routers.DefaultRouter()
router.register('orphanages', OrphanagesViewSet, basename='Orphanages')


urlpatterns = [
    path('api/happy/', include(router.urls)),
]
