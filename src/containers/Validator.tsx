import React from 'react';

import styled from 'styled-components';

import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	return (
		<Container fluid={false}>
			<Row noGutters={true}>
				<Col>{props.match.params.id}</Col>
			</Row>
		</Container>
	);
};

export default Validator;
