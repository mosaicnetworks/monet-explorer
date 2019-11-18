""" Extractor class - pulls required data from a monet node

monetd: 0.3.3
"""

import json
import requests

from core.models import *


poa_api = "172.31.0.243"


class Extractor:
    """
    Extractor is the core class to pull data from a Monet node to the database
    """

    def __init__(self):
        pass

    def run(self):
        """ Run extractor """
        self.extract_validator_history()
        self.extract_validator_info()
        self.extract_blocks()
        self.extract_poa()

    def extract_poa(self):
        """ Pulls all required POA data """

        for network in self.__get_networks():

            # Whitelist
            whitelist = self.__get(
                path=f'http://{poa_api}:5000/api/whitelist/?host={network.host}&port={network.port}', timeout=20)

            # Nominees
            nominees = self.__get(
                path=f'http://{poa_api}:5000/api/nominees/?host={network.host}&port={network.port}', timeout=20)

            network.whitelist = json.dumps(whitelist)
            network.nominees = json.dumps(nominees)

            network.save()

    def extract_blocks(self):
        """ Pulls all blocks from the node """

        for network in self.__get_networks():

            last_saved_block = Block.objects.filter(
                network=network).order_by('-index').first()

            info = requests.get(
                url=f'http://{network.host}:{network.port}/info').json()

            start = 0
            end = int(info['last_block_index'])

            if last_saved_block:
                start = last_saved_block.index - 20

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
                        if not history:
                            print("something wrong!")
                            return

                        validator = Validator.objects.get(
                            public_key=pub_key, history=history)

                        _, _ = Signature.objects.get_or_create(
                            block=m_block,
                            validator=validator,
                            signature=sig
                        )

                start = start + 50

    def extract_validator_history(self):
        """ Pulls any new validator changes from the node """

        for network in self.__get_networks():
            history = self.__get(
                path=f'http://{network.host}:{network.port}/history')

            if len(history) == ValidatorHistory.objects.filter(network=network).count():
                print("Validator History - Up to Date!")
                return

            for cns_rnd, validators in history.items():
                print(f'Network: {network.name}@{cns_rnd} - {len(validators)}')

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

                    print(f'Create/Save Validator: {moniker}@{cns_rnd}')

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

    def extract_validator_info(self):
        """ Fetch info for current validator set for network """

        for network in self.__get_networks():
            history = ValidatorHistory.objects.filter(
                network=network).order_by('-consensus_round').first()

            if not history:
                print("Could not find latest history")
                return

            for validator in Validator.objects.filter(history=history, network=network):
                print(
                    f'{validator.moniker}@{history.consensus_round} - {validator.host}:8080')

                try:
                    info = self.__get(
                        path=f'http://{validator.host}:8080/info')

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
                        last_cns_round = info['last_consensus_round']

                        if info['last_consensus_round'] == "nil":
                            last_cns_round = 0

                        info_model.e_id = info['id']
                        info_model.type = info['type']
                        info_model.state = info['state']
                        info_model.consensus_events = int(
                            info['consensus_events'])
                        info_model.consensus_transactions = int(
                            info['consensus_transactions'])
                        info_model.last_block_index = int(
                            info['last_block_index'])
                        info_model.last_consensus_round = last_cns_round
                        info_model.last_peer_change = int(
                            info['last_peer_change'])
                        info_model.min_gas_price = int(info['min_gas_price'])
                        info_model.num_peers = int(info['num_peers'])
                        info_model.undetermined_events = int(
                            info['undetermined_events'])
                        info_model.sync_rate = info['sync_rate']
                        info_model.transaction_pool = int(
                            info['transaction_pool'])
                        info_model.rounds_per_second = info['rounds_per_second']
                        info_model.events_per_second = info['events_per_second']

                        info_model.save()

                    validator.reachable = True
                    validator.save()

                except Exception as err:
                    print(err)

                    validator.reachable = False
                    validator.save()

                    print(
                        f'Could not connect to {validator.moniker} - {validator.host}:8080')

    def __get_networks(self):
        """ Returns list of active network """
        return Network.objects.filter(active=True)

    def __get(self, *, path, timeout=5):
        return requests.get(url=path, timeout=timeout).json()


def run():
    """ Initialize and run extractor """

    Extractor().run()
