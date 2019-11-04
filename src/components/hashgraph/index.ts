import EventDrawing from './Event';

import { HashgraphEvent } from '../../monet';

export type MappedParticipantEvents = {
	[publicKey: string]: EventNode[];
};

export type EventNode = {
	data: HashgraphEvent;
	hash: string;
	parents: EventNode[];
	x: number;
	y: number;
};

export { default as Event } from './Event';
export { default as Node } from './Node';

export const CONSTANTS = {
	NODE_WIDTH: 40,
	NODE_HEIGHT: 40,
	EVENT_RADIUS: 15,
	SPACING_MULT: 3
};
