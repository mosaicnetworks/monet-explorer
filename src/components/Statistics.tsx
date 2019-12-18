import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Media from 'react-bootstrap/Media';

import CoreAPI from '../client';

import { DEV } from '../CONST';
import { selectNetwork, selectNominees, selectValidators } from '../selectors';

import { Grid, Q } from '../ui';

const SContentPadded = styled.div`
	text-align: center;
	padding: 15px 0;
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
			}, 3000);
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
			<Grid fluid={true} verticalAlign={true}>
				<Q pos={[1, 1]}>
					<SContentPadded>
						<Media>
							<Media.Body>
								<h1>{blockHeight}</h1>
								<p className="preheader">Block Height</p>
							</Media.Body>
						</Media>
					</SContentPadded>
				</Q>
				<Q pos={[1, 2]}>
					<SContentPadded>
						<Media>
							<Media.Body>
								<h1>
									{txCount + intTxCount}
									<small>({intTxCount})</small>
								</h1>
								<p className="preheader">Total Txs</p>
							</Media.Body>
						</Media>
					</SContentPadded>
				</Q>
				<Q pos={[1, 3]}>
					<SContentPadded>
						<Media>
							<Media.Body>
								<h1>{validators.length}</h1>
								<p className="preheader">Validators</p>
							</Media.Body>
						</Media>
					</SContentPadded>
				</Q>
				<Q pos={[1, 4]}>
					<SContentPadded>
						<Media>
							<Media.Body>
								<h1>{nominees.length}</h1>
								<p className="preheader">Nominees</p>
							</Media.Body>
						</Media>
					</SContentPadded>
				</Q>
			</Grid>
		</SStats>
	);
};

export default Stats;
