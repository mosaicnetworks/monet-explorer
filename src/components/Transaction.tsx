import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import Avatar from './Avatar';
import Signature from './Signature';

import { Block as TBlock, Transaction as TTx } from '../client';
import { pubKeyToAddress } from '../utils';

const SBlock = styled.div`
	transition: background 0.2s ease-out;
	border-bottom: 1px solid #eee;
	/* padding-bottom: 5px; */
	display: block;
	/* padding: 15px; */
	cursor: pointer;

	a:hover {
		text-decoration: none !important;
	}

	:hover {
		background: #f9f9f9 !important;
	}

	.container-fluid {
		padding: 0 !important;
	}

	.active {
		background: var(--blue) !important;
		color: white !important;
		text-decoration: none !important;
	}

	.badge {
		/* background: var(--blue); */
		/* display: block !important; */
		/* margin: 5px; */
		/* border-radius: 0; */
		margin: 0;
		font-size: 12px;
		padding: 5px 7px;
	}
	.badge + .badge {
		margin: 5px;
	}
`;

const SBlockAvatar = styled.div`
	transition: background 0.2s ease-out;
	/* font-size: 15px; */
	color: black !important;
	text-decoration: none !important;
	cursor: pointer;
	font-weight: 700;
	display: inline-flex !important;
	text-align: center !important;
	height: 100%;
	font-size: 17px;
	font-family: Monet;
	align-items: center;
	margin-left: 5px !important;
`;

const STable = styled(Table)`
	margin-bottom: 0 !important;

	td {
		font-size: 14px;
	}
`;

type Props = {
	transaction: TTx;
};

const Transaction: React.FC<Props> = ({ transaction }) => {
	return (
		<SBlock>
			<STable>
				<thead>
					<tr>
						<th>From</th>
						<th>To</th>
						<th>Value</th>
						<th>Fee</th>
						<th className="text-center">Contract Call?</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<Avatar
								address={
									'0xda37bd41430c3242423d155bbd9b0e535067bbb3'
								}
								size={35}
							/>
						</td>
						<td>
							<Avatar
								address={
									'0xb7f0d947278c3a49db3da85214716a61b5ca41ee'
								}
								size={35}
							/>
						</td>
						<td>12T</td>
						<td>0.12T</td>
						<td className="text-center">
							<img
								src="https://image.flaticon.com/icons/svg/1828/1828640.svg"
								width={20}
							/>
						</td>
					</tr>
				</tbody>
			</STable>
		</SBlock>
	);
};

export default Transaction;
