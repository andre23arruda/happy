from django.contrib import admin
from .models import Orphanage, OrphanageImage


@admin.register(Orphanage)
class OrphanageRegister(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'open_on_weekends')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    list_editable = ('open_on_weekends',)
    list_per_page = 25
    ordering = ('name',)


@admin.register(OrphanageImage)
class OrphanageImageRegister(admin.ModelAdmin):
    list_display = ('id', 'added_at')
    list_display_links = ('id',)
    list_per_page = 25
