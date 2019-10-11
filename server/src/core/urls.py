""" explorer URL Configuration """

from django.urls import path

from . import api

app_name = 'core'

urlpatterns = [
    path('networks/', api.NetworkListAPIHandler.as_view()),
]
