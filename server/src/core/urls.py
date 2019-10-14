""" explorer URL Configuration """

from django.urls import path

from . import api

app_name = 'core'

urlpatterns = [
    path('networks/', api.NetworkListAPIHandler.as_view()),
    path('validators/', api.ValidatorListAPIHandler.as_view()),
    path('infos/', api.InfoListAPIHandler.as_view()),
    path('blocks/', api.BlockListAPIHandler.as_view()),
]
