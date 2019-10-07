import React from 'react';

import styled from 'styled-components';

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
	margin-bottom: 40px;
	margin-top: 10px;
`;

const Index: React.FC<{}> = () => {
	return (
		<SContent>
			<Container fluid={true}>
				<h1>Network Statistics</h1>
				<SBox>
					<Peers />
				</SBox>
			</Container>

			<Container fluid={true}>
				<Row>
					<Col>
						<h2>Whitelist</h2>
						<SBox>
							<Whitelist />
						</SBox>
					</Col>
					<Col>
						<h2>Nominee List</h2>
						<SBox>
							<Nominees />
						</SBox>
					</Col>
				</Row>
			</Container>
		</SContent>
	);
};

export default Index;
