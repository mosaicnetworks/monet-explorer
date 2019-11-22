from rlp import decode
from ethereum.transactions import Transaction

import json
import requests
import base64

transactions = requests.get(
    'https://dashboard.monet.network/api/transactions/?network=camille-5').json()['results']


for tx in transactions:
    b64_raw_tx = '+GSACoMPQkCUq7qruqu6q7qruqu6q7qruqu6q7qAhOHHOSoloJ4ZGxnLkSzz0Cy2hU7aM1rOQ2mAEpt8RUGz0uc2sgdGoGB2Ci//zwjxPYfHrH1NZEDAUJ6dTlIZaVNFPunHVtoJ'
    raw_tx = base64.b64decode(b64_raw_tx)

    tx_obj = decode(raw_tx, Transaction)
    tx = dict(
        sender=tx_obj.sender.hex(),
        to=tx_obj.to.hex(),
        value=tx_obj.value,
        data=tx_obj.data.hex(),
        gas=tx_obj.intrinsic_gas_used,
        gas_price=tx_obj.gasprice,
        nonce=tx_obj.nonce,
    )

    print(json.dumps(tx))
