import React from 'react';

import styled from 'styled-components';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import Await from '../components/utils/Await';
import Loader from '../components/utils/Loader';
import Nominees from '../components/Nominees';
import Blocks from '../components/Blocks';
import Statistics from '../components/Statistics';
import Jumbotron from '../components/Jumbotron';
import Transactions from '../components/Transactions';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import Section, { Grid, Q } from '../ui';

import Image from 'react-bootstrap/Image';
import TENOM from '../assets/tenom.svg';
import Stats from '../components/Statistics';

const SContent = styled.div`
	margin-bottom: 50px;

	@media (max-width: 575px) {
		margin-bottom: 30px;
	}
`;

const Index: React.FC<{}> = () => {
	return (
		<>
			<Jumbotron />
			<Stats />
			<br />
			<Section padding={30}>
				<Container fluid={true}>
					<Row>
						<Col md={7}>
							<SContent>
								<h3 className="preheader">
									Current Validators
								</h3>
								<Validators />
							</SContent>
							<SContent>
								<h3 className="preheader">Nominees</h3>
								<Nominees />
							</SContent>
						</Col>
						<Col md={5}>
							<SContent>
								<h3 className="preheader">Whitelist</h3>
								<Whitelist />
							</SContent>
							<SContent>
								<h3 className="preheader">Evictees</h3>
								<Nominees />
							</SContent>
						</Col>
					</Row>
				</Container>
			</Section>
		</>
	);
};

export default Index;
