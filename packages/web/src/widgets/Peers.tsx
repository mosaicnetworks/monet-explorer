import React, { useEffect, useState } from 'react';

import { IBabblePeer } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';
import { useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';

import { IConfigState, IStore } from '@monetexplorer/redux';

import Box from '../components/Box';

interface IProps {
	onClickPeer: (peer: IBabblePeer) => () => void;
}

const Peers: React.FC<IProps> = props => {
	const config = useSelector<IStore, IConfigState>(store => store.config);

	const [peers, setPeers] = useState<IBabblePeer[]>([]);

	const n = new Monet(config.host, config.port);

	const fetchPeers = async () => {
		try {
			const p = await n.consensus!.getPeers();
			setPeers(p);
		} catch (e) {
			console.log(e);
		}
	};

	const renderPeers = () => {
		return peers.map(peer => {
			return (
				<Table.Row onClick={props.onClickPeer(peer)} key={peer.Moniker}>
					<Table.Cell>{peer.Moniker}</Table.Cell>
					<Table.Cell>{peer.NetAddr}</Table.Cell>
					<Table.Cell>{peer.PubKeyHex}</Table.Cell>
				</Table.Row>
			);
		});
	};

	/** Polling functionality */
	let poller: any;

	useEffect(() => {
		poller = setInterval(() => {
			fetchPeers().then(() => console.log('Fetching peers every 10s'));
		}, 10000);

		return () => clearInterval(poller);
	});

	return (
		<Box padding={false} heading={'Peers'}>
			<Table celled={true} fixed={true} striped={true}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell width={3}>Moniker</Table.HeaderCell>
						<Table.HeaderCell width={4}>NetAddr</Table.HeaderCell>
						<Table.HeaderCell>Public Key</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{renderPeers()}</Table.Body>
			</Table>
		</Box>
	);
};

export default Peers;
