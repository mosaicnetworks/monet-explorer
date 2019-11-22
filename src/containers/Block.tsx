import React from 'react';

import styled from 'styled-components';

import Utils, { Currency } from 'evm-lite-utils';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Avatar from '../components/Avatar';
import Signature from '../components/Signature';

import { SContent } from '../components/styles';

import { selectBlock } from '../selectors';

type Props = {
	index: string;
};

const STable = styled(Table)`
	margin-bottom: 0 !important;

	td {
		font-size: 14px;
	}
`;

const SBlockAvatar = styled.div`
	transition: background 0.2s ease-out;
	/* font-size: 15px; */
	background: #eee;
	padding: 20px 15px;
	border-radius: 5px !important;
	color: black !important;
	text-decoration: none !important;
	font-weight: 700;
	display: flex !important;
	text-align: center !important;
	height: 100%;
	font-size: 17px;
	font-family: Monet;
	align-items: center;
`;

const Block: React.FC<RouteComponentProps<Props>> = props => {
	const block = useSelector(selectBlock(Number(props.match.params.index)));

	return (
		(block && (
			<>
				<Container>
					<Row>
						<Col>
							<Row>
								<Col md={12}>
									<SContent>
										<span>
											Block {block && block.index}
										</span>
										<div className="padding">
											<Media>
												<SBlockAvatar className="mr-2 align-items-center">
													#{block.index}
												</SBlockAvatar>
												<Media.Body>
													<p>
														<b>State Hash: </b>
														<div className="mono">
															{block.state_hash}
														</div>
													</p>
													<p>
														<b>Frame Hash: </b>
														<div className="mono">
															{block.frame_hash}
														</div>
													</p>
												</Media.Body>
											</Media>
										</div>
									</SContent>
								</Col>
								<Col md={12}>
									<SContent>
										<span>Transactions</span>
										<div className="padding">
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
													{block.transactions.map(
														t => (
															<>
																<tr
																	key={t.data}
																>
																	<td>
																		<Avatar
																			address={
																				t.sender
																			}
																			size={
																				35
																			}
																		/>
																	</td>
																	<td>
																		<Avatar
																			address={
																				t.to
																			}
																			size={
																				35
																			}
																		/>
																	</td>
																	<td>
																		{new Currency(
																			t.amount ===
																			'0'
																				? 0
																				: t.amount +
																				  'a'
																		).format(
																			'T'
																		)}
																	</td>
																	<td>
																		{t.gas}
																	</td>
																	<td>
																		{
																			t.gas_price
																		}
																	</td>
																	<td className="text-center">
																		{(t
																			.payload
																			.length >
																			0 && (
																			<img
																				src="https://image.flaticon.com/icons/svg/1828/1828640.svg"
																				width={
																					20
																				}
																			/>
																		)) ||
																			'-'}
																	</td>
																</tr>
															</>
														)
													)}
												</tbody>
											</STable>
										</div>
									</SContent>
								</Col>
							</Row>
						</Col>
						<Col md={6}>
							<SContent>
								<span>Signatures</span>
								<div className="padding">
									{block.signatures.map(s => (
										<Signature
											key={s.signature}
											validator={s.validator}
											signature={s.signature}
										/>
									))}
								</div>
							</SContent>
						</Col>
					</Row>
				</Container>
			</>
		)) || <></>
	);
};

export default Block;
