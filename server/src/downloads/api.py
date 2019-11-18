""" API endpoints for Downloads App """

import requests

from rest_framework import generics

from django.views import View
from django.http import HttpResponseRedirect
from django.http.response import HttpResponse

from .models import Application
from .serializers import ApplicationSerializer


class ApplicationListAPIHandler(generics.ListAPIView):
    """
    A ViewSet for listing Aplications
    """

    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class DownlaoadApplicationView(View):
    """ View for downloading latest versions of Github applications """

    def parse_name(self, os, name):
        """ Get required asset for os """

        mac_prefixes = ['darwin', 'mac', 'apple']
        linux_prefixes = ['linux']
        windows_prefixes = ['windows', 'win', 'exe']

        prefixes = linux_prefixes

        if os == "mac":
            prefixes = mac_prefixes
        if os == "windows":
            prefixes = windows_prefixes

        for prefix in prefixes:
            if prefix in name:
                return True

    def get(self, request, app):
        """ GET request """
        desired_os = request.GET.get('os', None)

        if desired_os is None:
            desired_os = 'linux'

        try:
            url = f'https://api.github.com/repos/mosaicnetworks/{app}/releases/latest'
            req = requests.get(url).json()
            required_asset = {}

            for asset in req['assets']:
                if self.parse_name(desired_os, asset['name']):
                    required_asset = asset

            return HttpResponseRedirect(required_asset['browser_download_url'])
        except KeyError:
            return HttpResponse('Not valid application.')

        return HttpResponse(f'{app} - {desired_os}')
