import React, { useState } from 'react';

import styled from 'styled-components';

import utils from 'evm-lite-utils';
import ReCAPTCHA from 'react-google-recaptcha';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Loader from '../components/utils/Loader';

import CoreAPI from '../client';
import Section, { Grid, Q } from '../ui';

const SContent = styled.div`
	margin-bottom: 70px;

	@media (max-width: 575px) {
		margin-bottom: 30px;
	}
`;

const SWhite = styled.div``;

const STotal = styled.div`
	background: var(--light-blue);
	padding: 20px;
`;

const SError = styled.div`
	color: #ff0000;
	display: inline-block;
	margin-left: 5px;
`;

const SSuccess = styled.div`
	color: white;
	font-size: 35px;
	text-align: center;
`;

const Faucet: React.FC<{}> = () => {
	const c = new CoreAPI();

	const [loading, setLoading] = useState(false);
	const [recaptcha, setRecaptcha] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [address, setAddress] = useState('');

	function onChange() {
		setRecaptcha(true);
	}

	const onSubmit = async () => {
		setError('');
		setLoading(true);

		if (utils.cleanAddress(address).length !== 42) {
			setError('Invalid address');
			setLoading(false);
			return;
		}

		if (recaptcha) {
			try {
				const data = await c.submitFaucetTx(
					utils.cleanAddress(address)
				);

				if (data.status === 1) {
					setSuccess(`We've transferred you 100 Tenom!`);
				} else {
					setError('Something went wrong. Please try again later.');
				}
			} catch (e) {
				throw e;
			}
		} else {
			setError('Must complete the ReCAPTCHA!');
		}

		setLoading(false);
	};

	return (
		<>
			<Section padding={30}>
				<Container fluid={true}>
					<Row className="align-items-center">
						<Col md={7} className="pr-5">
							<SWhite>
								<Form>
									{success.length ? (
										<Form.Group>
											<SSuccess>{success}</SSuccess>
										</Form.Group>
									) : (
										<>
											<Form.Group controlId="exampleForm.ControlInput1">
												<Form.Label>Address</Form.Label>
												<Form.Control
													onChange={(e: any) =>
														setAddress(
															e.target.value
														)
													}
													type="text"
													placeholder="Enter your address"
												/>
											</Form.Group>
											<Form.Group>
												<ReCAPTCHA
													type="image"
													onChange={onChange}
													theme={'light'}
													sitekey="6LdoMh4UAAAAAMSK7FUAUtfmkkLuLfyjC-5mxuNE"
												/>
											</Form.Group>
											<Form.Group>
												<Button
													disabled={loading}
													onClick={onSubmit}
													variant="warning"
													className="bigger"
												>
													Receive Tokens
												</Button>{' '}
												<SError>{error}</SError>{' '}
												<Loader
													loading={loading}
													size={50}
												/>
											</Form.Group>
										</>
									)}
								</Form>
							</SWhite>
						</Col>
						<Col className="text-center">
							<STotal>
								<h2>Total Tokens</h2>
								<h4>4213123T</h4>
							</STotal>
						</Col>
					</Row>
				</Container>
			</Section>
		</>
	);
};

export default Faucet;
