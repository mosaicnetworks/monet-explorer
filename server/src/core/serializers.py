"""
Core models serializers
"""

from rest_framework.serializers import ModelSerializer

from .models import Network, Validator, Info, Block, InternalTransaction


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
            'rounds_per_second', 'validator',
        ]


class BlockSerializer(ModelSerializer):
    """ Block model serializer """

    network = NetworkSerializer()

    class Meta:
        model = Block
        fields = ['id', 'index', 'round_received',
                  'state_hash', 'peers_hash', 'frame_hash', 'network']


class TransactionSerializer(ModelSerializer):
    """ Transaction model serializer """

    block = BlockSerializer()

    class Meta:
        model = Block
        fields = ['id', 'data', 'block']


class InternalTransactionSerializer(ModelSerializer):
    """ Internal Transaction model serializer """

    block = BlockSerializer()

    class Meta:
        model = InternalTransaction
        fields = ['id', 'data', 'block']


class InternalTransactionReceiptSerializer(ModelSerializer):
    """ Internal Transaction Receipt model serializer """

    block = BlockSerializer()

    class Meta:
        model = InternalTransaction
        fields = ['id', 'data', 'block']


class SignatureSerializer(ModelSerializer):
    """ Siganture model serializer """

    block = BlockSerializer()
    validator = ValidatorSerializer()

    class Meta:
        model = InternalTransaction
        fields = ['id', 'signature', 'validator', 'block']
