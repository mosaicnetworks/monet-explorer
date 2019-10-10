import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

import { monet } from '../monet';

import POA, { WhitelistEntry } from '../poa';

import Avatar from '../components/Avatar';

const STable = styled(Table)`
	margin-bottom: 0px !important;

	td {
		font-family: 'Fira Code', monospace;
		font-size: 14px;
	}

	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.02);
	}
`;

const Whitelist: React.FC<{}> = () => {
	const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);

	const fetchWhitelist = async () => {
		const poaData = await monet.getPOA();
		const poa = new POA(poaData.address, JSON.parse(poaData.abi));

		const wl = await poa.whitelist();

		setWhitelist(wl);
	};

	useEffect(() => {
		fetchWhitelist();
	});

	// Polling
	let poller: any;

	useEffect(() => {
		poller = setInterval(() => {
			fetchWhitelist().then(() =>
				console.log('(60s) Fetching Whitelist...')
			);
		}, 60000);

		return () => clearInterval(poller);
	});

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
						<th>Avatar</th>
						<th>Moniker</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{whitelist.map(wle => (
						<tr key={wle.address}>
							<td>
								<Avatar address={wle.address} size={40} />
							</td>
							<td>{wle.moniker}</td>
							<td>{wle.address}</td>
						</tr>
					))}
				</tbody>
			</STable>
		</>
	);
};

export default Whitelist;
