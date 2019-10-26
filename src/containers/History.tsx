import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Loader from '../components/Loader';
import Validators from '../components/Validators';

import ExplorerAPIClient, { Validator, ValidatorHistory } from '../client';
import { SContent } from '../components/styles';
import { selectNetwork } from '../selectors';

const SContainer = styled.div`
	.nav-link.active {
		background: rgba(31, 66, 146, 0.1) !important;
		border-bottom: 0px solid #eee !important;
		color: #000 !important;
	}

	.nav-link {
		background: #fafafa !important;
		border-top: none !important;
		border-radius: 0 !important;
		border-bottom: 1px solid #eee !important;
		font-size: 14px !important;
	}

	.tab-content {
		/* padding: 20px; */
	}
`;

const History: React.FC<{}> = () => {
	const network = useSelector(selectNetwork);

	const [loading, setLoading] = useState(false);
	const [history, setHistory] = useState<ValidatorHistory[]>([]);
	const [validators, setValidators] = useState<Validator[]>([]);

	const c = new ExplorerAPIClient();

	const fetchHistory = async () => {
		if (network) {
			setLoading(true);

			const h = await c.getValidatorHistory(network.name);
			setHistory(h);

			if (h[0]) {
				setValidators(h[0].validators);
			}

			setLoading(false);
		}
	};

	const onClickRound = (e: any) => {
		setValidators(history[Number(e)].validators);
	};

	useEffect(() => {
		fetchHistory();
	}, [network]);

	return (
		<SContainer>
			<Container>
				<SContent>
					<span>Validator History</span>
					{loading && (
						<div className="text-center padding">
							<Loader loading={loading} size={40} /> Loading,
							please wait...
						</div>
					)}
					<Tabs
						variant="pills"
						onSelect={onClickRound}
						defaultActiveKey={0}
						transition={false}
						id="noanim-tab-example"
					>
						{history.map((h, i) => {
							return (
								<Tab
									key={i}
									eventKey={i}
									title={h.consensus_round}
								>
									<Validators
										hideStatus={true}
										validators={validators}
									/>
								</Tab>
							);
						})}
					</Tabs>
				</SContent>
			</Container>
		</SContainer>
	);
};

export default History;
