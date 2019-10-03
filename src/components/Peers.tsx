import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { IBabblePeer } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';

import Table from 'react-bootstrap/Table';

import { config } from '../monet';

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
		background: rgba(226, 110, 64, 0.1) !important;
	}
`;

const Peers: React.FC<{}> = () => {
	const n = new Monet(config.host, config.port);

	const [peers, setPeers] = useState<IBabblePeer[]>([]);

	const fetchPeers = async () => {
		try {
			const p = await n.consensus!.getPeers();
			setPeers(p);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchPeers();
	}, []);

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
						<th>Net Addr</th>
					</tr>
				</thead>
				<tbody>
					{peers.map(peer => (
						<tr key={peer.Moniker}>
							<td>{peer.Moniker}</td>
							<td>{peer.NetAddr}</td>
						</tr>
					))}
				</tbody>
			</STable>
		</>
	);
};

export default Peers;
