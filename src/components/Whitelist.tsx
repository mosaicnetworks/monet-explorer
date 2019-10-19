import React from 'react';

import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

import { useSelector } from 'react-redux';

import Avatar from '../components/Avatar';

import { selectWhitelist } from '../selectors';

const STable = styled(Table)`
	margin-bottom: 0px !important;

	td {
		font-size: 14px;
	}

	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.02);
	}
`;

const Whitelist: React.FC<{}> = () => {
	const whitelist = useSelector(selectWhitelist);

	return (
		<>
			<STable
				id="blocksTable"
				bordered={false}
				responsive={true}
				striped={true}
				cellPadding={'1px'}
			>
				<thead>
					<tr>
						<th>Profile</th>
						<th>Moniker</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{whitelist.map(wle => (
						<tr key={wle.address}>
							<td>
								<Avatar address={wle.address} size={30} />
							</td>
							<td>{wle.moniker}</td>
							<td className="mono">{wle.address}</td>
						</tr>
					))}
				</tbody>
			</STable>
		</>
	);
};

export default Whitelist;
