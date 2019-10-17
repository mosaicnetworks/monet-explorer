import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

import { useSelector } from 'react-redux';
import { monet } from '../monet';

import POA, { NomineeEntry } from '../poa';

import Avatar from '../components/Avatar';

import { LOCAL_NETWORK, selectedNetwork, selectNominees } from '../selectors';

const STable = styled(Table)`
	margin-bottom: 0 !important;

	td {
		font-size: 14px;
	}

	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.02);
	}
`;

const Nominees: React.FC<{}> = () => {
	const nominees = useSelector(selectNominees);

	// Polling
	// let poller: any;

	// useEffect(() => {
	// 	poller = setInterval(() => {
	// 		fetchNominees().then(() =>
	// 			console.log('(60s) Fetching Nominees...')
	// 		);
	// 	}, 60000);

	// 	return () => clearInterval(poller);
	// });

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
						<th>Up Votes</th>
						<th>Down Votes</th>
					</tr>
				</thead>
				<tbody>
					{nominees.map(n => (
						<tr key={n.address}>
							<td>
								<Avatar address={n.address} size={40} />
							</td>
							<td>{n.moniker}</td>
							<td>{n.address}</td>
							<td>{n.upVotes}</td>
							<td>{n.downVotes}</td>
						</tr>
					))}
				</tbody>
			</STable>
		</>
	);
};

export default Nominees;
