import React from 'react';

import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

import Avatar from './Avatar';

import { Validator } from '../client';

const keccak256 = require('js-sha3').keccak256;

const STable = styled(Table)`
	margin-bottom: 0px !important;

	transition: background 0.3s cubic-bezier(1, 1, 1, 1);

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
		background: rgba(226, 110, 64, 0.1) !important;
	}
`;

type Props = {
	peers: Validator[];
};

const Peers: React.FC<Props> = props => {
	const rendervalidators = () => {
		return props.peers.map(v => {
			const pubKeyBuffer = Buffer.from(
				v.public_key.slice(4, v.public_key.length),
				'hex'
			);

			const address = Buffer.from(keccak256(pubKeyBuffer), 'hex')
				.slice(-20)
				.toString('hex');

			return (
				<tr key={v.moniker}>
					<td>
						<Avatar address={address} size={30} />
					</td>
					<td>{v.moniker}</td>
					<td className="mono">
						0x
						{address}
					</td>
				</tr>
			);
		});
	};

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
				<tbody>{rendervalidators()}</tbody>
			</STable>
		</>
	);
};

export default Peers;
