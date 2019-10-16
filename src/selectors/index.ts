import { Store } from '../store';

export const networksSelector = (store: Store) => store.networks;
export const selectedNetwork = (store: Store) => store.selectedNetwork;
export const networkValidators = (store: Store) => store.networkValidators;
export const networkInfos = (store: Store) => store.networkInfos;
export const networkBlocks = (store: Store) => store.networkBlocks;

export const validatorInfo = (validatorid: number) => (store: Store) =>
	store.networkInfos.filter(i => i.validator.id === validatorid)[0];

export const selectValidator = (validatorid: number) => (store: Store) =>
	store.networkValidators.filter(i => i.id === validatorid)[0];

export const selectWhitelist = (store: Store) => store.networkWhitelist;
export const selectNominees = (store: Store) => store.networkNominees;

export const LOCAL_NETWORK = {
	host: 'localhost',
	port: 8080
};
