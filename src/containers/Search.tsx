import React, { useState, useEffect } from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { IEVMAccount } from 'evm-lite-core';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import monet from '../monet';

const SSearch = styled.div`
	margin-top: 30px;

	span {
		color: rgba(0, 0, 0, 0.6);
	}
`;

const SSuggestion = styled.div`
	margin: 10px;
	padding: 20px;
	background: #fff;
	width: 100%;
	border: 1px solid #eee;
`;

type ReactRouterProps = {
	data: string;
};

const Search: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const data = props.match.params.data;

	const [account, setAccount] = useState<IEVMAccount>({} as IEVMAccount);
	const [error, setError] = useState('');

	const fetchDataResponses = async () => {
		if (utils.cleanAddress(data).length === 42) {
			const a = await monet.getAccount(utils.cleanAddress(data));

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
			<Container fluid={true}>
				<h1>
					Search: <span>{props.match.params.data}</span>
				</h1>
			</Container>
			{error && <SSuggestion>{error}</SSuggestion>}
			{Object.keys(account).length > 0 && (
				<SSuggestion>
					<Container fluid={true}>
						<Row>
							<Col>
								<h3>Balance: </h3>
								<h4>
									<span>{account.balance.format('T')}</span>
								</h4>
							</Col>
						</Row>
						<br />

						<Row>
							<Col>
								<h3>Nonce: </h3>
								<h4>
									<span>{account.nonce}</span>
								</h4>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								<h3>Bytecode: </h3>
								<pre>
									<code>{account.bytecode}</code>
								</pre>
							</Col>
						</Row>
					</Container>
				</SSuggestion>
			)}
		</SSearch>
	);
};

export default Search;
