import React from 'react';

import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import Await from '../components/utils/Await';
import Loader from '../components/utils/Loader';
import Nominees from '../components/Nominees';
import Blocks from '../components/Blocks';
import Statistics from '../components/Statistics';
import Transactions from '../components/Transactions';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import Section, { Grid, Q } from '../ui';

import Image from 'react-bootstrap/Image';
import TENOM from '../assets/tenom.svg';
import Stats from '../components/Statistics';

const SContent = styled.div`
	margin-bottom: 70px;

	@media (max-width: 575px) {
		margin-bottom: 30px;
	}
`;

const Index: React.FC<{}> = () => {
	return (
		<>
			<Section padding={30}>
				<Container fluid={true}>
					<Row>
						<Col md={6}>
							<SContent>
								<h3 className="preheader">Latest Blocks</h3>
								<Blocks />
							</SContent>
						</Col>
						<Col md={6}>
							<SContent>
								<h3 className="preheader">Transactions</h3>
								<Transactions />
							</SContent>
						</Col>
					</Row>
				</Container>
			</Section>
		</>
	);
};

export default Index;
