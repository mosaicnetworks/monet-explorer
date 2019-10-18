import React, { useEffect, useState } from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { IEVMAccount } from 'evm-lite-core';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import monet from '../monet';

import POA from '../poa';
import { selectedNetwork } from '../selectors';
import { SContent } from '../components/styles';

const SSearch = styled(Container)``;

type ReactRouterProps = {
	data: string;
};

const Search: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const network = useSelector(selectedNetwork) || {
		host: 'localhost',
		port: 8080
	};

	const data = props.match.params.data;

	const [account, setAccount] = useState<IEVMAccount>({} as IEVMAccount);
	const [error, setError] = useState('');

	const fetchDataResponses = async () => {
		if (utils.cleanAddress(data).length === 42) {
			const m = monet(network.host, network.port);
			const a = await m.getAccount(utils.cleanAddress(data));

			setAccount(a);
		} else {
			setError(
				'Search param not recognized. Currently only addresses are supported.'
			);
		}
	};

	useEffect(() => {
		fetchDataResponses();
	}, []);

	return (
		<SSearch>
			<SContent>
				<span>Search: {props.match.params.data}</span>
				{Object.keys(account).length > 0 && (
					<p>
						<Row>
							<Col>
								<b>Balance:</b> {account.balance.format('T')}
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<b>Nonce:</b> {account.nonce}
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<b>Bytecode:</b> {account.bytecode || 'n/a'}
							</Col>
						</Row>
					</p>
				)}
			</SContent>
		</SSearch>
	);
};

export default Search;
