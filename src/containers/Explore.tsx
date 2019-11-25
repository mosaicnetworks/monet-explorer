import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Utils, { Currency } from 'evm-lite-utils';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Form from 'react-bootstrap/Form';
import Avatar from '../components/Avatar';
import Block from '../components/Block';
import Loader from '../components/Loader';
import Transaction from '../components/Transaction';

import { SContent } from '../components/styles';

import { Block as TBlock } from '../client';
import { fetchNetworkBlocks, fetchTransactions } from '../modules/dashboard';
import {
	selectBlocks,
	selectBlocksLoading,
	selectTransactions,
	selectTxsLoading
} from '../selectors';
import { commaSeperate, pubKeyToAddress } from '../utils';

import Background from '../assets/bg.svg';

const RLP = require('rlp');

const SBlockAvatar = styled.div`
	font-size: 20px;
	background: #eee;
	padding: 20px;
	border-radius: 5px !important;
	color: black !important;
	text-decoration: none !important;
	border: 1px solid #ddd;

	p {
		margin: 0 !important;
	}

	&a:hover {
		text-decoration: none !important;
	}
`;

function toHex(str: string) {
	let result = '';

	for (var i = 0; i < str.length; i++) {
		result += str.charCodeAt(i).toString(16);
	}
	return result;
}

function convertStringToUTF8ByteArray(str: string) {
	const binaryArray = new Uint8Array(str.length);

	Array.prototype.forEach.call(binaryArray, (el, idx, arr) => {
		arr[idx] = str.charCodeAt(idx);
	});

	return binaryArray;
}

const STable = styled(Table)`
	margin-bottom: 0 !important;

	td {
		font-size: 14px;
	}
`;

const SSearchContainer = styled.div`
	padding: 15px 15px;
	width: 100%;
	background: url(${Background});
	box-shadow: 0 1px 20px rgba(0, 0, 0, 0.3) !important;
	border-radius: 5px !important;
	margin-bottom: 30px;

	h5 {
		font-size: 16px;
		margin-bottom: 10px;
		color: white !important;
	}
`;

const SLink = styled(Link)`
	text-decoration: none !important;
`;

const Explore: React.FC<{}> = props => {
	const dispatch = useDispatch();

	const loading = useSelector(selectBlocksLoading);
	const txLoading = useSelector(selectTxsLoading);

	const blocks = useSelector(selectBlocks);
	const transactions = useSelector(selectTransactions);

	const fetchBlocks = () => dispatch(fetchNetworkBlocks());
	const fetchTxs = () => dispatch(fetchTransactions());

	useEffect(() => {
		fetchBlocks();
		fetchTxs();
	}, []);

	useEffect(() => {
		ReactTooltip.rebuild();
	}, [blocks]);

	return (
		<Container fluid={false}>
			{/* <SSearchContainer>
				<h5>Search Monet Explorer</h5>
				<Form.Control
					type="text"
					placeholder="Transaction Hash, Address, Public Key"
				/>
			</SSearchContainer> */}
			<Row>
				<Col md={12} lg={7}>
					<SContent>
						<span>
							Recent Blocks <Loader loading={loading} size={20} />
						</span>
						<div>
							{blocks.map(b => (
								<SLink key={b.index} to={`block/${b.index}/`}>
									<Block block={b} />
								</SLink>
							))}
						</div>
					</SContent>
				</Col>
				<Col md={12} lg={5}>
					<SContent>
						<span>
							Recent Transactions{' '}
							<Loader loading={txLoading} size={20} />
						</span>
						<div>
							<STable>
								<thead>
									<tr>
										<th>From</th>
										<th>To</th>
										<th>Value</th>
										<th>Gas</th>
										<th>Gas Price</th>
										<th className="text-center">
											Contract Call?
										</th>
									</tr>
								</thead>
								<tbody>
									{transactions.map(t => (
										<tr key={t.data}>
											<td>
												<Avatar
													address={t.sender}
													size={35}
												/>
											</td>
											<td>
												<Avatar
													address={t.to}
													size={35}
												/>
											</td>
											<td>
												{commaSeperate(
													new Currency(
														t.amount === '0'
															? 0
															: t.amount + 'a'
													)
														.format('T')
														.slice(0, 1)
												)}
												T
											</td>
											<td>{commaSeperate(t.gas)}</td>
											<td>{t.gas_price}</td>
											<td className="text-center">
												{(t.payload.length > 0 && (
													<img
														src="https://image.flaticon.com/icons/svg/1828/1828640.svg"
														width={20}
													/>
												)) ||
													'-'}
											</td>
										</tr>
									))}
								</tbody>
							</STable>
						</div>
					</SContent>
				</Col>
			</Row>
		</Container>
	);
};

export default Explore;
