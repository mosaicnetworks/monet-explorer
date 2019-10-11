import { AbstractClient } from 'evm-lite-client';

type Network = {
	id: number;
	name: string;
	host: string;
	port: number;
};

class ExplorerAPIClient extends AbstractClient {
	constructor() {
		super('localhost', 8000);
	}

	public async getNetworks(): Promise<Network[]> {
		return JSON.parse(await this.get('/api/networks/'));
	}

	public async getValidators(
		network: 'camille' | string
	): Promise<Network[]> {
		return JSON.parse(
			await this.get(`/api/validators/?network=${network}`)
		);
	}

	public async getInfos(network: 'camille' | string): Promise<Network[]> {
		return JSON.parse(await this.get(`/api/infos/?network=${network}`));
	}
}

export default ExplorerAPIClient;
