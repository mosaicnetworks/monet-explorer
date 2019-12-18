import * as http from 'http';

import { DEV, DEV_HOST, DEV_PORT, PROD_HOST, PROD_PORT } from '../CONST';

interface IOptions {
	host: string;
	port: number;
	method: string;
	path: string;
	headers: any;
}

let host: string = PROD_HOST;
let port: number = PROD_PORT;

if (DEV) {
	host = DEV_HOST;
	port = DEV_PORT;
}

export default abstract class AbstractClient {
	public readonly host: string;
	public readonly port: number;

	protected constructor() {
		this.host = host;
		this.port = port;
	}

	protected response<T>(res: string): Promise<T> {
		try {
			return Promise.resolve(JSON.parse(res));
		} catch (e) {
			return Promise.reject(res);
		}
	}

	protected responseBig<T>(res: string): Promise<T> {
		try {
			return Promise.resolve(JSON.parse(res));
		} catch (e) {
			return Promise.reject(res);
		}
	}

	protected async get(path: string) {
		return await this.request(this.options('GET', path));
	}

	protected async post(path: string, data: string) {
		return await this.request(this.options('POST', path), data);
	}

	protected options(method: string, path: string): IOptions {
		return {
			host: this.host,
			port: this.port,
			method,
			path,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	}

	private request(options: IOptions, data?: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const req = http.request(options, response => {
				let res = '';

				response.on('data', chunk => (res += chunk));
				response.on('end', () => resolve(res));
				response.on('error', err => reject(err));
			});

			req.on('error', err => reject(err));

			if (data) {
				console.log('Writing data: ', data);
				req.write(data);
			}

			req.end();
		});
	}
}
