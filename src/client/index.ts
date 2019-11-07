import AbstractClient from './Client';

import { IReceipt } from 'evm-lite-client';

import request from 'request';

export type Network = {
	name: string;
	host: string;
	port: number;
};

export type Validator = {
	moniker: string;
	host: string;
	public_key: string;
	network: Network;
	reachable: boolean;
	info: Info;
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
};

class ExplorerAPIClient extends AbstractClient {
	constructor() {
		super('dashboard.monet.network', 80);
	}

	public async getNetworks(): Promise<Network[]> {
		return JSON.parse(await this.get('/api/networks/')).results;
	}

	public async getValidators(
		network: string,
		round?: number
	): Promise<Validator[]> {
		let url = `/api/validators/?network=${network}`;

		if (round || round === 0) {
			url += `&round=${round}`;
		}

		console.log(url);
		return JSON.parse(await this.get(url)).results;
	}

	public async getInfos(network: string): Promise<Info[]> {
		return JSON.parse(await this.get(`/api/infos/?network=${network}`))
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

	public async getHashgraph(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			request.get(
				`http://localhost:8080/graph`,
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

	public async getLatestRelease(owner: string, repo: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			request.get(
				`https://api.github.com/repos/${owner}/${repo}/releases/latest`,
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

	public async getVersion(
		host: string
	): Promise<{
		babble: string;
		'evm-lite': string;
		monetd: string;
		solc: string;
		'solc-os': string;
	}> {
		return new Promise<any>((resolve, reject) => {
			request.get(
				`http://${host}:8080/version`,
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

	public async transactions(network: string): Promise<any> {
		return JSON.parse(
			await this.get(`/api/transactions/?network=${network}`)
		).results;
	}

	public async applications(): Promise<Application[]> {
		return JSON.parse(await this.get(`/api/downloads/applications/`))
			.results;
	}
}

export default ExplorerAPIClient;
