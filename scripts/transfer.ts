import { Babble } from 'evm-lite-consensus';
import { AbstractKeystore } from 'evm-lite-keystore';

import Node, { Account } from 'evm-lite-core';

import { HOST, PORT } from './const';

const makeMonet = () => {
	const b = new Babble(HOST, PORT);

	return new Node(HOST, PORT, b);
};

// Account with funds
const keyfile = {
	version: 3,
	id: '74c8013f-a54d-4384-bc8e-ea74fcd0feed',
	address: '829f09b312a7d2a196a888932cb9eef80bf0865c',
	crypto: {
		ciphertext:
			'7a3733457fb8a7469b80124a7de045ac81644e9463314ba0fd0429009cacf7f2',
		cipherparams: { iv: 'a184c5ab925cd2c75404463c6d837c5b' },
		cipher: 'aes-128-ctr',
		kdf: 'scrypt',
		kdfparams: {
			dklen: 32,
			salt:
				'116b98e4aeb37f2772c82fc259a62b2ed5119db73801cab6cdb6aab271774fd2',
			n: 8192,
			r: 8,
			p: 1
		},
		mac: '49771a2237ba04d255abfdcbb05f302422cc51ddd2908d5be0e718187d815905'
	}
};

const node = makeMonet();
const other = Account.new();

const account = AbstractKeystore.decrypt(keyfile, 'asd');

(async () => {
	for (let i = 0; i <= 10; i++) {
		await node.transfer(account, other.address, 10, 25000, 0);
	}
})();
