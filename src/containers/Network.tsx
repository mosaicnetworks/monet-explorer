import React, { useState } from 'react';

import styled from 'styled-components';

import { IBabblePeer } from 'evm-lite-consensus';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import Nominees from '../components/Nominees';
import Peers from '../components/Peers';
import Whitelist from '../components/Whitelist';

const SContent = styled.div`
	margin-top: 30px;
`;

const SBox = styled.div`
	background: #fff;
`;

const SHeading = styled.div`
	background: rgba(31, 66, 146, 0.9) !important;
	padding: 11px 13px;
	font-size: 13px;
	color: #fff !important;
	text-transform: uppercase;
	font-weight: bold;

	& span {
		padding-left: 15px;
		font-size: 11px;
	}
`;

const Index: React.FC<{}> = () => {
	const [peers, setPeers] = useState<any>([]);

	const onPeerChange = (ps: IBabblePeer[]) => {
		setPeers(ps);
	};

	return (
		<>
			<Jumbotron>
				<Container fluid={true}>
					<Row>
						<Col md={10}>
							<h1>Network Statistics</h1>
							<p>Camille test network statistics.</p>
						</Col>
						<Col>
							<h2>Peers</h2>
							<h3>{peers.length || '---'}</h3>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
			<br />
			<Container fluid={true}>
				<SHeading>Validators</SHeading>
				<SBox>
					<Peers onPeersChangeHook={onPeerChange} />
				</SBox>
			</Container>

			<SContent>
				<Container fluid={true}>
					<Row>
						<Col>
							<SHeading>Whitelist</SHeading>
							<SBox>
								<Whitelist />
							</SBox>
						</Col>
						<Col>
							<SHeading>Nominees</SHeading>
							<SBox>
								<Nominees />
							</SBox>
						</Col>
					</Row>
				</Container>
			</SContent>
		</>
	);
};

export default Index;
