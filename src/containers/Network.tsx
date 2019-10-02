import React from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import Blocks from '../components/Blocks';

import BG from '../assets/bg.png';

const SStatistic = styled.div`
	color: white;

	h2 {
		color: rgba(255, 255, 255, 0.8);
	}
`;

const Index: React.FC<{}> = () => {
	return (
		<>
			<Jumbotron>
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
								<h2>$4.23</h2>
							</SStatistic>
						</Col>
						<Col xs={12} md={true}>
							<SStatistic>
								<h1>Market Cap.</h1>
								<h2>$400,123,1231,654</h2>
							</SStatistic>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
		</>
	);
};

export default Index;
