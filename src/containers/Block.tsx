import React from 'react';

import styled from 'styled-components';

import Utils, { Currency } from 'evm-lite-utils';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Media from 'react-bootstrap/Media';

import Avatar from '../components/Avatar';
import Signature from '../components/Signature';

import { SContent } from '../components/styles';

import { fetchNetworkBlocks } from '../modules/dashboard';
import { selectBlock } from '../selectors';
import { selectBlocks, selectBlocksLoading } from '../selectors';
import { commaSeperate, pubKeyToAddress } from '../utils';

const RLP = require('rlp');

type Props = {
	index: string;
};

function convertStringToUTF8ByteArray(str: string) {
	const binaryArray = new Uint8Array(str.length);

	Array.prototype.forEach.call(binaryArray, (el, idx, arr) => {
		arr[idx] = str.charCodeAt(idx);
	});

	return binaryArray;
}

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
											{block.transactions.map(t => {
												const b64decoded = atob(t.data);
												const array = convertStringToUTF8ByteArray(
													b64decoded
												);
												const rlpDecoded = RLP.decode(
													array
												);

												return (
													<>
														<code key={t.data}>
															To:{' '}
															<Avatar
																address={Utils.cleanAddress(
																	rlpDecoded[3].toString(
																		'hex'
																	)
																)}
																size={25}
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
																	) || 0
																)
																	.format('T')
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
															Gas Price:{' '}
															{(
																parseInt(
																	rlpDecoded[1].toString(
																		'hex'
																	),
																	16
																) || 0
															).toString()}{' '}
															Attoms
														</code>
													</>
												);
											})}
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
