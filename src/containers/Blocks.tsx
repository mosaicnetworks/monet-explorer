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

import Avatar from '../components/Avatar';
import Block from '../components/Block';
import Loader from '../components/Loader';

import { SContent } from '../components/styles';

import { Block as TBlock } from '../client';
import { fetchNetworkBlocks, fetchTransactions } from '../modules/dashboard';
import {
	selectBlocks,
	selectBlocksLoading,
	selectTxsLoading,
	selectTransactions
} from '../selectors';
import { commaSeperate, pubKeyToAddress } from '../utils';

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

const Blocks: React.FC<{}> = props => {
	const dispatch = useDispatch();

	const loading = useSelector(selectBlocksLoading);
	const txLoading = useSelector(selectTxsLoading);

	const blocks = useSelector(selectBlocks);
	const transactions = useSelector(selectTransactions);

	const [selectedBlock, setSelectedBlock] = useState<TBlock>({} as TBlock);

	const fetchBlocks = () => dispatch(fetchNetworkBlocks());
	const fetchTxs = () => dispatch(fetchTransactions());

	useEffect(() => {
		fetchBlocks();
		fetchTxs();
	}, []);

	useEffect(() => {
		if (blocks.length && Object.keys(selectedBlock).length === 0) {
			setSelectedBlock(blocks[0]);
		}

		ReactTooltip.rebuild();
	}, [blocks]);

	const onBlockClickBinder = (b: TBlock) => () => {
		setSelectedBlock(b);
		decode();
	};

	const decode = useCallback(() => {
		for (const rawTx of selectedBlock.transactions) {
			const b64decoded = atob(rawTx.data);
			const array = convertStringToUTF8ByteArray(b64decoded);
			const rlpDecoded = RLP.decode(array);

			console.log(b64decoded);
			console.log(array);
			console.log(rlpDecoded);
			for (const arr of rlpDecoded) {
				console.log(arr.toString('hex'));
			}
		}
	}, [selectedBlock]);

	return (
		<Container fluid={false}>
			<Row>
				<Col md={12}>
					<SContent>
						<span>Latest 30 Blocks</span>
						<div className="padding">
							{blocks.map(b => {
								return (
									<Block
										onClick={onBlockClickBinder(b)}
										active={
											selectedBlock &&
											selectedBlock.index === b.index
										}
										key={b.index}
										block={b}
									/>
								);
							})}
							<Loader loading={loading} />
						</div>
					</SContent>
					<Row>
						<Col md={12}>
							{Object.keys(selectedBlock).length > 0 && (
								<SContent>
									<span>Block #{selectedBlock.index}</span>
									<div className="padding">
										<Media>
											<SBlockAvatar className="mr-2 align-items-center">
												#{selectedBlock.index}
											</SBlockAvatar>
											<Media.Body>
												<p>
													<b>State Hash: </b>
													<div className="mono">
														{
															selectedBlock.state_hash
														}
													</div>
												</p>
												<p>
													<b>Frame Hash: </b>
													<div className="mono">
														{
															selectedBlock.frame_hash
														}
													</div>
												</p>
												<hr />
												<h6>Transactions</h6>
												<p>
													{selectedBlock.transactions.map(
														t => {
															const b64decoded = atob(
																t.data
															);
															const array = convertStringToUTF8ByteArray(
																b64decoded
															);
															const rlpDecoded = RLP.decode(
																array
															);

															return (
																<>
																	<hr />
																	<code
																		key={
																			t.data
																		}
																	>
																		To:{' '}
																		<Avatar
																			address={Utils.cleanAddress(
																				rlpDecoded[3].toString(
																					'hex'
																				)
																			)}
																			size={
																				25
																			}
																		/>
																		{Utils.cleanAddress(
																			rlpDecoded[3].toString(
																				'hex'
																			)
																		)}
																		<br />
																		Value:{' '}
																		{commaSeperate(
																			new Currency(
																				parseInt(
																					rlpDecoded[4].toString(
																						'hex'
																					),
																					16
																				) ||
																					0
																			)
																				.format(
																					'T'
																				)
																				.slice(
																					0,
																					-1
																				)
																		)}
																		T
																		<br />
																		Gas:{' '}
																		{commaSeperate(
																			parseInt(
																				rlpDecoded[2].toString(
																					'hex'
																				),
																				16
																			)
																		)}
																		<br />
																		Gas
																		Price:{' '}
																		{(
																			parseInt(
																				rlpDecoded[1].toString(
																					'hex'
																				),
																				16
																			) ||
																			0
																		).toString()}{' '}
																		Attoms
																	</code>
																</>
															);
														}
													)}
												</p>
												<br />
												<h6>Internal Transactions</h6>
												<hr />
												<p>
													{selectedBlock
														.internal_transactions
														.length === 0 && (
														<div>None</div>
													)}
													{selectedBlock.internal_transactions.map(
														t => (
															<code key={t.data}>
																<pre>
																	{t.data}
																</pre>
															</code>
														)
													)}
												</p>
												<br />
												<h6>Signatures</h6>
												<hr />
												<p>
													{selectedBlock.signatures.map(
														(s, i) => (
															<Link
																key={`signator${i}${s.signature}`}
																to={`/validator/${s.validator.public_key}`}
															>
																<Avatar
																	data-tip="awsome"
																	address={pubKeyToAddress(
																		s
																			.validator
																			.public_key
																	)}
																	size={35}
																/>
															</Link>
														)
													)}
												</p>
											</Media.Body>
										</Media>
									</div>
								</SContent>
							)}
						</Col>
					</Row>
				</Col>
				<Col md={12}>
					<SContent>
						<span>Latest 10 Transastions</span>
						<div>
							<STable
								id="blocksTable"
								bordered={false}
								responsive={true}
								striped={true}
								cellPadding={'1px'}
							>
								<thead>
									<tr>
										<th>From</th>
										<th>To</th>
										<th>Amount</th>
										<th>Gas</th>
										<th>Gas Price</th>
										<th>Contract Call</th>
									</tr>
								</thead>
								<tbody>
									{transactions.slice(0, 10).map(t => {
										const b64decoded = atob(t.data);
										const array = convertStringToUTF8ByteArray(
											b64decoded
										);
										const rlpDecoded = RLP.decode(array);

										return (
											<>
												<tr key={t.data}>
													<td>
														<Avatar
															address={''}
															size={35}
														/>
													</td>
													<td>
														<Avatar
															address={Utils.cleanAddress(
																rlpDecoded[3].toString(
																	'hex'
																)
															)}
															size={35}
														/>
													</td>
													<td>
														{commaSeperate(
															new Currency(
																parseInt(
																	rlpDecoded[4].toString(
																		'hex'
																	),
																	16
																) || 0
															)
																.format('T')
																.slice(0, -1)
														)}
														T
													</td>
													<td>
														{commaSeperate(
															parseInt(
																rlpDecoded[2].toString(
																	'hex'
																),
																16
															)
														)}
													</td>
													<td>
														{(
															parseInt(
																rlpDecoded[1].toString(
																	'hex'
																),
																16
															) || 0
														).toString()}{' '}
														Attoms
													</td>
													<td className="text-center">
														{rlpDecoded[5].length >
															0 && (
															<img
																src="https://image.flaticon.com/icons/svg/190/190411.svg"
																width={20}
															/>
														)}
													</td>
												</tr>
											</>
										);
									})}
									<Loader loading={txLoading} />
								</tbody>
							</STable>
						</div>
					</SContent>
				</Col>
			</Row>
		</Container>
	);
};

export default Blocks;
