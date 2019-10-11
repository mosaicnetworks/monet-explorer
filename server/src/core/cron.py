""" Cron tasks related to core models of Monet Explorer """

import requests

from .models import Validator, Network, Info


def fetch_blocks():
    """ 
    Fetch all blocks for a given network. It will also pull new blocks if there
    are any.
    """

    print('Should fetch blocks')


def fetch_validators():
    """
    Fetched validators and inserts them to database. If a validator's moniker
    already exists it will update the correspoinding values.
    """

    for network in Network.objects.all():
        validators = requests.get(
            url=f'http://{network.host}:{network.port}/validators').json()

        for validator in validators:
            splitted = validator['NetAddr'].split(':')

            host = splitted[0]
            port = splitted[1]
            public_key = validator['PubKeyHex']
            moniker = validator['Moniker']

            v_model, created = Validator.objects.get_or_create(
                public_key=public_key,
                network=network,
                defaults={
                    "host": host,
                    "port": port,
                    "moniker": moniker,
                })

            if not created:
                v_model.host = host
                v_model.port = port
                v_model.public_key = public_key

                v_model.save()

            fetch_info(v_model)


def fetch_info(validator):
    """ Fetch infomation about a validators node """

    info = requests.get(url=f'http://{validator.host}:8080/info').json()
    info_model, created = Info.objects.get_or_create(
        validator=validator,
        defaults={
            "e_id": info['id'],
            "type": info['type'],
            "state": info['state'],
            "consensus_events": info['consensus_events'],
            "consensus_transactions": info['consensus_transactions'],
            "last_block_index": info['last_block_index'],
            "last_consensus_round": info['last_consensus_round'],
            "last_peer_change": info['last_peer_change'],
            "min_gas_price": info['min_gas_price'],
            "num_peers": info['num_peers'],
            "undetermined_events": info['undetermined_events'],
            "sync_rate": info['sync_rate'],
            "transaction_pool": info['transaction_pool'],
            "rounds_per_second": info['rounds_per_second'],
            "events_per_second": info['events_per_second'],
        })

    if not created:
        info_model.e_id = info['id']
        info_model.type = info['type']
        info_model.state = info['state']
        info_model.consensus_events = info['consensus_events']
        info_model.consensus_transactions = info['consensus_transactions']
        info_model.last_block_index = info['last_block_index']
        info_model.last_consensus_round = info['last_consensus_round']
        info_model.last_peer_change = info['last_peer_change']
        info_model.min_gas_price = info['min_gas_price']
        info_model.num_peers = info['num_peers']
        info_model.undetermined_events = info['undetermined_events']
        info_model.sync_rate = info['sync_rate']
        info_model.transaction_pool = info['transaction_pool']
        info_model.rounds_per_second = info['rounds_per_second']
        info_model.events_per_second = info['events_per_second']

        info_model.save()

    print(info)
