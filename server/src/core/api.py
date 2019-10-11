""" API endpoints for Monet Explorer """

from rest_framework import generics

from .models import Network, Validator
from .serializers import NetworkSerializer, ValidatorSerializer


class NetworkListAPIHandler(generics.ListAPIView):
    """
    A simple ViewSet for listing Networks
    """

    queryset = Network.objects.all()
    serializer_class = NetworkSerializer
