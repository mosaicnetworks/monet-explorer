import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Faucet from '../components/Faucet';

import MONET_ICOn from '../assets/icon.png';

const SIcon = styled(Image)`
	margin-bottom: 20px;
`;

const SAlert = styled(Alert)`
	/* display: none; */
	padding: 70px 0px !important;
	/* background: rgba(31, 66, 146, 1) !important; */
	background: var(--blue) !important;
	background-size: cover;
	/* background-position-x: -10px; */
	color: white !important;
	border: none !important;
	box-shadow: none !important;
	margin-bottom: 0px !important;
	border-radius: 0 !important;

	.close:hover {
		color: #fff;
	}

	.alert-heading {
		margin-top: 0px !important;
		/* padding-top: 10px !important; */
	}

	& input {
		font-size: 14px;
		border: none !important;
		color: #fff !important;
		background: rgba(60, 120, 208, 0.3) !important;
	}

	& input::placeholder {
		color: #888;
	}

	hr {
		border-color: transparent !important;
	}

	a {
		color: #f26630 !important;
		font-weight: bold;
	}

	ul {
		margin-top: 7px;
	}
`;

const Jumbotron: React.FC<{}> = () => {
	return (
		<>
			<SAlert variant="info">
				<Container>
					<Row className="align-items-center">
						<Col xs={12} md={6}>
							<SIcon src={MONET_ICOn} width={'100'} />
							<Alert.Heading as="h1">
								Interested in Participating?
							</Alert.Heading>
							<p>
								Use our <Link to={'/downloads'}>wallet</Link> to
								generate a key and fill the form to
								automatically receive 100 Tenom on the testnet.
							</p>
						</Col>
						<Col xs={12} md={4}>
							<Faucet />
						</Col>
						<Col md={2} className="d-none d-sm-block text-center">
							<Image
								src="https://monet.network/app/images/illustrations/pages/token_sale.svg"
								width={130}
							/>
						</Col>
					</Row>
				</Container>
			</SAlert>
		</>
	);
};

export default Jumbotron;
