import { Babble, IBabbleBlock } from 'evm-lite-consensus';

import Node from 'evm-lite-core';

import { IBaseAction, IResult } from './index';

const FETCH_BLOCKS_INIT = '@monet/blocks/FETCH_ALL/INIT';
const FETCH_BLOCKS_SUCCESS = '@monet/blocks/FETCH_ALL/SUCCESS';
const FETCH_BLOCKS_ERROR = '@monet/blocks/FETCH_ALL/ERROR';

const FETCH_BLOCK_INIT = '@monet/blocks/FETCH_ONE/INIT';
const FETCH_BLOCK_SUCCESS = '@monet/blocks/FETCH_ONE/SUCCESS';
const FETCH_BLOCK_ERROR = '@monet/blocks/FETCH_ONE/ERROR';

import { HOST, PORT } from '../const';

const makeMonet = () => {
	const b = new Babble(HOST, PORT);
	const n = new Node(HOST, PORT, b);

	return n;
};

export interface IBlocksState {
	all: IBabbleBlock[];

	error?: string;

	loading: {
		fetch: boolean;
	};
}

const initial: IBlocksState = {
	all: [],
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

export function fetchAll(
	startIndex: number,
	limit?: number
): IResult<Promise<void>> {
	return async dispatch => {
		dispatch({
			type: FETCH_BLOCKS_INIT
		});

		try {
			const n = makeMonet();
			const blocks = await n.consensus.getBlocks(startIndex, limit);

			dispatch({
				type: FETCH_BLOCKS_SUCCESS,
				payload: blocks
			});
		} catch (e) {
			dispatch({
				type: FETCH_BLOCKS_SUCCESS,
				payload: e
			});
		}
	};
}

export function fetchOne(startIndex: number): IResult<Promise<void>> {
	return async dispatch => {
		dispatch({
			type: FETCH_BLOCK_INIT
		});

		try {
			const n = makeMonet();
			const blocks = await n.consensus.getBlocks(startIndex);

			dispatch({
				type: FETCH_BLOCK_SUCCESS,
				payload: blocks
			});
		} catch (e) {
			dispatch({
				type: FETCH_BLOCK_ERROR,
				payload: e
			});
		}
	};
}
