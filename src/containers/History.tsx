import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Peers from '../components/Peers';

import ExplorerAPIClient, { Validator, ValidatorHistory } from '../client';
import { SContent } from '../components/styles';
import { selectedNetwork } from '../selectors';

const SContainer = styled.div`
	.nav-link.active {
		background: #fff !important;
		border-bottom: 0px solid #eee !important;
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
	const network = useSelector(selectedNetwork);

	const [history, setHistory] = useState<ValidatorHistory[]>([]);

	const [selectedRound, setSelectedRound] = useState<number>(0);
	const [validators, setValidators] = useState<Validator[]>([]);

	const c = new ExplorerAPIClient();

	const fetchValidators = async () => {
		console.log('Fetching validators', selectedRound);
		const v = await c.getValidators(network!.name, selectedRound);
		setValidators(v);
	};

	const fetchHistory = async () => {
		if (network) {
			console.log('fetching....');
			const h = await c.getValidatorHistory(network.name);

			setHistory(
				h.reverse().sort((a, b) => {
					return b.consensus_round - a.consensus_round;
				})
			);

			if (h.length) {
				const first = h[0];
				setSelectedRound(first.consensus_round);
			}
		}
	};

	const onClickRound = (e: any) => {
		console.log(e);
		if (e === 'initial') {
			setSelectedRound(history[0].consensus_round);
		} else {
			setSelectedRound(Number(e));
		}
	};

	useEffect(() => {
		fetchHistory();
	}, [network]);

	useEffect(() => {
		if (network) {
			fetchValidators();
		}
	}, [selectedRound]);

	return (
		<SContainer>
			<Container>
				<SContent>
					<span>Validator History - by Round</span>
					<Tabs
						onSelect={onClickRound}
						defaultActiveKey="initial"
						transition={false}
						id="noanim-tab-example"
					>
						{history.map((h, i) => {
							return (
								<Tab
									// onSelect={(k: any) => console.log}
									key={i}
									eventKey={
										i === 0 ? 'initial' : h.consensus_round
									}
									title={h.consensus_round}
								>
									<Peers peers={validators} />
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
