import React from 'react';

import { JsonToTable } from 'react-json-to-table';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import ValidatorAvatar from '../components/ValidatorAvatar';

import { SContent } from '../components/styles';

import { selectValidator } from '../selectors';

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const validator = useSelector(selectValidator(props.match.params.id));

	return (
		(validator && (
			<Container fluid={false}>
				<Row>
					<Col>
						<SContent>
							<span>Validator</span>
							<div className="padding">
								<ValidatorAvatar validator={validator} />
							</div>
						</SContent>
					</Col>
				</Row>
				<Row>
					<Col md={5}>
						<Row>
							<Col>
								<SContent>
									<span>Public Key</span>
									<div className="padding mono">
										{validator.public_key}
									</div>
								</SContent>
							</Col>
						</Row>
						<Row>
							<Col>
								<SContent>
									<span>Versions</span>
									<div>
										<Table>
											<tr>
												<td>
													<b>Monetd</b>
												</td>
												<td className="mono">
													v{validator.version.monetd}
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
													{validator.version.solc}
												</td>
											</tr>
											<tr>
												<td>
													<b>SOLC OS</b>
												</td>
												<td className="mono">
													{validator.version.solc_os}
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
							<span>Statistics</span>
							<div className="padding">
								<JsonToTable json={validator.info} />
							</div>
						</SContent>
					</Col>
				</Row>
			</Container>
		)) || <Container>No validator found.</Container>
	);
};

export default Validator;
