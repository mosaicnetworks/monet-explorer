import { AbstractClient } from 'evm-lite-client';
import { IBabblePeer } from 'evm-lite-consensus';

export type Network = {
	id: number;
	name: string;
	host: string;
	port: number;
};

export type Validator = {
	id: number;
	moniker: string;
	host: string;
	port: number;
	public_key: string;
	network: Network;
};

export type Info = {
	id: number;
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
	validator: Validator;
};

export type Block = {
	id: number;
	index: number;
	round_received: number;
	state_hash: string;
	peers_hash: string;
	frame_hash: string;
	network: Network;
};

class ExplorerAPIClient extends AbstractClient {
	constructor() {
		super('localhost', 8000);
	}

	public async getNetworks(): Promise<Network[]> {
		return JSON.parse(await this.get('/api/networks/')).results;
	}

	public async getValidators(network: string): Promise<Validator[]> {
		return JSON.parse(await this.get(`/api/validators/?network=${network}`))
			.results;
	}

	public async getInfos(network: string): Promise<Info[]> {
		return JSON.parse(await this.get(`/api/infos/?network=${network}`))
			.results;
	}

	public async getBlocks(network: string, offset?: number): Promise<Block[]> {
		let url = `/api/blocks/?network=${network}`;

		if (offset) {
			url += `&limit=100&offset=${offset}`;
		}

		return JSON.parse(await this.get(url)).results;
	}
}

export default ExplorerAPIClient;
