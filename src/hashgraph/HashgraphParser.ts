import { CONSTANTS, EventNode, PeerNode } from '.';
import { GraphInfo } from '../monet';

class HashgraphParser {
	public eventNodes: EventNode[] = [];
	public peerNodes: PeerNode[] = [];

	constructor(public readonly graph: GraphInfo) {
		console.log('Parsing...');

		console.log('Creating nodes...');
		this.createNodes();

		console.log('Assigning parents & rounds...');
		this.assignRounds();
		this.assignParents();

		this.eventNodes = this.eventNodes.sort(
			(a, b) => a.event.Body.Index - b.event.Body.Index
		);

		console.log('Propegating...');
		this.propagate();
	}

	public createNodes() {
		const hg = this.graph.ParticipantEvents;

		Object.keys(hg).map((publicKey, peerIndex) => {
			const peerNode: PeerNode = new PeerNode(
				publicKey,
				Object.keys(hg[publicKey]).length,
				peerIndex
			);

			Object.keys(hg[publicKey])
				.sort(
					(a, b) =>
						hg[publicKey][a].Body.Index -
						hg[publicKey][b].Body.Index
				)
				.slice(0, 30)
				.map(eventHash => {
					const event = hg[publicKey][eventHash];
					const node: EventNode = new EventNode(
						event,
						eventHash,
						peerNode
					);

					this.eventNodes.push(node);
				});

			this.peerNodes.push(peerNode);
		});
	}

	public assignParents() {
		for (const node of this.eventNodes) {
			const firstParentNode = this.eventNodes.find(
				n => n.hash === node.event.Body.Parents[0]
			);
			const secondParentNode = this.eventNodes.find(
				n => n.hash === node.event.Body.Parents[1]
			);

			if (firstParentNode) {
				node.parents.push(firstParentNode);
			}

			if (secondParentNode) {
				node.parents.push(secondParentNode);
			}

			node.setInitialPos();
		}
	}

	public assignRounds() {
		const rounds = this.graph.Rounds;

		for (const [i, round] of rounds.entries()) {
			Object.keys(round.CreatedEvents).map(eventHash => {
				const event = this.eventNodes.find(e => e.hash === eventHash);

				if (!event) {
					return;
				}

				event.round = i;
			});
		}
	}

	public propagate() {
		console.log('Propagating: ', this.eventNodes.length, ' nodes');
		const firstNode = this.eventNodes.find(e => e.round === 0);

		if (firstNode) {
			this.findChildren(firstNode);
		}

		console.log('Propagating finished...');
	}

	// Private utility functions
	private findChildren(parent: EventNode) {
		const children: EventNode[] = [];

		for (const node of this.eventNodes) {
			if (node.parents.find(p => p.hash === parent.hash)) {
				children.push(node);
			}
		}

		for (const child of children) {
			child.y =
				parent.y + CONSTANTS.EVENT_RADIUS * CONSTANTS.SPACING_MULT;

			// recursion
			this.findChildren(child);
		}
	}
}

export default HashgraphParser;

// let unsetEvents = this.eventNodes.filter(
// 	e => e.parents.length && e.y === -1
// ).length;
// let lastLength = unsetEvents;
// while (unsetEvents > 0) {
// 	for (const e of this.eventNodes) {
// 		if (e.parents.length && e.y === -1) {
// 			if (e.parents.map(p => p.y).reduce((p, n) => p + n) > 0) {
// 				const sortedParents = e.parents.sort(
// 					(a, b) => b.y - a.y
// 				);
// 				const higherParent = sortedParents[0];
// 				e.y = higherParent.y + 70;
// 				const neighbour = this.eventNodes.find(n => {
// 					return (
// 						n.y >= e.y &&
// 						n.hash !== e.hash &&
// 						n.round < e.round
// 					);
// 				});
// 				if (neighbour) {
// 					e.y = neighbour.y + 70;
// 				}
// 			}
// 		}
// 	}
// 	unsetEvents = this.eventNodes.filter(e => e.y === -1).length;
// 	if (lastLength === unsetEvents) {
// 		console.log('Nothing more to do!');
// 		return;
// 	}
// 	lastLength = unsetEvents;
// }
