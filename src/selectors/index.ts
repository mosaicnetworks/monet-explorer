import { Store } from '../store';

export const networksSelector = (store: Store) => store.networks;
export const selectedNetwork = (store: Store) => store.selectedNetwork;
export const networkValidators = (store: Store) => store.networkValidators;
export const networkInfos = (store: Store) => store.networkInfos;
export const networkBlocks = (store: Store) => store.networkBlocks;

export const validatorInfo = (validatorid: number) => (store: Store) =>
	store.networkInfos.filter(i => i.validator.id === validatorid)[0];
