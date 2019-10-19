import React, { useEffect, useState } from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { IEVMAccount } from 'evm-lite-core';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import monet from '../monet';

import { SContent } from '../components/styles';
import { selectedNetwork } from '../selectors';

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
								<b>Balance:</b>{' '}
								<dt className="mono">
									{account.balance.format('T')}
								</dt>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<b>Nonce:</b>{' '}
								<dt className="mono">{account.nonce}</dt>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<b>Bytecode:</b>
								<pre>
									<code>{account.bytecode || 'n/a'}</code>
								</pre>
							</Col>
						</Row>
					</p>
				)}
			</SContent>
		</SSearch>
	);
};

export default Search;
