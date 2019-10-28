""" Cron tasks related to core models of Monet Explorer """

import requests

from .models import *


def fetch_blocks():
    """
    Fetch blocks for a given network. It will also pull new blocks if there
    are any.
    """

    for network in Network.objects.filter(active=True):
        last_saved_block = Block.objects.filter(
            network=network).order_by('-index').first()

        info = requests.get(
            url=f'http://{network.host}:{network.port}/info').json()

        start = 0
        end = int(info['last_block_index'])

        if last_saved_block:
            start = last_saved_block.index - 50

        if start < 0:
            start = 0

        while start <= end:
            print("Fetching blocks: ", start, "/", end)

            new_blocks = requests.get(
                url=f'http://{network.host}:8080/blocks/{start}?count=50').json()

            for block in new_blocks:
                m_block, _ = Block.objects.get_or_create(
                    index=block['Body']['Index'],
                    network=network,
                    defaults={
                        "round_received": block['Body']['RoundReceived'],
                        "state_hash": block['Body']['StateHash'],
                        "peers_hash": block['Body']['PeersHash'],
                        "frame_hash": block['Body']['FrameHash']
                    }
                )

                history = ValidatorHistory.objects.filter(
                    consensus_round__lte=m_block.round_received,
                    network=network
                ).order_by('-consensus_round').first()

                # print("History: ", history.consensus_round, " - Block: ",
                #       m_block.index, " @ ", m_block.round_received)

                for tx_string in block['Body']['Transactions']:
                    _, _ = Transaction.objects.get_or_create(
                        block=m_block,
                        data=tx_string
                    )

                for itx_string in block['Body']['InternalTransactions']:
                    _, _ = InternalTransaction.objects.get_or_create(
                        block=m_block,
                        data=itx_string
                    )

                for itxr_string in block['Body']['InternalTransactionReceipts']:
                    _, _ = InternalTransactionReceipt.objects.get_or_create(
                        block=m_block,
                        data=itxr_string
                    )

                for pub_key, sig in block['Signatures'].items():
                    if m_block.index == 52:
                        print("Block: 52")

                    if not history:
                        print("something wrong!")
                        return

                    validator = Validator.objects.get(
                        public_key=pub_key, history=history)

                    _, created = Signature.objects.get_or_create(
                        block=m_block,
                        validator=validator,
                        signature=sig
                    )

                    if created:
                        print("New Sig ", validator.moniker,
                              " @ ", m_block.index)

            start = start + 50


def fetch_history():
    """
    Fetched validators and inserts them to database. If a validator's moniker
    already exists it will update the correspoinding values.
    """

    for network in Network.objects.filter(active=True):
        history = requests.get(
            url=f'http://{network.host}:{network.port}/history').json()

        if len(history) == ValidatorHistory.objects.filter(network=network).count():
            print("history - Nothing to fetch...")
            return

        for cns_rnd, validators in history.items():
            print(
                f'Network: {network.name} - Round: {cns_rnd} - Validators: {len(validators)}')
            history, _ = ValidatorHistory.objects.get_or_create(
                network=network,
                consensus_round=cns_rnd,
            )

            for validator in validators:
                splitted = validator['NetAddr'].split(':')

                host = splitted[0]
                port = splitted[1]
                public_key = validator['PubKeyHex']
                moniker = validator['Moniker']

                print(
                    f'Creating/Saving Validator: {moniker} - Round: {cns_rnd}')

                v_model, created = Validator.objects.get_or_create(
                    public_key=public_key,
                    network=network,
                    history=history,
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


def fetch_infos():
    """ Fetches info for all active validators """

    for network in Network.objects.filter(active=True):
        history = ValidatorHistory.objects.filter(
            network=network).order_by('-consensus_round').first()

        if not history:
            print("infos - Could not find latest history")
            return

        for validator in Validator.objects.filter(history=history, network=network):
            print(
                f'Validator: {validator.moniker} @ {history.consensus_round} - {validator.host}:8080')
            try:

                info = requests.get(
                    url=f'http://{validator.host}:8080/info', timeout=5).json()

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

                validator.reachable = True
                validator.save()
            except:
                validator.reachable = False
                validator.save()

                print(f'infos - Could not connect to: {validator.moniker}')


def fetch_all():
    """ Fetch all required data """

    print("Fetching History...")
    fetch_history()

    print("Fetching Info...")
    fetch_infos()

    print("Fetching Blocks..")
    fetch_blocks()
