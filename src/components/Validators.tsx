import React, { useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import Avatar from './Avatar';
import CValidator from './Validator';

import { Validator } from '../client';
import { networkInfos, networkValidators } from '../selectors';

const keccak256 = require('js-sha3').keccak256;

const Green = styled.div`
	color: darkgreen !important;
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
	onClickHandler: (v: Validator) => () => void;
};

const Validators: React.FC<Props> = props => {
	const validators = useSelector(networkValidators);
	const infos = useSelector(networkInfos);

	const rendervalidators = () => {
		return validators.map(v => {
			const info = infos.filter(i => i.validator.id === v.id)[0];

			const pubKeyBuffer = Buffer.from(
				v.public_key.slice(4, v.public_key.length),
				'hex'
			);

			const address = Buffer.from(keccak256(pubKeyBuffer), 'hex')
				.slice(-20)
				.toString('hex');

			return (
				<tr onClick={props.onClickHandler(v)} key={v.moniker}>
					<td>
						<Avatar address={address} size={30} />
					</td>
					<td>{v.moniker}</td>
					<td className="mono">
						0x
						{address}
					</td>
					<td>{stateStyling(info && info.state)}</td>
					<td>{info && info.last_block_index}</td>
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
