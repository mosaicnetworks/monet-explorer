import React from 'react';

import Utils from 'evm-lite-utils';

import { JsonToTable } from 'react-json-to-table';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Media from 'react-bootstrap/Media';

import ValidatorAvatar from '../components/ValidatorAvatar';

import { SContent, SJumbotron, SSection } from '../components/styles';

import { selectValidator } from '../selectors';
import { capitalize, pubKeyToAddress } from '../utils';

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const validator = useSelector(selectValidator(props.match.params.id));

	return (
		(validator && (
			<>
				<SJumbotron>
					<Container>
						<Row className="align-items-center">
							<Col>
								<Media>
									<img
										style={{ borderRadius: '3px' }}
										width={75}
										height={75}
										className="mr-3"
										src={`https://s.gravatar.com/avatar/${Utils.trimHex(
											pubKeyToAddress(
												validator.public_key
											)
										)}?size=100&default=retro`}
										alt="Generic placeholder"
									/>
									<Media.Body>
										<h1>
											{capitalize(validator.moniker)}
											<small className="mono">
												{' '}
												{validator.host}
											</small>
										</h1>
										<p className="mono">
											{Utils.cleanAddress(
												pubKeyToAddress(
													validator.public_key
												)
											)}
										</p>
									</Media.Body>
								</Media>
							</Col>
						</Row>
					</Container>
				</SJumbotron>
				<SSection>
					<Container fluid={false}>
						<Row>
							<Col md={5}>
								<Row>
									<Col>
										<SContent>
											<h3>Public Key</h3>
											<div className="padding mono pad">
												{validator.public_key}
											</div>
										</SContent>
									</Col>
								</Row>
								<Row>
									<Col>
										<SContent>
											<h3>Versions</h3>
											<div>
												<Table>
													<tr>
														<td>
															<b>Monetd</b>
														</td>
														<td className="mono">
															v
															{
																validator
																	.version
																	.monetd
															}
														</td>
													</tr>
													<tr>
														<td>
															<b>Babble</b>
														</td>
														<td className="mono">
															v
															{validator.version.babble.slice(
																0,
																-1
															)}
														</td>
													</tr>
													<tr>
														<td>
															<b>EVM-Lite</b>
														</td>
														<td className="mono">
															v
															{validator.version.evm_lite.slice(
																0,
																-1
															)}
														</td>
													</tr>
													<tr>
														<td>
															<b>SOLC</b>
														</td>
														<td className="mono">
															{
																validator
																	.version
																	.solc
															}
														</td>
													</tr>
													<tr>
														<td>
															<b>SOLC OS</b>
														</td>
														<td className="mono">
															{
																validator
																	.version
																	.solc_os
															}
														</td>
													</tr>
												</Table>
											</div>
										</SContent>
									</Col>
								</Row>
							</Col>
							<Col>
								<SContent>
									<h3>Statistics</h3>
									<div className="padding">
										<JsonToTable json={validator.info} />
									</div>
								</SContent>
							</Col>
						</Row>
					</Container>
				</SSection>
			</>
		)) || <Container>No validator found.</Container>
	);
};

export default Validator;
