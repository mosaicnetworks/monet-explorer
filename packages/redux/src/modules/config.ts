import { IBaseAction, IResult } from '.';

const SAVE = '@monet/config/SAVE';

export interface IConfigState {
	host: string;
	port: number;
}

const initial: IConfigState = {
	host: '127.0.0.1',
	port: 8080
};

export default (state = initial, action: IBaseAction<any>) => {
	switch (action.type) {
		case SAVE:
			return {
				...state,
				host: action.payload.host,
				port: action.payload.port
			};

		default:
			return state;
	}
};

export function save(host: string, port: number): IResult<Promise<void>> {
	return async dispatch => {
		dispatch({
			type: SAVE,
			payload: {
				host,
				port
			}
		});
	};
}
