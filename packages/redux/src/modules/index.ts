import { ThunkAction } from 'redux-thunk';

import { combineReducers } from 'redux';

import { IStore } from '../store';

import config from './config';

export type IResult<R> = ThunkAction<R, IStore, undefined, IBaseAction<any>>;
export interface IBaseAction<Payload> {
	type: string;
	payload?: Payload;
}

export default combineReducers({ config });
