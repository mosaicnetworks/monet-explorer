""" explorer URL Configuration """

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('core.urls', namespace='core')),
    path('api/downloads/', include('downloads.urls', namespace='application')),
    path('admin/', admin.site.urls),
]
