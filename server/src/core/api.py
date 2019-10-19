""" API endpoints for Monet Explorer """
import requests
import json

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from eth_account import Account

from .models import *
from .serializers import *

from ethereum import utils


def checksum_encode(addr):  # Takes a 20-byte binary address as input
    o = ''
    v = utils.big_endian_to_int(utils.sha3(addr.hex()))
    for i, c in enumerate(addr.hex()):
        if c in '0123456789':
            o += c
        else:
            o += c.upper() if (v & (2**(255 - 4*i))) else c.lower()
    return '0x'+o


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
            latest_history = ValidatorHistory.objects.filter(network__name=network.lower()).order_by(
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

        latest_history = ValidatorHistory.objects.filter(network__name=network.lower()).order_by(
            '-consensus_round').first()

        if not latest_history:
            return Info.objects.none()

        queryset = Info.objects.filter(validator__history=latest_history)

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
        f_tx = FaucetTransaction.objects.create(
            address=request.data['address'],
            amount=100
        )

        # submit eth tx here.
        acc = Account.from_key(
            0xb775ba20836e4595aab3689c8b311e32b32d51522da7bb15ae627a25c8d5d829
        )

        tx = dict(
            to=checksum_encode(bytes.fromhex(request.data['address'][2:])),
            value=100000000000000000000,
            chainId=1,
            gas=25000,
            gasPrice=10,
        )

        r = requests.get(
            'http://camille.monet.network:8080/account/' + acc.address)

        tx['nonce'] = r.json()['nonce']

        signed = acc.sign_transaction(tx)
        k = requests.post(
            'http://camille.monet.network:8080/rawtx',
            data=str(signed['rawTransaction'].hex())
        )

        return Response(k.json())


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
