import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

import Avatar from './Avatar';

import { Validator } from '../client';
import { networkInfos, networkValidators } from '../selectors';
import { pubKeyToAddress } from '../utils';

import GreenDot from '../assets/green-dot.png';
import RedDot from '../assets/red-dot.png';

const Green = styled.div`
	color: darkgreen !important;
	font-weight: bold !important;
`;

const stateStyling = (state: string) => {
	switch (state) {
		case 'Babbling':
			return <Green>Babbling</Green>;
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
	onClickHandler: (v: Validator) => () => void;
};

const Validators: React.FC<Props> = props => {
	const validators = useSelector(networkValidators);
	const infos = useSelector(networkInfos);

	const rendervalidators = () => {
		return validators.map(v => {
			const info = infos.filter(i => i.validator.id === v.id)[0];
			const address = pubKeyToAddress(v.public_key);

			return (
				<tr key={v.moniker}>
					<td>
						<Link to={`/validator/${v.id}`}>
							<Avatar address={address} size={30} />
						</Link>
					</td>
					<td>
						{v.reachable ? (
							<Image src={GreenDot} width="10" />
						) : (
							<Image src={RedDot} width="10" />
						)}
					</td>
					<td>{v.moniker}</td>
					<td className="mono">
						<Link to={`/search/0x${address}`}>
							0x
							{address}
						</Link>
					</td>
					<td>{stateStyling(info && info.state)}</td>
					<td>
						{/* <Link to={`/block/${info.last_block_index}`}> */}
						{info && info.last_block_index}
						{/* </Link> */}
					</td>
					<td>{info && info.last_consensus_round}</td>
					<td>{info && info.consensus_events}</td>
					<td>{info && info.undetermined_events}</td>
					<td>{info && info.min_gas_price}</td>
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
						<th>Status</th>
						<th>Moniker</th>
						<th>Address</th>
						<th>State</th>
						<th>Latest Block</th>
						<th>Last Round</th>
						<th>Events</th>
						<th>Undetermined Events</th>
						<th>Min Gas Price</th>
					</tr>
				</thead>
				<tbody>{rendervalidators()}</tbody>
			</STable>
		</>
	);
};

export default Validators;
