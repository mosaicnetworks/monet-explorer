import { IBabbleBlock } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';

import { IBaseAction, IResult } from './index';

const FETCH_BLOCKS_INIT = '@monet/blocks/ALL/INIT';
const FETCH_BLOCKS_SUCCESS = '@monet/blocks/ALL/SUCCESS';
const FETCH_BLOCKS_ERROR = '@monet/blocks/ALL/ERROR';

export interface IBlocksState {
	// all the blocks on the node
	all: IBabbleBlock[];

	// last block index for node
	lastBlockIndex: number;

	// error message if any
	error?: string;

	// loading boolean
	loading: {
		fetch: boolean;
	};
}

const initial: IBlocksState = {
	all: [],
	lastBlockIndex: 0,
	loading: {
		fetch: false
	}
};

export default (state = initial, action: IBaseAction<any>) => {
	switch (action.type) {
		case FETCH_BLOCKS_INIT:
			return {
				...state,
				all: [],
				error: undefined,
				loading: {
					...state.loading,
					fetch: true
				}
			};
		case FETCH_BLOCKS_SUCCESS:
			return {
				...state,
				all: action.payload,
				loading: {
					...state.loading,
					fetch: false
				}
			};
		case FETCH_BLOCKS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: {
					...state.loading,
					fetch: false
				}
			};

		default:
			return {
				...state
			};
	}
};

export function getLastBlockIndex(
	startIndex: number,
	limit?: number
): IResult<Promise<void>> {
	return async dispatch => {
		// pass
	};
}

export function getAll(
	startIndex: number,
	limit?: number
): IResult<Promise<void>> {
	return async dispatch => {
		dispatch({
			type: FETCH_BLOCKS_INIT
		});

		try {
			const n = new Monet('', 8080);
			const blocks = await n.consensus!.getBlocks(startIndex, limit);

			dispatch({
				type: FETCH_BLOCKS_SUCCESS,
				payload: blocks
			});
		} catch (e) {
			dispatch({
				type: FETCH_BLOCKS_ERROR,
				payload: e.toString()
			});
		}
	};
}
