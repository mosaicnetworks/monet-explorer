""" explorer URL Configuration """

from django.urls import path

from . import api

app_name = 'core'

urlpatterns = [
    path('applications/', api.ApplicationListAPIHandler.as_view()),
]
