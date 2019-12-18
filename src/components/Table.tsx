import React from 'react';

import styled from 'styled-components';

import BTable from 'react-bootstrap/Table';

export const STable = styled(BTable)`
	background: white !important;
	border-radius: 3px !important;

	td {
		/* padding: 15px 10px !important; */

		a {
			color: #444 !important;
			text-decoration: none !important;
		}

		a:hover {
			color: #000 !important;
		}
	}

	tfoot {
		text-align: center;
		font-weight: 700;
		border-bottom: 1px solid #EEE;
		background: #fafafa;
		font-size: 13px;

		td {
			padding: 10px 0 !important;
			border-radius: 3px !important;
		}
	}
`;

const Table: React.FC<{}> = props => {
	return <STable responsive={true}>{props.children}</STable>;
};

export default Table;
