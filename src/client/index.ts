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

class ExplorerAPIClient extends AbstractClient {
	constructor() {
		super('localhost', 8000);
	}

	public async getNetworks(): Promise<Network[]> {
		return JSON.parse(await this.get('/api/networks/'));
	}

	public async getValidators(network: 'camille'): Promise<Validator[]> {
		return JSON.parse(
			await this.get(`/api/validators/?network=${network}`)
		);
	}

	public async getInfos(network: 'camille' | string): Promise<Info[]> {
		return JSON.parse(await this.get(`/api/infos/?network=${network}`));
	}
}

export default ExplorerAPIClient;

const c = new ExplorerAPIClient();

c.getInfos('camille')
	.then(console.log)
	.catch(console.log);
