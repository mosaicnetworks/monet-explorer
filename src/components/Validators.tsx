import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

import Avatar from './Avatar';

import { Validator } from '../client';
import { pubKeyToAddress } from '../utils';

import GreenDot from '../assets/green-dot.png';
import RedDot from '../assets/red-dot.png';

const Green = styled.div`
	color: var(--green) !important;
	font-weight: bold !important;
`;

const Orange = styled.div`
	color: var(--orange) !important;
	font-weight: bold !important;
`;

const stateStyling = (state: string) => {
	switch (state) {
		case 'Babbling':
			return <Green>Babbling</Green>;
		case 'Suspended':
			return <Orange>Suspended</Orange>;
		default:
			return state;
	}
};

const STable = styled(Table)`
	margin-bottom: 0px !important;

	transition: background 0.3s cubic-bezier(1, 1, 1, 1);

	td {
		font-size: 14px;
		a {
			color: #444 !important;
			text-decoration: none !important;
		}

		a:hover {
			color: #000 !important;
		}
	}

	tr {
		transition: background 0.2s ease-in;
	}

	tbody tr:nth-of-type(odd) {
		/* background-color: rgba(0, 0, 0, 0.02); */
	}

	tbody tr:nth-of-type(odd):hover {
		/* background: rgba(226, 110, 64, 0.1) !important; */
	}

	tbody tr:hover {
		/* cursor: pointer; */
		/* background: rgba(226, 110, 64, 0.1) !important; */
	}
`;

type Props = {
	validators: Validator[];
	hideStatus?: boolean;
};

const Validators: React.FC<Props> = props => {
	const rendervalidators = () => {
		return props.validators.map(v => {
			const address = pubKeyToAddress(v.public_key);

			return (
				<tr key={v.moniker}>
					<td>
						<Link
							data-tip={`${v.moniker} - ${
								v.reachable ? 'Online' : 'False'
							}`}
							to={`/validator/${v.public_key}`}
						>
							<Avatar address={address} size={30} />
						</Link>
					</td>
					{!props.hideStatus && (
						<td>
							{v.reachable ? (
								<Image src={GreenDot} width="12" />
							) : (
								<Image src={RedDot} width="12" />
							)}
						</td>
					)}

					<td>{v.moniker}</td>
					<td className="mono">
						<Link
							data-tip={'View Address Details'}
							to={`/search/0x${address}`}
						>
							0x
							{address}
						</Link>
					</td>
					<td>{stateStyling(v.info.state)}</td>
					<td>{v.info.last_block_index}</td>
					<td>{v.info.last_consensus_round}</td>
					<td>{v.info.min_gas_price}</td>
					<td className="mono">
						{v.version.monetd && 'v'}
						{v.version.monetd}
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
						<th>Profile</th>
						{!props.hideStatus && <th>Service</th>}
						<th>Moniker</th>
						<th>Address</th>
						<th>State</th>
						<th>Latest Block</th>
						<th>Last Round</th>
						<th>Min Gas Price</th>
						<th>Version</th>
					</tr>
				</thead>
				<tbody>{rendervalidators()}</tbody>
			</STable>
		</>
	);
};

export default Validators;
