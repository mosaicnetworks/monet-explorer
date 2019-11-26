import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Jumbotron from '../components/Jumbotron';
import Nominees from '../components/Nominees';
import Stats from '../components/Stats';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import { SContent, SSection } from '../components/styles';
import {
	selectNominees,
	selectValidators,
	selectWhitelist
} from '../selectors';

const Index: React.FC<RouteComponentProps<{}>> = props => {
	const validators = useSelector(selectValidators);
	const nominees = useSelector(selectNominees);
	const whitelist = useSelector(selectWhitelist);

	return (
		<>
			<Jumbotron />
			<Stats />
			<SSection>
				<Container fluid={false}>
					<Row>
						<Col xs={12}>
							<SContent>
								<Row>
									<Col xs={6}>
										<h3>Current Validators</h3>
									</Col>
									<Col className="align-content-end" xs={6}>
										<div
											data-tip={`View Entire History`}
											className="float-right"
										>
											<Link to="/history">
												<small>
													<b>View History</b>
												</small>
											</Link>
										</div>
									</Col>
								</Row>

								<Validators validators={validators} />
							</SContent>
						</Col>
					</Row>
				</Container>
			</SSection>
			<SSection>
				<Container fluid={false}>
					<Row>
						<Col xs={12} md={12} lg={12} xl={6}>
							<SContent>
								<h3>Whitelist</h3>
								<Whitelist whitelist={whitelist} />
							</SContent>
						</Col>
						<Col xs={12} md={12} lg={12} xl={6}>
							<SContent>
								<h3>Nominees</h3>
								<Nominees nominees={nominees} />
							</SContent>
						</Col>
					</Row>
				</Container>
			</SSection>
		</>
	);
};

export default Index;
