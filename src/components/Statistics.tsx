import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Media from 'react-bootstrap/Media';

import Await from '../components/utils/Await';
import Loader from '../components/utils/Loader';

import CoreAPI from '../client';

import { DEV } from '../CONST';
import { selectNetwork, selectNominees, selectValidators } from '../selectors';

import Section, { Grid, Q } from '../ui';

const SContentPadded = styled.div`
	text-align: center;
`;

const SStats = styled.div`
	background: var(--light-blue);

	h1 {
		font-size: 30px;
	}

	p {
		margin-bottom: 0 !important;
	}
`;

const Stats: React.FC<{}> = props => {
	const network = useSelector(selectNetwork);
	const validators = useSelector(selectValidators);
	const nominees = useSelector(selectNominees);

	const [statLoading, setStatLoading] = useState(true);
	const [blockHeight, setBlockHeight] = useState(0);
	const [txCount, setTxCount] = useState(0);
	const [intTxCount, setIntTxCount] = useState(0);

	const c = new CoreAPI();

	const setStats = async () => {
		if (network) {
			setStatLoading(true);

			const stats = await c.fetchStats(network.name.toLowerCase());

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
		<SStats className="d-none d-md-block">
			<Section padding={15}>
				<Grid fluid={true} verticalAlign={true}>
					<Q pos={[1, 1]}>
						<SContentPadded>
							<Media>
								{/* <img
									src="https://image.flaticon.com/icons/png/512/1835/1835982.png"
									width="50"
									className="align-self-center mr-4"
								/> */}
								<Media.Body>
									<h1>{blockHeight}</h1>
									<p className="preheader">Block Height</p>
								</Media.Body>
							</Media>
							{/* <div style={{ fontWeight: 600 }}>Block Height</div>
						<Await
							loading={statLoading}
							fallback={
								<h1>
									<Loader loading={statLoading} />
								</h1>
							}
						>
							<h1>{blockHeight}</h1>
						</Await> */}
						</SContentPadded>
					</Q>
					<Q pos={[1, 2]}>
						<SContentPadded>
							<Media>
								{/* <img
									src="https://image.flaticon.com/icons/png/512/1573/1573856.png"
									width="50"
									className="align-self-center mr-4"
								/> */}
								<Media.Body>
									<h1>
										{txCount + intTxCount}
										<small>({intTxCount})</small>
									</h1>
									<p className="preheader">Total Txs</p>
								</Media.Body>
							</Media>
							{/* <div style={{ fontWeight: 600 }}>
							Total Transactions (Internal)
						</div>
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
						</Await> */}
						</SContentPadded>
					</Q>
					<Q pos={[1, 3]}>
						<SContentPadded>
							<Media>
								{/* <img
									src="https://image.flaticon.com/icons/png/512/626/premium/626827.png"
									width="50"
									className="align-self-center mr-4"
								/> */}
								<Media.Body>
									<h1>{validators.length}</h1>
									<p className="preheader">Validators</p>
								</Media.Body>
							</Media>
							{/* <div style={{ fontWeight: 600 }}>Validators</div>{' '}
						<h1>{validators.length}</h1> */}
						</SContentPadded>
					</Q>
					<Q pos={[1, 4]}>
						<SContentPadded>
							<Media>
								{/* <img
									src="https://image.flaticon.com/icons/png/512/2116/premium/2116800.png"
									width="50"
									className="align-self-center mr-4"
								/> */}
								<Media.Body>
									<h1>{nominees.length}</h1>
									<p className="preheader">Nominees</p>
								</Media.Body>
							</Media>
							{/* <div style={{ fontWeight: 600 }}>
								Current Nominees
							</div>
							<h1>{nominees.length}</h1> */}
						</SContentPadded>
					</Q>
				</Grid>
			</Section>
		</SStats>
	);
};

export default Stats;
