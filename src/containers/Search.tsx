import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import AddressSearch from '../components/search/AddressSearch';

import { SContent, SJumbotron } from '../components/styles';

import Grid, { Quadrant as Q, Section } from '../ui';

type ReactRouterProps = {
	data: string;
};

const Search: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const data = props.match.params.data;

	return (
		<SContent>
			<SJumbotron>
				<Section padding={20}>
					<Container>
						<Row className="align-items-center">
							<Col>
								<h1>Search</h1>
								<p>{props.match.params.data}</p>
							</Col>
						</Row>
					</Container>
				</Section>
			</SJumbotron>
			<AddressSearch address={data} />
		</SContent>
	);
};

export default Search;
