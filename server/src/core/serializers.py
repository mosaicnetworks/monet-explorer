"""
Core models serializers
"""

from rest_framework.serializers import ModelSerializer

from .models import Network, Validator, Info


class NetworkSerializer(ModelSerializer):
    """ Network model serializer  """

    class Meta:
        model = Network
        fields = ['id', 'name', 'host', 'port']


class ValidatorSerializer(ModelSerializer):
    """ Validator model serializer """

    network = NetworkSerializer()

    class Meta:
        model = Validator
        fields = ['id', 'moniker', 'host', 'port', 'public_key', 'network']


class InfoSerializer(ModelSerializer):
    """ Info model serializer """

    validator = ValidatorSerializer()

    class Meta:
        model = Info
        fields = [
            'id', 'e_id', 'type', 'state', 'consensus_events',
            'consensus_transactions', 'last_block_index',
            'last_consensus_round', 'last_peer_change',
            'min_gas_price', 'num_peers', 'undetermined_events',
            'transaction_pool', 'sync_rate', 'events_per_second',
            'rounds_per_second', 'validator'
        ]
