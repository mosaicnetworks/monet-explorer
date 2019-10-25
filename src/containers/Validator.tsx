import React from 'react';

import { JsonToTable } from 'react-json-to-table';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ValidatorAvatar from '../components/ValidatorAvatar';

import { SContent } from '../components/styles';

import { selectValidator } from '../selectors';

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const validator = useSelector(selectValidator(props.match.params.id));

	return (
		(validator && (
			<Container fluid={false}>
				<Row>
					<Col md={12}>
						<SContent>
							<span>Validator</span>
							<div className="padding">
								<ValidatorAvatar validator={validator} />
							</div>
						</SContent>
					</Col>
					<Col>
						<SContent>
							<span>Statistics</span>
							<div className="padding">
								<JsonToTable json={validator.info} />
							</div>
						</SContent>
					</Col>
				</Row>
			</Container>
		)) || <Container>No validator found.</Container>
	);
};

export default Validator;
