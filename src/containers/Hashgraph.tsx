import React, { useEffect, useState } from 'react';

import { Layer, Stage } from 'react-konva';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Loader from '../components/Loader';

import {
	CONSTANTS,
	Event,
	EventNode,
	MappedParticipantEvents,
	Node
} from '../components/hashgraph';

import ExplorerAPIClient from '../client';

import { GraphInfo, ParticipantEvents } from '../monet';

const Hashgraph: React.FC<{}> = () => {
	const c = new ExplorerAPIClient();

	const [loading, setLoading] = useState(false);
	const [hashgraph, setHashgraph] = useState<MappedParticipantEvents>({});

	const fetchHashgraph = async () => {
		setLoading(true);

		const hg: GraphInfo = await c.getHashgraph();
		parseEvents(hg.ParticipantEvents);

		setLoading(false);
	};

	const parseEvents = (hg: ParticipantEvents) => {
		const allEventNodes: EventNode[] = [];
		const h: MappedParticipantEvents = {};

		Object.keys(hg).map((publicKey, peerIndex) => {
			const eventNodes: EventNode[] = [];

			Object.keys(hg[publicKey])
				.sort(
					(a, b) =>
						hg[publicKey][a].Body.Index -
						hg[publicKey][b].Body.Index
				)
				.map((eventHash, eventIndex) => {
					const event = hg[publicKey][eventHash];
					const node: EventNode = {
						parents: [],
						data: event,
						hash: eventHash,
						x:
							CONSTANTS.NODE_WIDTH / 2 +
							CONSTANTS.SPACING_MULT *
								CONSTANTS.NODE_WIDTH *
								peerIndex,
						y:
							CONSTANTS.EVENT_RADIUS +
							CONSTANTS.EVENT_RADIUS *
								CONSTANTS.SPACING_MULT *
								(eventIndex + 1)
					};

					eventNodes.push(node);
					allEventNodes.push(node);
				});

			h[publicKey] = eventNodes;
		});

		// Map parents
		Object.keys(h).map(publicKey => {
			const events = h[publicKey];

			for (const event of events) {
				const firstParentNode = allEventNodes.find(
					n => n.hash === event.data.Body.Parents[0]
				);
				const secondParentNode = allEventNodes.find(
					n => n.hash === event.data.Body.Parents[1]
				);

				if (firstParentNode) {
					event.parents.push(firstParentNode);
				}

				if (secondParentNode) {
					event.parents.push(secondParentNode);
				}
			}
		});

		setHashgraph(h);
	};

	useEffect(() => {
		fetchHashgraph();
	}, []);

	// draw fns
	const drawNodes = () =>
		Object.keys(hashgraph).map((pk, i) => (
			<Node
				key={pk}
				publicKey={pk}
				x={i * (CONSTANTS.SPACING_MULT * CONSTANTS.NODE_WIDTH)}
				y={0}
			/>
		));

	const drawEvents = (pk: string) =>
		hashgraph![pk].map((e, i) => <Event key={`${pk}/${i}`} node={e} />);

	return (
		<Container fluid={true}>
			<Button
				variant="warning"
				onClick={() => console.log(JSON.stringify(hashgraph))}
			>
				Reload
			</Button>
			<Loader loading={loading} />
			<Stage
				draggable={true}
				dragBoundFunc={pos => {
					return {
						x: 0,
						y: pos.y
					};
				}}
				style={{ border: '1px solid #DDD' }}
				width={window.innerWidth}
				height={600}
			>
				<Layer>
					{drawNodes()}
					{Object.keys(hashgraph || {}).map(pk => drawEvents(pk))}
				</Layer>
			</Stage>
		</Container>
	);
};

export default Hashgraph;
