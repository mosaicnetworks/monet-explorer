import React, { useEffect, useState } from 'react';

import Node from 'evm-lite-core';

import { IBabblePeer } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';
import { useSelector } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';

import { IConfigState, IStore } from '@monetexplorer/redux';

import NetworkStatsWidget from '../widgets/NetworkStats';
import PeersWidget from '../widgets/Peers';
import StatsWidget from '../widgets/Stats';

import { IMonetInfo } from '../monet';

const Network: React.FC<{}> = () => {
	const config = useSelector<IStore, IConfigState>(store => store.config);

	// component scoped node
	const n = new Monet(config.host, config.port);

	const [peers, setPeers] = useState<IBabblePeer[]>([]);
	const [info, setInfo] = useState<IMonetInfo>();
	const [infos, setInfos] = useState<IMonetInfo[]>([]);

	const fetchPeers = async () => {
		try {
			const p = await n.consensus!.getPeers();
			setPeers(p);
		} catch (e) {
			console.log(e);
		}
	};

	const fetchInfo = async (peer: IBabblePeer) => {
		try {
			const l = peer.NetAddr.split(':');
			const node = new Node(l[0], 8080);

			const i = await node.getInfo<IMonetInfo>();

			setInfo(i);
		} catch (e) {
			console.log(e);
		}
	};

	const fetchInfos = async () => {
		const list: any[] = [];

		for (const peer of peers) {
			try {
				const l = peer.NetAddr.split(':');
				const node = new Node(l[0], 8080);

				const i = await node.getInfo();

				list.push(i);
			} catch (e) {
				console.log(e);
			}
		}

		setInfos(list);
	};

	useEffect(() => {
		fetchPeers();
	}, []);

	useEffect(() => {
		fetchInfos();
	}, [peers]);

	let poller: any;

	useEffect(() => {
		poller = setInterval(() => {
			fetchPeers().then(() => console.log('Fetching peers every 10s'));
		}, 10000);

		return () => clearInterval(poller);
	});

	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<NetworkStatsWidget infos={infos} />
				</Grid.Column>
				<Grid.Column width={6}>
					<PeersWidget peers={peers} />
					<StatsWidget info={info || ({} as IMonetInfo)} />
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Network;
