from rlp import decode

import requests
import base64

transactions = requests.get(
    'https://dashboard.monet.network/api/transactions/?network=camille-5').json()['results']


for tx in transactions[:1]:
    b64_raw_tx = tx['data']
    raw_tx = base64.b64decode(b64_raw_tx)

    decoded = decode(raw_tx)

    for d in decoded:
        print(d.hex())
