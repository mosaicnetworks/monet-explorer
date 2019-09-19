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
	address: 'e7df2cf5766849a2147575a5c2269401368b410d',
	pub:
		'04fd7c55edbdac4a068ee37b36499e4a5798c055b23bfe3a72af2dfacb4903747a52bd88c5a88286cc8c9c3dbf965b9a0b6c1ef92dcb9dadb7c5c1dcbf3cbac858',
	crypto: {
		cipher: 'aes-128-ctr',
		ciphertext:
			'a55f12ea94ff98b07de594942376f15a48fcce951a47bbe5f209bc0a9d35ec71',
		cipherparams: { iv: '1e6385f0480344b1d5d68daa725aa08b' },
		kdf: 'scrypt',
		kdfparams: {
			dklen: 32,
			n: 262144,
			p: 1,
			r: 8,
			salt:
				'0417b814cabc3314c366ba6bfba006c1b4c87d885d6371816c67cd77db4ee7e4'
		},
		mac: '3de7eb087cdff324bff246d8eca946c2838858c696bd0f5e68f4d5c6176b38cb'
	},
	id: 'b7cacbc5-a3f3-4ef1-b766-e36b350f3eb6',
	version: 3
};

const node = makeMonet();
const other = Account.new();

const account = AbstractKeystore.decrypt(keyfile, 'asdasd');

(async () => {
	for (let i = 0; i <= 10; i++) {
		await node.transfer(account, other.address, 10, 25000, 0);
	}
})();
