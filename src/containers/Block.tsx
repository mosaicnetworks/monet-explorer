import React from 'react';

import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Footer from '../components/Footer';
import Signature from '../components/Signature';

import { SContent } from '../components/styles';

import { selectBlock } from '../selectors';

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const block = useSelector(selectBlock(Number(props.match.params.id)));

	if (!block) {
		return <>Could not locate blocks</>;
	}

	return (
		<>
			<Container fluid={false}>
				<Row noGutters={true}>
					<Col>
						<SContent>
							<span>Block {(block && block.index) || 0}</span>
							<div className="">
								<Table>
									<tbody>
										<tr>
											<td>
												<b>Index</b>
											</td>
											<td>{block.index}</td>
										</tr>
										<tr>
											<td>
												<b>Round Received</b>
											</td>
											<td>{block.round_received}</td>
										</tr>
										<tr>
											<td>
												<b>State Hash</b>
											</td>
											<td className="mono">
												{block.state_hash}
											</td>
										</tr>
										<tr>
											<td>
												<b>Frame Hash</b>
											</td>
											<td className="mono">
												{block.frame_hash}
											</td>
										</tr>
										<tr>
											<td>
												<b>Transaction Count</b>
											</td>
											<td>{block.transactions.length}</td>
										</tr>
										<tr>
											<td>
												<b>
													Internal Transaction Count
												</b>
											</td>
											<td>
												{
													block.internal_transactions
														.length
												}
											</td>
										</tr>
										<tr>
											<td>
												<b>Signatures:</b>
											</td>
											<td>
												{block.signatures.map(
													(s, i) => (
														<>
															<Signature
																key={i}
																validator={
																	s.validator
																}
																signature={
																	s.signature
																}
															/>
															<br />
														</>
													)
												)}
											</td>
										</tr>
									</tbody>
								</Table>
							</div>
						</SContent>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Validator;
