""" API endpoints for Monet Explorer """

from rest_framework import generics

from .models import Network, Validator, Info
from .serializers import NetworkSerializer, ValidatorSerializer, InfoSerializer


class NetworkListAPIHandler(generics.ListAPIView):
    """
    A ViewSet for listing Networks
    """

    queryset = Network.objects.all()
    serializer_class = NetworkSerializer


class ValidatorListAPIHandler(generics.ListAPIView):
    """
    A ViewSet for listing Validators
    """

    queryset = Validator.objects.all()
    serializer_class = ValidatorSerializer

    def get_queryset(self):
        """ Get query set to be listed by Response """

        queryset = Validator.objects.all()
        network = self.request.query_params.get('network', None)

        if network is not None:
            queryset = queryset.filter(network__name=network.lower())

        return queryset


class InfoListAPIHandler(generics.ListAPIView):
    """
    A ViewSet for listing Info
    """

    queryset = Info.objects.all()
    serializer_class = InfoSerializer

    def get_queryset(self):
        """ Get query set to be listed by Response """

        queryset = Info.objects.all()
        network = self.request.query_params.get('network', None)

        if network is not None:
            queryset = queryset.filter(
                validator__network__name=network.lower())

        return queryset
