import { BaseAction, Result } from '.';

import Client, { Block, Info, Network, Validator } from '../client';
import POA, { NomineeEntry, WhitelistEntry } from '../poa';

const FETCH_NETWORKS_INIT = '@monet/dashboard/network/FETCH/INIT';
const FETCH_NETWORKS_SUCCESS = '@monet/dashboard/network/FETCH/SUCCESS';
const FETCH_NETWORKS_ERROR = '@monet/dashboard/network/FETCH/ERROR';

const FETCH_VALIDATORS_INIT = '@monet/dashboard/validators/FETCH/INIT';
const FETCH_VALIDATORS_SUCCESS = '@monet/dashboard/validators/FETCH/SUCCESS';
const FETCH_VALIDATORS_ERROR = '@monet/dashboard/validators/FETCH/ERROR';

const FETCH_INFOS_INIT = '@monet/dashboard/infos/FETCH/INIT';
const FETCH_INFOS_SUCCESS = '@monet/dashboard/infos/FETCH/SUCCESS';
const FETCH_INFOS_ERROR = '@monet/dashboard/infos/FETCH/ERROR';

const FETCH_BLOCKS_INIT = '@monet/dashboard/blocks/FETCH/INIT';
const FETCH_BLOCKS_OLDER = '@monet/dashboard/blocks/FETCH/OLDER';
const FETCH_BLOCKS_NEWER = '@monet/dashboard/blocks/FETCH/NEWER';
const FETCH_BLOCKS_SUCCESS = '@monet/dashboard/blocks/FETCH/SUCCESS';
const FETCH_BLOCKS_ERROR = '@monet/dashboard/blocks/FETCH/ERROR';

const FETCH_WHITELIST_INIT = '@monet/dashboard/whitelist/FETCH/INIT';
const FETCH_WHITELIST_SUCCESS = '@monet/dashboard/whitelist/FETCH/SUCCESS';
const FETCH_WHITELIST_ERROR = '@monet/dashboard/whitelist/FETCH/ERROR';

const FETCH_NOMINEES_INIT = '@monet/dashboard/nominees/FETCH/INIT';
const FETCH_NOMINEES_SUCCESS = '@monet/dashboard/nominees/FETCH/SUCCESS';
const FETCH_NOMINEES_ERROR = '@monet/dashboard/nominees/FETCH/ERROR';

const FETCH_EVICTEES_INIT = '@monet/dashboard/nominees/FETCH/INIT';
const FETCH_EVICTEES_SUCCESS = '@monet/dashboard/nominees/FETCH/SUCCESS';
const FETCH_EVICTEES_ERROR = '@monet/dashboard/nominees/FETCH/ERROR';

const SELECT_NETWORK = '@monet/dashboard/network/SELECT';

export type DashboardState = {
	networks: Network[];

	selectedNetwork?: Network;
	networkValidators: Validator[];
	networkInfos: Info[];
	networkBlocks: Block[];

	networkWhitelist: WhitelistEntry[];
	// networkEvictees: WhitelistEntry[];
	networkNominees: NomineeEntry[];

	error?: string;

	loading: {
		networks: boolean;
		validators: boolean;
		infos: boolean;
		blocks: boolean;
		whitelist: boolean;
		nominees: boolean;
	};
};

const initial: DashboardState = {
	networks: [],
	networkInfos: [],
	networkValidators: [],
	networkBlocks: [],

	networkWhitelist: [],
	networkNominees: [],

	loading: {
		networks: false,
		validators: false,
		infos: false,
		blocks: false,
		whitelist: false,
		nominees: false
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
					validators: false
				}
			};

		case FETCH_VALIDATORS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					validators: false
				}
			};

		case FETCH_INFOS_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
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
					infos: false
				}
			};

		case FETCH_INFOS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					infos: false
				}
			};

		case FETCH_BLOCKS_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					blocks: true
				}
			};

		case FETCH_BLOCKS_SUCCESS:
			return {
				...state,
				networkBlocks: action.payload,
				error: undefined,
				loading: {
					...state.loading,
					blocks: false
				}
			};

		case FETCH_BLOCKS_OLDER:
			return {
				...state,
				networkBlocks: [...state.networkBlocks, ...action.payload],
				error: undefined,
				loading: {
					...state.loading,
					blocks: false
				}
			};

		case FETCH_BLOCKS_NEWER:
			return {
				...state,
				networkBlocks: [...action.payload, ...state.networkBlocks],
				error: undefined,
				loading: {
					...state.loading,
					blocks: false
				}
			};

		case FETCH_BLOCKS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					blocks: false
				}
			};

		case FETCH_WHITELIST_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					whitelist: true
				}
			};

		case FETCH_WHITELIST_SUCCESS:
			return {
				...state,
				networkWhitelist: action.payload,
				error: undefined,
				loading: {
					...state.loading,
					whitelist: false
				}
			};

		case FETCH_WHITELIST_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					whitelist: false
				}
			};

		case FETCH_NOMINEES_INIT:
			return {
				...state,
				error: undefined,
				loading: {
					...state.loading,
					nominees: true
				}
			};

		case FETCH_NOMINEES_SUCCESS:
			return {
				...state,
				networkNominees: action.payload,
				error: undefined,
				loading: {
					...state.loading,
					nominees: false
				}
			};

		case FETCH_NOMINEES_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					nominees: false
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
				payload: networks.reverse()
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

		await dispatch({
			type: SELECT_NETWORK,
			payload: network
		});

		await dispatch(fetchAll());

		return network;
	};
}

export function fetchAll(): Result<Promise<void>> {
	return async dispatch => {
		dispatch(fetchNetworkBlocks());
		dispatch(fetchNetworkValidators());
		dispatch(fetchValidatorInfos());
		dispatch(fetchWhitelist());
		dispatch(fetchNominees());
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

export function fetchNetworkBlocks(): Result<Promise<Block[]>> {
	return async (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: FETCH_BLOCKS_INIT
		});

		try {
			const currentBlocks = state.networkBlocks.length;
			const blocks = await c.getBlocks(
				state.selectedNetwork!.name,
				currentBlocks
			);

			if (currentBlocks) {
				if (
					state.networkBlocks[0].network.name ===
					state.selectedNetwork!.name
				) {
					dispatch({
						type: FETCH_BLOCKS_NEWER,
						payload: blocks
					});
				} else {
					dispatch({
						type: FETCH_BLOCKS_SUCCESS,
						payload: blocks
					});
				}
			} else {
				dispatch({
					type: FETCH_BLOCKS_SUCCESS,
					payload: blocks
				});
			}

			return blocks;
		} catch (e) {
			dispatch({
				type: FETCH_BLOCKS_ERROR,
				payload: e.toString()
			});
		}

		return [];
	};
}

export function fetchNextBlocks(): Result<Promise<Block[]>> {
	return async (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: FETCH_BLOCKS_INIT
		});

		try {
			const blocks = await c.getBlocks(
				state.selectedNetwork!.name,
				state.networkBlocks.length
			);

			dispatch({
				type: FETCH_BLOCKS_OLDER,
				payload: blocks
			});

			return blocks;
		} catch (e) {
			dispatch({
				type: FETCH_BLOCKS_ERROR,
				payload: e.toString()
			});
		}

		return [];
	};
}

export function fetchWhitelist(): Result<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: FETCH_WHITELIST_INIT
		});

		try {
			const poa = new POA(
				state.selectedNetwork!.host,
				state.selectedNetwork!.port
			);

			await poa.init();

			const whitelist = await poa.whitelist();

			dispatch({
				type: FETCH_WHITELIST_SUCCESS,
				payload: whitelist
			});
		} catch (e) {
			dispatch({
				type: FETCH_WHITELIST_ERROR,
				payload: e.toString()
			});
		}
	};
}

export function fetchNominees(): Result<Promise<void>> {
	return async (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: FETCH_NOMINEES_INIT
		});

		try {
			const poa = new POA(
				state.selectedNetwork!.host,
				state.selectedNetwork!.port
			);

			await poa.init();

			const whitelist = await poa.nominees();

			dispatch({
				type: FETCH_NOMINEES_SUCCESS,
				payload: whitelist
			});
		} catch (e) {
			dispatch({
				type: FETCH_NOMINEES_ERROR,
				payload: e.toString()
			});
		}
	};
}
