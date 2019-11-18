const keccak256 = require('js-sha3').keccak256;

export const pubKeyToAddress = (pubkey: string) => {
	const pubKeyBuffer = Buffer.from(pubkey.slice(4, pubkey.length), 'hex');

	return Buffer.from(keccak256(pubKeyBuffer), 'hex')
		.slice(-20)
		.toString('hex');
};
