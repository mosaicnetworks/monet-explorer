import React from 'react';

import Box from '../components/Box';
import InfosTable from '../components/InfosTable';

import { IMonetInfo } from '../monet';

interface IProps {
	infos: IMonetInfo[];
}

const NetworkStats: React.FC<IProps> = props => {
	return (
		<Box padding={false} heading={'Network Statistics'}>
			<InfosTable infos={props.infos} />
		</Box>
	);
};

export default NetworkStats;
