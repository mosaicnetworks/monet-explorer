import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Faucet from '../components/Faucet';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Nominees from '../components/Nominees';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import ExplorerAPIClient from '../client';

import { SContent } from '../components/styles';
import {
	selectNetwork,
	selectNetworkValidators,
	selectNominees,
	selectShowFaucetAlert,
	selectWhitelist
} from '../selectors';

// import { hideFaucetAlert } from '../modules/dashboard';

import Background from '../assets/bg.svg';
import Icon from '../assets/icon.png';

const STolerance = styled.div`
	display: inline-block;
`;

const SGreen = styled.div`
	color: darkgreen !important;
	display: inline-block;
`;

const SRed = styled.div`
	color: darkred !important;
	display: inline-block;
`;

const SIndex = styled.div`
	h4 {
		margin-top: 30px;
		color: rgba(31, 66, 146, 1) !important;
	}

	.float-right {
	}
`;

const SContentPadded = styled.div`
	padding: 7px;
	background: #fff;
	text-align: center;
	/* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08); */
	margin-bottom: 30px;
	border-radius: 5px;
	font-size: 14px !important;
	/* box-shadow: 0 1px 30px rgba(0, 0, 0, 0.08); */
	/* box-shadow: 0 1px 20px rgba(0, 0, 0, 0.03); */
	box-shadow: 0 1px 20px rgba(31, 66, 146, 0.07);
	border: 1px solid #f3f3f3 !important;
`;

const SAlert = styled(Alert)`
	/* display: none; */
	padding: 30px !important;
	/* background: rgba(31, 66, 146, 1) !important; */
	background: url(${Background});
	color: white !important;
	border: none !important;
	box-shadow: 0 1px 20px rgba(0, 0, 0, 0.3) !important;
	margin-bottom: 40px !important;

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

const SIcon = styled(Image)`
	margin-bottom: 20px;
`;

const Index: React.FC<RouteComponentProps<{}>> = props => {
	const network = useSelector(selectNetwork);
	const validators = useSelector(selectNetworkValidators);
	const nominees = useSelector(selectNominees);
	const whitelist = useSelector(selectWhitelist);
	const showFaucet = useSelector(selectShowFaucetAlert);

	const [statLoading, setStatLoading] = useState(true);
	const [blockHeight, setBlockHeight] = useState(0);
	const [txCount, setTxCount] = useState(0);
	const [intTxCount, setIntTxCount] = useState(0);

	const c = new ExplorerAPIClient();

	const getNetworkIntegrity = () => {
		const total = validators.length;

		let online = 0;

		for (const val of validators) {
			if (val.reachable) {
				online += 1;
			}
		}

		const d = online / total;

		if (d <= 2 / 3) {
			return (
				<SRed>
					{online}/{total}
				</SRed>
			);
		} else {
			return (
				<SGreen>
					{online}/{total}
				</SGreen>
			);
		}
	};

	const setStats = async () => {
		if (network) {
			setStatLoading(true);
			const stats = await c.getStats(network.name.toLowerCase());

			setBlockHeight(stats.block_height);
			setTxCount(stats.tx_count);
			setIntTxCount(stats.int_tx_count);
			setStatLoading(false);
		}
	};

	let interval: any;
	useEffect(() => {
		interval = setInterval(() => {
			setStats();
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		setStats();
	}, [network]);

	return (
		<>
			<SIndex>
				<Container>
					<SAlert
						show={showFaucet}
						variant="info"
						// dismissible={true}
						// onClose={() => dispatch(hideFaucetAlert())}
					>
						<Row className="align-items-center">
							<Col xs={12} md={5}>
								<SIcon src={Icon} width={'100'} />
								<Alert.Heading as="h2">
									Interested in Participating?
								</Alert.Heading>
								<p>
									Use our{' '}
									<Link to={'/downloads'}>wallet</Link> to
									generate a key and fill the form to
									automatically receive 100 Tenom on the
									testnet.
								</p>
							</Col>
							<Col xs={12} md={5}>
								<Faucet />
							</Col>
							<Col
								md={2}
								className="d-none d-sm-block text-center"
							>
								<Image
									src="https://monet.network/app/images/illustrations/pages/token_sale.svg"
									width={130}
								/>
							</Col>
						</Row>
					</SAlert>
				</Container>
				<Container fluid={false}>
					<Row>
						<Col xs={6} md={3}>
							<SContentPadded>
								<h1>
									{blockHeight || (!statLoading && '-') || (
										<Loader loading={statLoading} />
									)}
								</h1>
								<div>Block Height</div>
							</SContentPadded>
						</Col>
						<Col xs={6} md={3}>
							<SContentPadded>
								<h1>
									{txCount + intTxCount ||
										(!statLoading && '-') || (
											<Loader loading={statLoading} />
										)}
									{intTxCount > 0 && (
										<small>({intTxCount})</small>
									)}
								</h1>
								<div>Total Transactions (Internal)</div>
							</SContentPadded>
						</Col>
						<Col xs={6} md={3}>
							<SContentPadded>
								<h1>{validators.length}</h1>
								<div>Validators</div>
							</SContentPadded>
						</Col>
						<Col xs={6} md={3}>
							<SContentPadded>
								<h1>{nominees.length}</h1>
								<div>Current Nominees</div>
							</SContentPadded>
						</Col>
					</Row>
				</Container>
				<Container fluid={false}>
					<Row>
						<Col xs={12}>
							<SContent>
								<span>
									<Row>
										<Col xs={6}>
											Current Validators -{' '}
											{getNetworkIntegrity()} (
											<STolerance data-tip="Network Tolerance">
												{Math.floor(
													(1 / 3) * validators.length
												)}
											</STolerance>
											)
										</Col>
										<Col
											className="align-content-end"
											xs={6}
										>
											<div
												data-tip={`View Entire History`}
												className="float-right"
											>
												<Link to="/history">
													View History
												</Link>
											</div>
										</Col>
									</Row>
								</span>
								<Validators validators={validators} />
							</SContent>
						</Col>
					</Row>
				</Container>
				<Container fluid={false}>
					<Row>
						<Col xs={12} md={12} lg={12} xl={6}>
							<SContent>
								<span>Whitelist</span>
								<Whitelist whitelist={whitelist} />
							</SContent>
						</Col>
						<Col xs={12} md={12} lg={12} xl={6}>
							<SContent>
								<span>Nominees</span>
								<Nominees nominees={nominees} />
							</SContent>
						</Col>
					</Row>
				</Container>
			</SIndex>
		</>
	);
};

export default Index;
