import React, { useState } from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Peers from '../components/Peers';
import Whitelist from '../components/Whitelist';

const SIndex = styled.div`
	h4 {
		margin-top: 15px;
	}
`;

const SContentPadded = styled.div`
	box-shadow: 1px 1px 1px #e0e0e0;
	padding: 20px;
	background: #fff;
	text-align: center;
`;

const SContent = styled.div`
	background: #fff;
	box-shadow: 1px 1px 1px #e0e0e0;
	margin-top: 15px;
`;

const Index: React.FC<{}> = () => {
	return (
		<SIndex>
			<Container fluid={true}>
				<Row>
					<Col>
						<SContentPadded>
							<h1>2423</h1>
							<div>Total Blocks</div>
						</SContentPadded>
					</Col>
					<Col>
						<SContentPadded>
							<h1>5123</h1>
							<div>Total Transactions</div>
						</SContentPadded>
					</Col>
					<Col>
						<SContentPadded>
							<h1>4 / 4</h1>
							<div>Active Validators</div>
						</SContentPadded>
					</Col>
					<Col>
						<SContentPadded>
							<h1>0</h1>
							<div>Current Nominees</div>
						</SContentPadded>
					</Col>
				</Row>
			</Container>
			<br />
			<Container fluid={true}>
				<Row>
					<Col xs={12} md={6}>
						<h4>Current Validators</h4>
						<SContent>
							<Peers onPeersChangeHook={() => {}} />
						</SContent>
					</Col>
					<Col>
						<h4>Whitelist</h4>
						<SContent>
							<Whitelist />
						</SContent>
					</Col>
				</Row>
			</Container>
		</SIndex>
	);
};

export default Index;
