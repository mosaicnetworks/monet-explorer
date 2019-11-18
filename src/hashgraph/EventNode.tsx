import INode from './Node';
import PeerNode from './PeerNode';

import { CONSTANTS, HashgraphEvent } from '.';

class EventNode implements INode {
	public x: number = 0;
	public y: number = -1;

	public round: number = -1;

	public parents: EventNode[] = [];

	constructor(
		public readonly event: HashgraphEvent,
		public readonly hash: string,
		public readonly peer: PeerNode
	) {}

	public setInitialPos() {
		this.x =
			CONSTANTS.NODE_WIDTH / 2 +
			CONSTANTS.SPACING_MULT * CONSTANTS.NODE_WIDTH * this.peer.index;

		if (this.parents.length === 0 && this.round === 0) {
			this.y = 100;
		}
	}
}

export default EventNode;
