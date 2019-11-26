import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';

import Avatar from './Avatar';

import { Validator } from '../client';
import { STable } from '../components/styles';
import { pubKeyToAddress } from '../utils';

import GREEN from '../assets/green-dot.png';
import RED from '../assets/red-dot.png';

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
						<td className="text-center">
							{v.reachable ? (
								<Image src={GREEN} width="12" />
							) : (
								<Image src={RED} width="12" />
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
