import INode from './Node';

import { CONSTANTS } from '.';

class PeerNode implements INode {
	public x: number = 0;
	public y: number = 0;

	constructor(
		public readonly publicKey: string,
		public readonly eventsCount: number,
		public readonly index: number
	) {
		this.setInitialPos();
	}

	private setInitialPos() {
		this.x = this.index * (CONSTANTS.SPACING_MULT * CONSTANTS.NODE_WIDTH);
		this.y = 0;
	}
}

export default PeerNode;
