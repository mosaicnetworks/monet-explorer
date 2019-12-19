import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Loader from '../utils/Loader';
import Validators from '../Validators';

import ExplorerAPIClient, {
	Validator,
	ValidatorHistory as TValidatorHistory
} from '../../client';
import { selectNetwork } from '../../selectors';
import Alert from 'react-bootstrap/Alert';

const ValidatorHistory: React.FC<{}> = () => {
	const network = useSelector(selectNetwork);

	const [lgShow, setLgShow] = useState(false);

	const [loading, setLoading] = useState(false);
	const [history, setHistory] = useState<TValidatorHistory[]>([]);
	const [validators, setValidators] = useState<Validator[]>([]);

	const c = new ExplorerAPIClient();

	const fetchHistory = async () => {
		if (network) {
			setLoading(true);

			const h = await c.fetchValidatorHistory(network.name);
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
		<>
			<Modal
				centered={true}
				size="lg"
				show={lgShow}
				onHide={() => setLgShow(false)}
				aria-labelledby="example-modal-sizes-title-lg"
			>
				<Modal.Header closeButton={true}>
					<Modal.Title id="example-modal-sizes-title-lg">
						Validator History <Loader loading={loading} />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{loading && (
						<>
							{
								'Loading validator history... This might take while.'
							}
						</>
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
									title={
										i === 0
											? `${h.consensus_round} (Current)`
											: h.consensus_round
									}
								>
									<Validators
										hideStatus={true}
										validators={validators}
									/>
								</Tab>
							);
						})}
					</Tabs>
				</Modal.Body>
				<Modal.Footer>
					<Alert variant="info" className="small blue">
						<Alert.Heading as="h5">Info</Alert.Heading>
						The statistics displayed at each of the consensus rounds
						represents the state of the node before the validator
						set changed. In the case of the current validator set -
						the data is live.
					</Alert>
				</Modal.Footer>
			</Modal>
			<a href="#" onClick={() => setLgShow(true)}>
				Show History
			</a>
		</>
	);
};

export default ValidatorHistory;
