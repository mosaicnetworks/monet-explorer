import Client, { Info, Network, Validator } from '../client';

import { BaseAction, Result } from '.';
import { validate } from '@babel/types';

const FETCH_NETWORKS_INIT = '@monet/dashboard/network/FETCH/INIT';
const FETCH_NETWORKS_SUCCESS = '@monet/dashboard/network/FETCH/SUCCESS';
const FETCH_NETWORKS_ERROR = '@monet/dashboard/network/FETCH/ERROR';

const FETCH_VALIDATORS_INIT = '@monet/dashboard/validators/FETCH/INIT';
const FETCH_VALIDATORS_SUCCESS = '@monet/dashboard/validators/FETCH/SUCCESS';
const FETCH_VALIDATORS_ERROR = '@monet/dashboard/validators/FETCH/ERROR';

const FETCH_INFOS_INIT = '@monet/dashboard/infos/FETCH/INIT';
const FETCH_INFOS_SUCCESS = '@monet/dashboard/infos/FETCH/SUCCESS';
const FETCH_INFOS_ERROR = '@monet/dashboard/infos/FETCH/ERROR';

const SELECT_NETWORK = '@monet/dashboard/network/SELECT';

export type DashboardState = {
	networks: Network[];

	selectedNetwork?: Network;
	networkValidators: Validator[];
	networkInfos: Info[];

	error?: string;
	loading: {
		networks: boolean;
		validators: boolean;
		infos: boolean;
	};
};

const initial: DashboardState = {
	networks: [],
	networkInfos: [],
	networkValidators: [],

	loading: {
		networks: false,
		validators: false,
		infos: false
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
					...state.loading,
					networks: true
				}
			};

		case FETCH_NETWORKS_SUCCESS:
			return {
				...state,
				networks: action.payload,
				error: undefined,
				loading: {
					...state.loading,
					networks: false
				}
			};

		case FETCH_NETWORKS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					networks: false
				}
			};

		case FETCH_VALIDATORS_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					networks: true,
					validators: true
				}
			};

		case FETCH_VALIDATORS_SUCCESS:
			return {
				...state,
				networkValidators: action.payload,
				error: undefined,
				loading: {
					...state.loading,
					networks: false,
					validators: false
				}
			};

		case FETCH_VALIDATORS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					networks: false,
					validators: false
				}
			};

		case FETCH_INFOS_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					networks: true,
					validators: true,
					infos: true
				}
			};

		case FETCH_INFOS_SUCCESS:
			return {
				...state,
				networkInfos: action.payload,
				error: undefined,
				loading: {
					...state.loading,
					networks: false,
					validators: false,
					infos: false
				}
			};

		case FETCH_INFOS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					networks: false,
					validators: false,
					infos: false
				}
			};

		default:
			return state;
	}
};

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

		dispatch(fetchNetworkValidators());
		dispatch(fetchValidatorInfos());

		return network;
	};
}

export function fetchNetworkValidators(): Result<Promise<Validator[]>> {
	return async (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: FETCH_VALIDATORS_INIT
		});

		try {
			const validators = await c.getValidators(
				state.selectedNetwork!.name
			);

			dispatch({
				type: FETCH_VALIDATORS_SUCCESS,
				payload: validators
			});

			return validators;
		} catch (e) {
			dispatch({
				type: FETCH_VALIDATORS_ERROR,
				payload: e.toString()
			});
		}

		return [];
	};
}

export function fetchValidatorInfos(): Result<Promise<Info[]>> {
	return async (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: FETCH_INFOS_INIT
		});

		try {
			const infos = await c.getInfos(state.selectedNetwork!.name);

			dispatch({
				type: FETCH_INFOS_SUCCESS,
				payload: infos
			});

			return infos;
		} catch (e) {
			dispatch({
				type: FETCH_INFOS_ERROR,
				payload: e.toString()
			});
		}

		return [];
	};
}
