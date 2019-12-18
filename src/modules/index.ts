import { ThunkAction } from 'redux-thunk';

import { Store } from '../store';

import dashboard from './dashboard';

export type Result<R> = ThunkAction<R, Store, undefined, BaseAction<any>>;
export type BaseAction<Payload> = {
	type: string;
	payload?: Payload;
};

export default dashboard;
