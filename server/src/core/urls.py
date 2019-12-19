""" explorer URL Configuration """

from django.urls import path

from . import api

app_name = 'core'

urlpatterns = [
    path('networks/', api.NetworkListAPIHandler.as_view()),
    path('validators/', api.ValidatorListAPIHandler.as_view()),
    path('infos/', api.InfoListAPIHandler.as_view()),
    path('blocks/', api.BlockListAPIHandler.as_view()),
    path('block/<int:pk>/', api.BlockDetailAPIHandler.as_view()),
    path('faucet/', api.FaucetAPIHandler.as_view()),
    path('history/', api.ValidatorHistoryAPIHandler.as_view()),
    path('stats/', api.StatisticsAPIHandler.as_view()),
    path('transactions/', api.TransactionAPIHandler.as_view()),
    path('whitelist/', api.WhitelistAPIHandler.as_view()),
    path('nominees/', api.NomineesAPIHandler.as_view()),
    path('account/<str:address>/', api.AddressAPIHandler.as_view()),
]
