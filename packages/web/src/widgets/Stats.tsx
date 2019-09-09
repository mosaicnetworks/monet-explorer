import React, { useEffect, useState } from 'react';

import { IBabblePeer } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';
import { JsonToTable } from 'react-json-to-table';

import { IMonetInfo } from '../monet';

import Box from '../components/Box';

interface IProps {
	peer?: IBabblePeer;
}

const Info: React.FC<IProps> = props => {
	const [info, setInfo] = useState<IMonetInfo>();

	const fetchInfo = async () => {
		if (!props.peer) {
			return;
		}

		try {
			const l = props.peer.NetAddr.split(':');
			const node = new Monet(l[0], 8080);

			const i = await node.getInfo<IMonetInfo>();

			setInfo(i);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchInfo();
	}, []);

	return (
		<Box padding={false} heading={'Detail'}>
			<JsonToTable json={info} />
		</Box>
	);
};

export default Info;
