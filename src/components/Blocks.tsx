import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { IBabbleBlock } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';
import { useSelector } from 'react-redux';
import { Spring } from 'react-spring/renderprops';

import { config, MonetInfo } from '../monet';

import { Block } from '../client';
import { networkBlocks } from '../selectors';

const STable = styled(Table)`
	td {
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

type Props = {
	lastBlockIndexIncreaseHook: (index: number) => any;
};

const Blocks: React.FC<Props> = props => {
	const blocks = useSelector(networkBlocks);

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
						<th>#</th>
						<th># of Txs</th>
						<th># of Sigs</th>
						<th className="d-none d-lg-table-cell">State Hash</th>
						<th className="d-none d-lg-table-cell">Peers Hash</th>
						<th className="d-none d-lg-table-cell">
							Round Received
						</th>
					</tr>
				</thead>
				<tbody>
					{blocks.map(b => {
						return (
							<tr key={b.index + 'x'}>
								<td>{b.index}</td>
								<td>0</td>
								<td>0</td>
								<td className="d-none d-lg-table-cell">
									{b.state_hash}
								</td>
								<td className="d-none d-lg-table-cell">
									{b.peers_hash}
								</td>
								<td className="d-none d-lg-table-cell">
									{b.round_received}
								</td>
							</tr>
						);
					})}
				</tbody>
			</STable>
		</>
	);
};

export default Blocks;
