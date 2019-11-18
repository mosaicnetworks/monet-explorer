""" explorer URL Configuration """

from django.urls import path

from . import api

app_name = 'core'

urlpatterns = [
    path('applications/', api.ApplicationListAPIHandler.as_view()),
    path('applications/<str:app>/', api.DownlaoadApplicationView.as_view()),
]

# Example path for downloading latest executables
# Should default to linux but can specify OS
# https://dashboard.monet.networ/downloads/applications/monetd?os=linux|windows|mac
