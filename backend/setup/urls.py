from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static # para servir midia
from rest_framework import routers
from nlw.views import OrphanagesViewSet

# routers para métodos da API
router = routers.DefaultRouter()

router.register('nlw/orphanages', OrphanagesViewSet, basename='NLW Orfanatos')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # servindo mídia

# para servir estáticos quando rodar manage.py runserver_ip
if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()