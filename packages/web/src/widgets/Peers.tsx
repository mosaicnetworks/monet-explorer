import React from 'react';

import { IBabblePeer } from 'evm-lite-consensus';

import Box from '../components/Box';
import PeersTable from '../components/PeersTable';

interface IProps {
	peers: IBabblePeer[];
}

const Peers: React.FC<IProps> = props => {
	return (
		<Box padding={false} heading={'Peers'}>
			<PeersTable peers={props.peers} />
		</Box>
	);
};

export default Peers;
