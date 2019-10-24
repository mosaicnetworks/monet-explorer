import { Store } from '../store';

export const networksSelector = (store: Store) => store.networks;
export const selectedNetwork = (store: Store) => store.selectedNetwork;
export const networkValidators = (store: Store) => store.networkValidators;
export const networkInfos = (store: Store) => store.networkInfos;
export const networkBlocks = (store: Store) => store.networkBlocks;

export const validatorInfo = (validatorid: number) => (store: Store) =>
	store.networkInfos.find(i => i.validator.id === validatorid);

export const selectValidator = (validatorid: number) => (store: Store) =>
	store.networkValidators.find(v => v.id === validatorid);

export const selectBlock = (blockid: number) => (store: Store) =>
	store.networkBlocks.find(i => i.id === blockid);

export const selectWhitelist = (store: Store) => store.networkWhitelist;
export const selectNominees = (store: Store) => store.networkNominees;

export const LOCAL_NETWORK = {
	host: 'localhost',
	port: 8080
};

export const selectShowFaucetAlert = (store: Store) => store.showFaucetAlert;
