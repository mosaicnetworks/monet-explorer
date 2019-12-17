import React from 'react';

import Utils from 'evm-lite-utils';
import styled from 'styled-components';

import { JsonToTable } from 'react-json-to-table';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';

import { selectValidator, selectBlocks } from '../selectors';
import { capitalize, pubKeyToAddress } from '../utils';

import Section from '../ui';
import Body from '../ui/content/Body';
import Content from '../ui/content/Content';
import Heading from '../ui/content/Heading';
import Stats from '../components/Statistics';

import GREEN from '../assets/green-dot.png';
import RED from '../assets/red-dot.png';
import Table from 'react-bootstrap/Table';
import Blocks from '../components/Blocks';

const Green = styled.div`
	color: var(--green) !important;
	/* text-transform: uppercase; */
	font-weight: 600;
	letter-spacing: 1px;
`;

const Orange = styled.div`
	color: var(--orange) !important;
	font-weight: bold !important;
`;

const Red = styled.div`
	color: var(--red) !important;
	font-weight: bold !important;
`;

const SStatus = styled.div`
	position: relative !important;
	top: -62px !important;
	left: 23px;
`;

const SBody = styled.div`
	padding: 10px 20px;
	min-width: 210px;
	border-radius: 3px;
	display: inline-block;
	margin: 10px;
	margin-left: 0;
	margin-bottom: 0;
	border: 1px solid #eee;
	background: var(--light-grey);

	p {
		margin-bottom: 0;
	}
`;

const stateStyling = (state: string) => {
	switch (state) {
		case 'Babbling':
			return <Green>Babbling</Green>;
		case 'Suspended':
			return <Orange>Suspended</Orange>;
		default:
			return state;
	}
};

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const validator = useSelector(selectValidator(props.match.params.id));
	const blocks = useSelector(selectBlocks);

	if (!validator) {
		return <>No Validator found.</>;
	}

	return (
		<>
			<Section padding={50}>
				<Container fluid={true}>
					<Row>
						<Col md={4}>
							<Content>
								<Body className="text-center">
									<Avatar
										address={pubKeyToAddress(
											validator.public_key
										)}
									/>
									<SStatus className="">
										{validator.reachable ? (
											<Image
												className="mr-1"
												src={GREEN}
												width="14"
											/>
										) : (
											<Image src={RED} width="14" />
										)}
									</SStatus>
									<h2>{capitalize(validator.moniker)}</h2>
									<h5 className="mono">{validator.host}</h5>
								</Body>
							</Content>
							<Content>
								<Heading>Details</Heading>
								<Body>
									<h5>Address</h5>
									<p className="mono">
										{Utils.cleanAddress(
											pubKeyToAddress(
												validator.public_key
											)
										)}
									</p>
									<hr />
									<h5>Public Key</h5>
									<p className="mono">
										{validator.public_key}
									</p>
								</Body>
							</Content>
							<Content>
								<Heading>Versions</Heading>
								<Body>
									<h5>Monet</h5>
									<p className="mono">
										{validator.version.monetd}
									</p>
									<hr />
									<h5>EVM-Lite</h5>
									<p className="mono">
										{validator.version.evm_lite
											.split('-')
											.join(' ')}
									</p>
									<hr />
									<h5>Babble</h5>
									<div className="mono">
										{validator.version.babble
											.split('-')
											.join(' ')}
									</div>
								</Body>
							</Content>
						</Col>
						<Col className="ml-4">
							<Content>
								<Row className="">
									<Col>
										<Media>
											<Media.Body>
												<h3>
													{stateStyling(
														validator.info.state
													)}
												</h3>
												<p className="preheader">
													State
												</p>
											</Media.Body>
										</Media>
									</Col>
									<Col>
										<Media>
											<Media.Body>
												<h3>
													{validator.reachable ? (
														<Green>Reachable</Green>
													) : (
														<Red>Offline</Red>
													)}
												</h3>
												<p className="preheader">
													Service
												</p>
											</Media.Body>
										</Media>
									</Col>
									<Col>
										<Media>
											<Media.Body>
												<h3>
													{
														validator.info
															.last_block_index
													}
												</h3>
												<p className="preheader">
													Block Height
												</p>
											</Media.Body>
										</Media>
									</Col>
									<Col>
										<Media>
											<Media.Body>
												<h3>
													{
														validator.info
															.min_gas_price
													}
												</h3>
												<p className="preheader">
													Gas Price
												</p>
											</Media.Body>
										</Media>
									</Col>
								</Row>
							</Content>
							<Content>
								<Heading>Statistics</Heading>
								<div>
									{Object.keys(validator.info).map(k => {
										return (
											<SBody key={k}>
												<Media>
													<Media.Body>
														<b>
															{
																// @ts-ignore
																validator.info[
																	k
																]
															}
														</b>
														<br />
														<p className="">
															{k}
															{/* {capitalize(
																k
																	.split('_')
																	.map(
																		capitalize
																	)
																	.join(' ')
															)} */}
														</p>
													</Media.Body>
												</Media>
											</SBody>
										);
									})}
								</div>
							</Content>
							<Content>
								<Heading>Recently Signed Blocks</Heading>
								<Blocks
									blocks={blocks.filter(b => {
										let hasSig = false;
										let sigs = b.signatures.filter(
											s =>
												s.validator.public_key ===
												validator.public_key
										);

										if (sigs.length) {
											hasSig = true;
										}

										if (hasSig) {
											return b;
										}
									})}
								/>
							</Content>
						</Col>
					</Row>
				</Container>
			</Section>
		</>
	);
};

export default Validator;
