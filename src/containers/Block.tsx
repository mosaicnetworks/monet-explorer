import React from 'react';

import styled from 'styled-components';

import { Currency } from 'evm-lite-utils';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';
import Signature from '../components/Signature';
import Table from '../components/Table';

import { SContent, SJumbotron, SSection } from '../components/styles';

import { selectBlock } from '../selectors';

type Props = {
	index: string;
};

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
				<SJumbotron>
					<Container>
						<Row className="align-items-center">
							<Col>
								<h1>Block #{block.index}</h1>
								<p className="mono">{block.state_hash}</p>
							</Col>
						</Row>
					</Container>
				</SJumbotron>
				<SSection>
					<Container>
						<Row>
							<Col md={6}>
								<Row>
									<Col md={12}>
										<SContent>
											<h3>Transactions</h3>
											<Table>
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
											</Table>
										</SContent>
									</Col>
								</Row>
								<br />
								<Row>
									<Col md={12}>
										<SContent>
											<h3>Internal Transactions</h3>
											<div className="padding pad mono">
												{block.internal_transactions.map(
													t => (
														<>
															<code>
																<pre>
																	{JSON.stringify(
																		JSON.parse(
																			t.data.replace(
																				/'/g,
																				'"'
																			)
																		),
																		null,
																		4
																	)}
																</pre>
															</code>
														</>
													)
												)}
											</div>
										</SContent>
									</Col>
								</Row>
							</Col>
							<Col md={6}>
								<SContent>
									<h3>Signatures</h3>
									<div className="padding pad">
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
				</SSection>
			</>
		)) || <></>
	);
};

export default Block;
