import request from 'request';

import { IBaseAccount } from 'evm-lite-client';

import * as types from './types';

import Client from './Client';

class CoreAPI extends Client {
	constructor() {
		super();
	}

	// Test function
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

	// Faucet Transaction
	public async submitFaucetTx(address: string): Promise<{ success: string }> {
		return new Promise<{ success: string }>((resolve, reject) => {
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

	/**
	 * Network and Validator related API calls
	 */
	public async fetchNetworks(): Promise<types.Network[]> {
		return JSON.parse(await this.get('/api/networks/')).results;
	}

	public async fetchAccount(
		address: string,
		network: string
	): Promise<IBaseAccount> {
		return JSON.parse(
			await this.get(`/api/account/${address}/?network=${network}`)
		);
	}

	public async fetchValidators(
		network: string,
		round?: number
	): Promise<types.Validator[]> {
		let url = `/api/validators/?network=${network}`;

		if (round || round === 0) {
			url += `&round=${round}`;
		}

		return JSON.parse(await this.get(url)).results;
	}

	public async fetchValidatorsInfo(network: string): Promise<types.Info[]> {
		return JSON.parse(await this.get(`/api/infos/?network=${network}`))
			.results;
	}

	public async fetchValidatorHistory(
		network: string
	): Promise<types.ValidatorHistory[]> {
		return JSON.parse(await this.get(`/api/history/?network=${network}`))
			.results;
	}

	/**
	 * Statistics, Transactions & Blocks
	 */
	public async fetchBlock(
		index: number,
		network: string
	): Promise<types.Block> {
		const url = `/api/block/${index}/?network=${network}`;

		return JSON.parse(await this.get(url));
	}

	public async fetchBlocks(
		network: string,
		offset?: number
	): Promise<types.Block[]> {
		let url = `/api/blocks/?network=${network}`;

		if (offset) {
			url += `&limit=10&offset=${offset}`;
		}

		return JSON.parse(await this.get(url)).results;
	}

	public async fetchTxs(network: string): Promise<types.Transaction[]> {
		return JSON.parse(
			await this.get(`/api/transactions/?network=${network}`)
		).results;
	}

	public async fetchStats(network: string): Promise<types.Stats> {
		return JSON.parse(await this.get(`/api/stats/?network=${network}`));
	}

	/**
	 * POA related API calls
	 */
	public async fetchWhitelist(
		network: string
	): Promise<types.WhitelistEntry[]> {
		return JSON.parse(
			await this.get(`/api/whitelist/?network=${network.toLowerCase()}`)
		);
	}

	public async fetchNominees(network: string): Promise<types.NomineeEntry[]> {
		return JSON.parse(
			await this.get(`/api/nominees/?network=${network.toLowerCase()}`)
		);
	}
}

export default CoreAPI;
