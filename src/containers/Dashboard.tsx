import React, { useState } from 'react';

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

import Faucet from '../components/Faucet';
import Nominees from '../components/Nominees';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import { SContent } from '../components/styles';
import { networkBlocks, networkValidators, selectNominees } from '../selectors';

const SIndex = styled.div`
	h4 {
		margin-top: 30px;
		color: rgba(31, 66, 146, 1) !important;
	}

	.float-right {
	}
`;

const SContentPadded = styled.div`
	padding: 10px;
	background: #fff;
	text-align: center;
	margin-bottom: 15px;
	border-radius: 5px;
	font-size: 14px !important;
	border: 1px solid #e5e5e5e5 !important;
`;

const SAlert = styled(Alert)`
	padding: 30px !important;
`;

const Index: React.FC<RouteComponentProps<{}>> = props => {
	const validators = useSelector(networkValidators);
	const nominees = useSelector(selectNominees);
	const blocks = useSelector(networkBlocks);

	const [show, setShow] = useState(true);

	const transactions = blocks.map(item => item.transactions.length);

	return (
		<SIndex>
			<Container>
				<SAlert
					show={show}
					variant="info"
					dismissible={true}
					onClose={() => setShow(false)}
				>
					<Row>
						<Col xs={12} md={5}>
							<Alert.Heading>
								Interested in Participating?
							</Alert.Heading>
							<p>
								If you are interested in participating in our
								testnet by deploying smart contracts,
								interacting with contracts or just curious to
								try out our network - use the form to left to
								receive some tokens to your address.
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
							<h1>{blocks.length ? blocks[0].index : '-'}</h1>
							<div>Block Height</div>
						</SContentPadded>
					</Col>
					<Col xs={6} md={3}>
						<SContentPadded>
							<h1>{'-'}</h1>
							<div>Total Transactions</div>
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
