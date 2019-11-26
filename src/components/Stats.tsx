import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Jumbotron from '../components/Jumbotron';
import Loader from '../components/Loader';
import Nominees from '../components/Nominees';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

// util components
import Await from '../components/utils/Await';

import ExplorerAPIClient from '../client';

import { SContent } from '../components/styles';
import { DEV } from '../const';
import {
	selectNetwork,
	selectNominees,
	selectValidators,
	selectWhitelist
} from '../selectors';

const SGreen = styled.div`
	color: darkgreen !important;
	display: inline-block;
`;

const SRed = styled.div`
	color: darkred !important;
	display: inline-block;
`;

const SContentPadded = styled.div`
	padding: 7px;
	background: #fff;
	text-align: center;
`;

const SStats = styled.div`
	background: #fff;
	margin-bottom: 60px !important;
`;

const Stats: React.FC<{}> = props => {
	const network = useSelector(selectNetwork);
	const validators = useSelector(selectValidators);
	const nominees = useSelector(selectNominees);

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
		if (!DEV) {
			interval = setInterval(() => {
				setStats();
			}, 5000);
		}

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		setStats();
	}, [network]);

	return (
		<>
			<SStats>
				<Container fluid={false}>
					<Row>
						<Col xs={6} md={3}>
							<SContentPadded>
								<Await
									loading={statLoading}
									fallback={
										<h1>
											<Loader loading={statLoading} />
										</h1>
									}
								>
									<h1>{blockHeight}</h1>
								</Await>
								<div style={{ fontWeight: 600 }}>
									Block Height
								</div>
							</SContentPadded>
						</Col>
						<Col xs={6} md={3}>
							<SContentPadded>
								<Await
									loading={statLoading}
									fallback={
										<h1>
											<Loader loading={statLoading} />
										</h1>
									}
								>
									<h1>
										{txCount + intTxCount}
										<small>({intTxCount})</small>
									</h1>
								</Await>
								<div style={{ fontWeight: 600 }}>
									Total Transactions (Internal)
								</div>
							</SContentPadded>
						</Col>
						<Col xs={6} md={3}>
							<SContentPadded>
								<h1>{validators.length}</h1>
								<div style={{ fontWeight: 600 }}>
									Validators
								</div>
							</SContentPadded>
						</Col>
						<Col xs={6} md={3}>
							<SContentPadded>
								<h1>{nominees.length}</h1>
								<div style={{ fontWeight: 600 }}>
									Current Nominees
								</div>
							</SContentPadded>
						</Col>
					</Row>
				</Container>
			</SStats>
		</>
	);
};

export default Stats;