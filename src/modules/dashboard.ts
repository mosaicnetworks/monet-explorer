import Client, { Network } from '../client';

import { BaseAction, Result } from '.';

const FETCH_NETWORKS_INIT = '@monet/dashboard/network/FETCH/INIT';
const FETCH_NETWORKS_SUCCESS = '@monet/dashboard/network/FETCH/SUCCESS';
const FETCH_NETWORKS_ERROR = '@monet/dashboard/network/FETCH/ERROR';

const SELECT_NETWORK = '@monet/dashboard/network/SELECT';

export type DashboardState = {
	networks: Network[];
	selectedNetwork?: Network;
	error?: string;
	loading: {
		networks: boolean;
	};
};

const initial: DashboardState = {
	networks: [],
	loading: {
		networks: false
	}
};

const c = new Client();

export default (
	state: DashboardState = initial,
	action: BaseAction<any>
): DashboardState => {
	switch (action.type) {
		case SELECT_NETWORK:
			return {
				...state,
				selectedNetwork: action.payload
			};

		case FETCH_NETWORKS_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					networks: true
				}
			};

		case FETCH_NETWORKS_SUCCESS:
			return {
				...state,
				networks: action.payload,
				error: undefined,
				loading: {
					networks: false
				}
			};

		case FETCH_NETWORKS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					networks: false
				}
			};

		default:
			return state;
	}
};

export function selectNetwork(networkid: number): Result<Promise<Network>> {
	return async (dispatch, getState) => {
		const state = getState();

		const network: Network = state.networks.filter(
			n => n.id === networkid
		)![0];

		dispatch({
			type: SELECT_NETWORK,
			payload: network
		});

		return network;
	};
}
export function fetchNetworks(): Result<Promise<Network[]>> {
	return async dispatch => {
		dispatch({
			type: FETCH_NETWORKS_INIT
		});

		try {
			const networks = await c.getNetworks();

			dispatch({
				type: FETCH_NETWORKS_SUCCESS,
				payload: networks
			});

			return networks;
		} catch (e) {
			dispatch({
				type: FETCH_NETWORKS_ERROR,
				payload: e.toString()
			});

			return [];
		}
	};
}

export function fetchValidators(): Result<Promise<Network[]>> {
	return async (dispatch, getState) => {
		return [];
	};
}

export function fetchInfos(): Result<Promise<Network[]>> {
	return async (dispatch, getState) => {
		return [];
	};
}
