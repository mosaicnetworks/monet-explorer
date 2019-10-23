import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Loader from '../components/Loader';
import Faucet from '../components/Faucet';
import Nominees from '../components/Nominees';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import ExplorerAPIClient from '../client';
import { SContent } from '../components/styles';
import {
	networkBlocks,
	networkValidators,
	selectedNetwork,
	selectNominees
} from '../selectors';

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
	margin-bottom: 15px;
	border-radius: 5px;
	font-size: 14px !important;
	border: 1px solid #e5e5e5e5 !important;
`;

const SAlert = styled(Alert)`
	/* display: none; */
	padding: 30px !important;

	.alert-heading {
		margin-top: 0px !important;
		padding-top: 0 !important;
	}

	ul {
		margin-top: 7px;
	}
`;

const Index: React.FC<RouteComponentProps<{}>> = props => {
	const network = useSelector(selectedNetwork);
	const validators = useSelector(networkValidators);
	const nominees = useSelector(selectNominees);

	const [show, setShow] = useState(true);
	const [statLoading, setStatLoading] = useState(true);
	const [blockHeight, setBlockHeight] = useState(0);
	const [txCount, setTxCount] = useState(0);
	const [intTxCount, setIntTxCount] = useState(0);

	const c = new ExplorerAPIClient();

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
		<SIndex>
			<Container>
				<SAlert
					show={show}
					variant="info"
					dismissible={true}
					onClose={() => setShow(false)}
				>
					<Row className="">
						<Col xs={12} md={5}>
							<Alert.Heading>
								Interested in Participating?
							</Alert.Heading>
							<p>
								If you are interested in participating in our
								testnet, use the form to receive 100T (Tenom) to
								your address. You can find libraries and tools
								on our{' '}
								<a href="https://github.com/mosaicnetworks">
									GitHub
								</a>
								.
							</p>
							<hr />
							<p className="mb-0">
								If you do not have an address yet, you can
								easily create one using{' '}
								<a href="https://github.com/mosaicnetworks/monetcli">
									MonetCLI
								</a>
								.
							</p>
						</Col>
						<Col xs={12} md={5}>
							<Faucet />
						</Col>
						<Col md={2} className="d-none d-sm-block text-center">
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
								{blockHeight || (
									<Loader loading={statLoading} />
								)}
							</h1>
							<div>Block Height</div>
						</SContentPadded>
					</Col>
					<Col xs={6} md={3}>
						<SContentPadded>
							<h1>
								{txCount + intTxCount || (
									<Loader loading={statLoading} />
								)}
								<small>({intTxCount})</small>
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
									<Col xs={6}>Current Validators</Col>
									<Col className="align-content-end" xs={6}>
										<div className="float-right">
											<Link to="/history">
												View History
											</Link>
										</div>
									</Col>
								</Row>
							</span>
							<Validators
								onClickHandler={v => () => {
									console.log(v);
									props.history.push(`/validator/${v.id}`);
								}}
							/>
						</SContent>
					</Col>
				</Row>
			</Container>
			<Container fluid={false}>
				<Row>
					<Col xs={12} md={12} lg={12} xl={6}>
						<SContent>
							<span>Whitelist</span>
							<Whitelist />
						</SContent>
					</Col>
					<Col xs={12} md={12} lg={12} xl={6}>
						<SContent>
							<span>Nominees</span>
							<Nominees />
						</SContent>
					</Col>
				</Row>
			</Container>
		</SIndex>
	);
};

export default Index;
