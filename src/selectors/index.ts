import { Store } from '../store';

export const selectAllNetworks = (store: Store) => store.networks;
export const selectNetwork = (store: Store) => store.selectedNetwork;
export const selectNetworkValidators = (store: Store) =>
	store.networkValidators;
export const selectNetworkBlocks = (store: Store) => store.networkBlocks;

export const selectValidator = (pubKey: string) => (store: Store) =>
	store.networkValidators.find(v => v.public_key === pubKey);

export const selectBlock = (blockindex: number) => (store: Store) =>
	store.networkBlocks.find(i => i.index === blockindex);

export const selectBlocksLoading = (store: Store) => store.loading.blocks;

export const selectWhitelist = (store: Store) => store.networkWhitelist;
export const selectNominees = (store: Store) => store.networkNominees;

export const LOCAL_NETWORK = {
	host: 'localhost',
	port: 8080
};

export const selectShowFaucetAlert = (store: Store) => store.showFaucetAlert;
