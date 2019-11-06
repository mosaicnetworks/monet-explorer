import React, { useEffect, useState } from 'react';

import { Layer, Stage } from 'react-konva';

import Container from 'react-bootstrap/Container';

import Loader from '../components/Loader';

import { Event, EventNode, Peer, PeerNode } from '../hashgraph';

import ExplorerAPIClient from '../client';
import HGParser from '../hashgraph/HashgraphParser';

const Hashgraph: React.FC<{}> = () => {
	const client = new ExplorerAPIClient();

	const [loading, setLoading] = useState<boolean>(false);
	const [peerNodes, setPeerNodes] = useState<PeerNode[]>([]);
	const [eventNodes, setEventNodes] = useState<EventNode[]>([]);

	const fetchData = async () => {
		setLoading(true);
		const parser = new HGParser(await client.getHashgraph());

		setPeerNodes(parser.peerNodes);
		setEventNodes(parser.eventNodes);

		setLoading(false);
	};

	// draw fns
	const drawPeers = () =>
		peerNodes.map(p => <Peer key={p.publicKey} node={p} />);

	const drawEvents = () =>
		eventNodes.map(e => <Event key={e.hash} node={e} />);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container fluid={true}>
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
				height={window.innerHeight - 100}
			>
				<Layer>
					{drawPeers()}
					{drawEvents()}
				</Layer>
			</Stage>
		</Container>
	);
};

export default Hashgraph;
