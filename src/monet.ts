import { IBaseInfo } from 'evm-lite-client';

export interface IMonetInfo extends IBaseInfo {
	consensus_events: string;
	consensus_transactions: string;
	events_per_second: string;
	id: string;
	last_block_index: string;
	last_consensus_round: string;
	moniker: string;
	num_peers: string;
	round_events: string;
	rounds_per_second: string;
	state: string;
	sync_rate: string;
	transaction_pool: string;
	undetermined_events: string;
}

export const config = {
	host: 'camille.monet.network',
	port: 8080
};
