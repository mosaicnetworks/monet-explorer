import React from 'react';

import { JsonToTable } from 'react-json-to-table';

import { IMonetInfo } from '../monet';

import Box from '../components/Box';

interface IProps {
	info: IMonetInfo;
}

const Info: React.FC<IProps> = props => {
	return (
		<Box padding={false} heading={'Detail'}>
			<JsonToTable json={props.info} />
		</Box>
	);
};

export default Info;
