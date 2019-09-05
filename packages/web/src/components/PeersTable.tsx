import React from 'react';

import { IBabblePeer } from 'evm-lite-consensus';
import { Table } from 'semantic-ui-react';

interface IProps {
	peers: IBabblePeer[];
}

const PeersTable: React.FC<IProps> = props => {
	const renderPeers = () => {
		return props.peers.map(peer => {
			return (
				<Table.Row key={peer.Moniker}>
					<Table.Cell>{peer.Moniker}</Table.Cell>
					<Table.Cell>{peer.NetAddr}</Table.Cell>
					<Table.Cell>{peer.PubKeyHex}</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<>
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
		</>
	);
};

export default PeersTable;
