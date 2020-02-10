export { default as PeerNode } from './PeerNode';
export { default as EventNode } from './EventNode';

export { default as Peer } from './Peer';
export { default as Event } from './Event';

export type HashgraphEvent = {
	Body: {
		Transactions: any[];
		InternalTransactions: any[];
		Parents: string[];
		Creator: string;
		Index: number;
		BlockSignatures: any[];
	};
	Signature: string;
};

export const CONSTANTS = {
	NODE_WIDTH: 40,
	NODE_HEIGHT: 40,
	EVENT_RADIUS: 15,
	SPACING_MULT: 3
};
