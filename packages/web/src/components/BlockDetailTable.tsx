import React from 'react';

import { IBabbleBlock } from 'evm-lite-consensus';
import { JsonToTable } from 'react-json-to-table';

interface IProps {
	block: IBabbleBlock;
}

const BlockDetailTable: React.FC<IProps> = props => {
	return (
		<>
			<JsonToTable json={props.block} />
		</>
	);
};

export default BlockDetailTable;
