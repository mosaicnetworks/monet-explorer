import { IContractABI } from 'evm-lite-client';
import {
	Contract,
	IAbstractSchema,
	ITransaction,
	Transaction
} from 'evm-lite-core';

import utils from 'evm-lite-utils';

import { GAS, GASPRICE, monet as monetfn } from './monet';
import { useSelector } from 'react-redux';
import { selectedNetwork } from './selectors';

interface ISchema extends IAbstractSchema {
	checkAuthorised(tx: ITransaction, address: string): Transaction;
	submitNominee(
		tx: ITransaction,
		address: string,
		moniker: string
	): Transaction;
	castNomineeVote(
		tx: ITransaction,
		address: string,
		verdict: boolean
	): Transaction;
	getCurrentNomineeVotes(tx: ITransaction, address: string): Transaction;
	getWhiteListCount(tx: ITransaction): Transaction;
	getWhiteListAddressFromIdx(tx: ITransaction, id: number): Transaction;
	getMoniker(tx: ITransaction, address: string): Transaction;
	getNomineeCount(tx: ITransaction): Transaction;
	getNomineeAddressFromIdx(tx: ITransaction, id: number): Transaction;
	isNominee(tx: ITransaction, address: string): Transaction;
}

export type WhitelistEntry = {
	address: string;
	moniker: string;
};

export type NomineeEntry = {
	address: string;
	moniker: string;
	upVotes: number;
	downVotes: number;
};

const network = useSelector(selectedNetwork) || {
	host: 'localhost',
	port: 8080
};

class POA {
	public monet = monetfn(network.host, network.port);

	private readonly contract: Contract<ISchema>;

	constructor(address: string, abi: IContractABI) {
		this.contract = Contract.load(abi, address);
		console.log('NETWORK', network);
	}

	public async whitelist(): Promise<WhitelistEntry[]> {
		const countTx = this.contract.methods.getWhiteListCount({
			gas: GAS,
			gasPrice: GASPRICE
		});

		const countRes: any = await this.monet.callTx(countTx);
		const count = countRes.toNumber();

		if (!count) {
			return [];
		}

		const entries: WhitelistEntry[] = [];

		for (const i of Array.from(Array(count).keys())) {
			const entry: WhitelistEntry = {
				address: '',
				moniker: ''
			};

			const addressTx = this.contract.methods.getWhiteListAddressFromIdx(
				{
					gas: GAS,
					gasPrice: GASPRICE
				},
				i
			);

			entry.address = await this.monet.callTx(addressTx);

			const monikerTx = this.contract.methods.getMoniker(
				{
					gas: GAS,
					gasPrice: GASPRICE
				},
				entry.address
			);

			const hex = await this.monet.callTx<string>(monikerTx);
			entry.moniker = utils.hexToString(hex);

			entries.push(entry);
		}

		return entries;
	}

	public async nominees(): Promise<NomineeEntry[]> {
		const countTx = this.contract.methods.getNomineeCount({
			gas: GAS,
			gasPrice: GASPRICE
		});

		const countRes: any = await this.monet.callTx(countTx);
		const count = countRes.toNumber();

		if (!count) {
			return [];
		}

		const entries: NomineeEntry[] = [];
		for (const i of Array.from(Array(count).keys())) {
			const entry: NomineeEntry = {
				address: '',
				moniker: '',
				upVotes: 0,
				downVotes: 0
			};

			const addressTx = this.contract.methods.getNomineeAddressFromIdx(
				{
					gas: GAS,
					gasPrice: GASPRICE
				},
				i
			);

			entry.address = await this.monet.callTx(addressTx);

			const monikerTx = this.contract.methods.getMoniker(
				{
					gas: GAS,
					gasPrice: GASPRICE
				},
				entry.address
			);

			const hex = await this.monet.callTx<string>(monikerTx);
			entry.moniker = utils.hexToString(hex);

			const votesTx = this.contract.methods.getCurrentNomineeVotes(
				{
					gas: GAS,
					gasPrice: GASPRICE
				},
				utils.cleanAddress(entry.address)
			);

			const votes = await this.monet.callTx<[string, string]>(votesTx);

			entry.upVotes = parseInt(votes[0], 10);
			entry.downVotes = parseInt(votes[1], 10);

			entries.push(entry);
		}

		return entries;
	}
}

export default POA;
