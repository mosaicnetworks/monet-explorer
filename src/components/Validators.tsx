import React, { useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import Avatar from './Avatar';
import CValidator from './Validator';

import { Validator } from '../client';
import { networkInfos, networkValidators } from '../selectors';

const keccak256 = require('js-sha3').keccak256;

const STable = styled(Table)`
	margin-bottom: 0px !important;

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
		background: rgba(226, 110, 64, 0.3) !important;
	}

	tbody tr:hover {
		cursor: pointer;
		background: rgba(226, 110, 64, 0.3) !important;
	}
`;

type Props = {};

const Validators: React.FC<Props> = props => {
	const validators = useSelector(networkValidators);
	const infos = useSelector(networkInfos);

	// Selec validator
	const [selectVal, setSelectedVal] = useState<Validator>({} as Validator);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const onBlockClickBind = (validator: Validator) => (e: any) => {
		setSelectedVal(validator);
		handleShow();
	};

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
				<tr onClick={onBlockClickBind(v)} key={v.moniker}>
					<td>
						<Avatar address={address} size={30} />
					</td>
					<td>{v.moniker}</td>
					<td>
						0x
						{address}
					</td>
					<td>{info.state}</td>
					<td>{info.last_block_index}</td>
					<td>{info.last_consensus_round}</td>
					<td>{info.consensus_events}</td>
					<td>{info.min_gas_price}</td>
					<td>{info.undetermined_events}</td>
				</tr>
			);
		});
	};

	return (
		<>
			{Object.keys(selectVal).length > 0 && (
				<Modal
					size={'lg'}
					centered={true}
					show={show}
					onHide={handleClose}
				>
					<Modal.Header closeButton={true}>
						<Modal.Title>{selectVal.moniker}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<CValidator validator={selectVal} />
					</Modal.Body>
				</Modal>
			)}
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
						<th>State</th>
						<th>Last Block Index</th>
						<th>Last Consensus Round</th>
						<th>Consensus Events</th>
						<th>Min Gas Price</th>
						<th>Undetermined Events</th>
					</tr>
				</thead>
				<tbody>{rendervalidators()}</tbody>
			</STable>
		</>
	);
};

export default Validators;
