import AbstractClient from './Client';

import { IReceipt } from 'evm-lite-client';

import request from 'request';

import { DEV } from '../const';

export type Network = {
	name: string;
	host: string;
	port: number;
};

export type Version = {
	monetd: string;
	babble: string;
	evm_lite: string;
	solc: string;
	solc_os: string;
};

export type Validator = {
	moniker: string;
	host: string;
	public_key: string;
	network: Network;
	reachable: boolean;
	info: Info;
	version: Version;
};

export type Info = {
	e_id: number;
	type: string;
	state: string;
	consensus_events: number;
	consensus_transactions: number;
	last_block_index: number;
	last_consensus_round: number;
	last_peer_change: number;
	min_gas_price: number;
	num_peers: number;
	undetermined_events: number;
	transaction_pool: number;
	sync_rate: string;
	events_per_second: string;
	rounds_per_second: string;
};

export type Transaction = {
	data: string;
};

export type InternalTransaction = {
	data: string;
};

export type InternalTransactionReceipt = {
	data: string;
};

export type Signature = {
	signature: string;
	validator: Validator;
};

export type Block = {
	index: number;
	round_received: number;
	state_hash: string;
	peers_hash: string;
	frame_hash: string;
	network: Network;
	transactions: Transaction[];
	internal_transactions: InternalTransaction[];
	internal_transaction_receipts: InternalTransactionReceipt[];
	signatures: Signature[];
};

export type ValidatorHistory = {
	consensus_round: number;
	validators: Validator[];
};

export type Stats = {
	block_height: number;
	tx_count: number;
	int_tx_count: number;
};

export type Application = {
	id: number;
	owner: string;
	repository_name: string;
	description: string;
};

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

export type EvicteeEntry = {
	address: string;
	moniker: string;
	upVotes: number;
	downVotes: number;
};

class ExplorerAPIClient extends AbstractClient {
	constructor() {
		if (DEV) {
			super('localhost', 8000);
		} else {
			super('dashboard.monet.network', 443);
		}
	}

	public async getNetworks(): Promise<Network[]> {
		return JSON.parse(await this.get('/api/networks/')).results;
	}

	public async getWhitelist(network: string): Promise<WhitelistEntry[]> {
		return JSON.parse(
			await this.get(`/api/whitelist/?network=${network.toLowerCase()}`)
		);
	}

	public async getNominees(network: string): Promise<NomineeEntry[]> {
		return JSON.parse(
			await this.get(`/api/nominees/?network=${network.toLowerCase()}`)
		);
	}

	public async getValidators(
		network: string,
		round?: number
	): Promise<Validator[]> {
		let url = `/api/validators/?network=${network}`;

		if (round || round === 0) {
			url += `&round=${round}`;
		}

		return JSON.parse(await this.get(url)).results;
	}

	public async getInfos(network: string): Promise<Info[]> {
		return JSON.parse(await this.get(`/api/infos/?network=${network}`))
			.results;
	}

	public async getBlocks(network: string, offset?: number): Promise<Block[]> {
		let url = `/api/blocks/?network=${network}`;

		if (offset) {
			url += `&limit=10&offset=${offset}`;
		}

		return JSON.parse(await this.get(url)).results;
	}

	public async getValidatorHistory(
		network: string
	): Promise<ValidatorHistory[]> {
		return JSON.parse(await this.get(`/api/history/?network=${network}`))
			.results;
	}

	public async getStats(network: string): Promise<Stats> {
		return JSON.parse(await this.get(`/api/stats/?network=${network}`));
	}

	public async getApplications(): Promise<Application[]> {
		return JSON.parse(await this.get(`/api/downloads/applications/`))
			.results;
	}

	public async submitFaucetTx(address: string): Promise<IReceipt> {
		return new Promise<IReceipt>((resolve, reject) => {
			request.post(
				`http://${this.host}:${this.port}/api/faucet/`,
				{ json: { address } },
				(error, response, body) => {
					if (error) {
						return reject(error);
					}
					if (!error && response.statusCode === 200) {
						resolve(body);
					}
				}
			);
		});
	}

	// misc

	public async getHashgraph(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			request.get(
				`http://172.77.5.10:8080/graph`,
				(error, response, body) => {
					if (error) {
						return reject(error);
					}
					if (!error && response.statusCode === 200) {
						resolve(JSON.parse(body));
					}
				}
			);
		});
	}
}

export default ExplorerAPIClient;
