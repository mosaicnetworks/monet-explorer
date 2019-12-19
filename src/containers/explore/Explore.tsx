import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Blocks from '../../components/Blocks';
import Transactions from '../../components/Transactions';

import UnderHeader from './UnderHeader';

import Section from '../../ui';
import Content from '../../ui/content/Content';

const Index: React.FC<{}> = () => {
	return (
		<>
			<UnderHeader active={'overview'} />
			<Section padding={50}>
				<Container fluid={true}>
					<Row>
						<Col md={6} className="pr-md-5">
							<Content>
								<h3 className="preheader">
									Latest Transactions
								</h3>
								<Transactions />
							</Content>
						</Col>
						<Col md={6}>
							<Content>
								<h3 className="preheader">Latest Blocks</h3>
								<Blocks />
							</Content>
						</Col>
					</Row>
				</Container>
			</Section>
		</>
	);
};

export default Index;
