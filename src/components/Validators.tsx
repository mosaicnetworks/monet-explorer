import React, { useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import Avatar from './Avatar';
import CValidator from './Validator';

import { Validator } from '../client';
import { Store } from '../store';

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
	const validators = useSelector<Store, Validator[]>(
		store => store.networkValidators
	);

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
						<Avatar address={address} size={40} />
					</td>
					<td>{v.moniker}</td>
					<td>
						0x
						{address}
					</td>
					<td>Yes</td>
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
						<th>Whitelisted</th>
					</tr>
				</thead>
				<tbody>{rendervalidators()}</tbody>
			</STable>
		</>
	);
};

export default Validators;
