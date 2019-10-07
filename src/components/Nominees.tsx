import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

import { monet } from '../monet';

import POA, { NomineeEntry } from '../poa';

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

const Nominees: React.FC<{}> = () => {
	const [nominees, setNominees] = useState<NomineeEntry[]>([]);

	const fetchNominees = async () => {
		const poaData = await monet.getPOA();
		const poa = new POA(poaData.address, JSON.parse(poaData.abi));

		const n = await poa.nominees();

		setNominees(nominees);
	};

	useEffect(() => {
		fetchNominees();
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
						<th>Up Votes</th>
						<th>Down Votes</th>
					</tr>
				</thead>
				<tbody>
					{nominees.map(n => (
						<tr key={n.address}>
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
