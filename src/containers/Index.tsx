import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Evictees from '../components/Evictees';
import Jumbotron from '../components/Jumbotron';
import Nominees from '../components/Nominees';
import Stats from '../components/Statistics';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import Section from '../ui';
import Content from '../ui/content/Content';
import Heading from '../ui/content/Heading';

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
							<Content>
								<Heading>Current Validators</Heading>
								<Validators />
							</Content>
							<Content>
								<Heading>Nominees</Heading>
								<Nominees />
							</Content>
						</Col>
						<Col md={5}>
							<Content>
								<Heading>Whitelist</Heading>
								<Whitelist />
							</Content>
							<Content>
								<Heading>Evictees</Heading>
								<Evictees />
							</Content>
						</Col>
					</Row>
				</Container>
			</Section>
		</>
	);
};

export default Index;
