import logger from 'redux-logger';
import dynamicStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { applyMiddleware, createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';

import rootReducer from './modules';

import { DashboardState } from './modules/dashboard';

export type Store = DashboardState;

const persistConfig: PersistConfig<any> = {
	key: 'root',
	storage: dynamicStorage,
	whitelist: [
		'networks',
		'selectedNetwork',
		'networkValidators',
		'networkInfos',
		'networkWhitelist',
		'networkNominees',
		'networkBlocks'
	]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk, logger];

export default () => {
	const store = createStore(persistedReducer, applyMiddleware(...middleware));
	const persistor = persistStore(store);

	return { store, persistor };
};
