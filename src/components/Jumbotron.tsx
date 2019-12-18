import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Faucet from './Faucet';

import { selectNetwork } from '../selectors';
import { capitalize } from '../utils';

import SQUARES from '../assets/squares.svg';

const SSquares = styled.div`
	width: 88px;
	height: 78px;
	position: absolute;
	background-image: url(${SQUARES});
	background-size: contain;
	top: 20px;
`;

const SAlert = styled(Alert)`
	padding: 60px 0px !important;
	background: var(--blue) no-repeat !important;
	background-size: contain !important;
	color: #eee !important;
	border: none !important;
	box-shadow: none !important;
	margin-bottom: 0px !important;
	border-radius: 0 !important;

	.alert-heading {
		margin-top: 0px !important;
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

	a {
		color: #f26630 !important;
		font-weight: bold;
	}

	p {
		padding: 10px 0;
		font-weight: 500;
	}

	@media (max-width: 575px) {
		padding: 50px 0 !important;
	}
`;

const SContainer = styled(Container)``;

const Jumbotron: React.FC<{}> = () => {
	const selected = useSelector(selectNetwork);

	return (
		<>
			<SAlert variant="info">
				<SContainer fluid={true}>
					<SSquares />
					<Row className="align-items-center ml-md-5 mr-md-5">
						<Col xs={12} md={5} className="">
							<Alert.Heading as="h1">
								Testnet{' '}
								{capitalize(
									(selected && selected.name.split('-')[0]) ||
										'None'
								)}{' '}
								v{selected && selected.name.split('-')[1]}
							</Alert.Heading>
							<p className="pr-4">
								Use our <Link to={'/downloads'}>wallet</Link> to
								generate a key and fill the faucet form to
								automatically receive 100 Tenom on the testnet.
							</p>
							<a
								href="https://github.com/mosaicnetworks/"
								target="_blank"
							>
								<Button
									variant="outline-light"
									className="bigger"
								>
									Github
								</Button>
							</a>
						</Col>
						<Col xs={12} md={true}>
							<hr className={'d-sm-block d-md-none'} />
							<Faucet />
						</Col>
						<Col md={2} className="d-none d-xl-block text-center">
							<Image
								src="https://monet.network/app/images/illustrations/pages/token_sale.svg"
								width={170}
							/>
						</Col>
					</Row>
				</SContainer>
			</SAlert>
		</>
	);
};

export default Jumbotron;
