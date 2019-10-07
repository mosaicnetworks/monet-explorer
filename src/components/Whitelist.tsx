import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

import { monet } from '../monet';

import POA, { WhitelistEntry } from '../poa';

const STable = styled(Table)`
	td {
		font-family: 'Fira Code', monospace;
		font-size: 14px;
	}

	tr {
		transition: background 0.2s ease-in;
	}

	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.02);
	}

	tbody tr:nth-of-type(odd):hover {
		background: rgba(226, 110, 64, 0.1) !important;
	}

	tbody tr:hover {
		cursor: pointer;
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
						<th>Moniker</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{whitelist.map(wle => (
						<tr key={wle.address}>
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
