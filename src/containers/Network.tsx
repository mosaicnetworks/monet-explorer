import React from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import Peers from '../components/Peers';

import BG from '../assets/bg.png';

const SStatistic = styled.div`
	padding: 40px;
	background: #fff;
	margin-top: 15px;

	h1 {
		color: rgba(31, 66, 146, 1);
	}
`;

const SBox = styled.div`
	background: #fff;
	margin-bottom: 20px;
	margin-top: 20px;
`;

const Index: React.FC<{}> = () => {
	return (
		<>
			<Container fluid={true}>
				<Row>
					<Col xs={12} md={true}>
						<SStatistic>
							<h1>Peers</h1>
							<h2>4</h2>
						</SStatistic>
					</Col>
					<Col xs={12} md={true}>
						<SStatistic>
							<h1>Avg. Gas Price</h1>
							<h2>4</h2>
						</SStatistic>
					</Col>
					<Col xs={12} md={true}>
						<SStatistic>
							<h1>Value</h1>
							<h2>$40.23</h2>
						</SStatistic>
					</Col>
					<Col xs={12} md={true}>
						<SStatistic>
							<h1>Market Cap.</h1>
							<h2>$400,123,1231.654</h2>
						</SStatistic>
					</Col>
				</Row>
			</Container>
			<Container fluid={true}>
				<Row>
					<Col xs={12} md={6}>
						<SBox>
							<Peers />
						</SBox>
					</Col>

					<Col xs={12} md={6}>
						<SBox>
							<Peers />
						</SBox>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Index;
