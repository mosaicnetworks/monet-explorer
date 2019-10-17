""" API endpoints for Monet Explorer """

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
from .serializers import *


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

        cns_round = self.request.query_params.get('round', None)
        if cns_round is not None:
            queryset = queryset.filter(history__consensus_round=cns_round)

        if not cns_round:
            latest_history = ValidatorHistory.objects.order_by(
                '-consensus_round').first()

            if not latest_history:
                return Validator.objects.none()

            queryset = Validator.objects.filter(history=latest_history)

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

        print("NETWORK: ", network)
        return queryset


class BlockListAPIHandler(generics.ListAPIView):
    """
    A ViewSet for listing Blocks
    """

    queryset = Block.objects.order_by('-index')
    serializer_class = BlockSerializer

    def get_queryset(self):
        """ Get query set to be listed by Response """

        queryset = Block.objects.order_by('-index')
        network = self.request.query_params.get('network', None)

        if network is not None:
            queryset = queryset.filter(network__name=network.lower())

        return queryset


class FaucetAPIHandler(generics.CreateAPIView):
    """
    Handles all faucet related api queries
    """

    def post(self, request, *args, **kwargs):
        print("data", request.data)
        return Response(dict())


class ValidatorHistoryAPIHandler(generics.ListAPIView):
    """
    Handles all faucet related api queries
    """
    queryset = ValidatorHistory.objects.all()
    serializer_class = ValidatorHistorySerializer

    def get_queryset(self):
        """ Get query set to be listed by Response """

        queryset = ValidatorHistory.objects.all()
        network = self.request.query_params.get('network', None)

        if network is not None:
            queryset = queryset.filter(network__name=network.lower())

        return queryset
