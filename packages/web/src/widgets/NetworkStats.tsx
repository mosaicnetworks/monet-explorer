import React from 'react';

import Box from '../components/Box';
import InfosTable from '../components/InfosTable';

import { IMonetInfo } from '../monet';

interface IProps {
	infos: IMonetInfo[];
}

const NetworkStats: React.FC<IProps> = props => {
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

	return (
		<Box padding={false} heading={'Network Statistics'}>
			<InfosTable infos={props.infos} />
		</Box>
	);
};

export default NetworkStats;
