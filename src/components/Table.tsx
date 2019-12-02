import React from 'react';

import { STable } from './styles';

const Table: React.FC<{}> = props => {
	return <STable responsive={true}>{props.children}</STable>;
};

export default Table;
