import React, { useEffect, useState } from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { IEVMAccount } from 'evm-lite-core';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';

import monet from '../monet';

import { SContent, SJumbotron } from '../components/styles';
import { selectNetwork } from '../selectors';

import Grid, { Quadrant as Q, Section } from '../ui';
import { parseBalance } from '../utils';

const SAccounts = styled.div``;

const SBlockAvatar = styled.div`
	transition: background 0.2s ease-out;
	/* font-size: 15px; */
	background: #eee;
	padding: 20px 15px;
	border-radius: 5px !important;
	color: black !important;
	text-decoration: none !important;
	cursor: pointer;
	font-weight: 700;
	display: flex !important;
	text-align: center !important;
	height: 100%;
	font-size: 17px;
	font-family: Monet;
	align-items: center;
`;

type ReactRouterProps = {
	data: string;
};

const Search: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const network = useSelector(selectNetwork) || {
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
		<SContent>
			<SJumbotron>
				<Section padding={20}>
					<Container>
						<Row className="align-items-center">
							<Col>
								<h1>Search</h1>
								<p>{props.match.params.data}</p>
							</Col>
						</Row>
					</Container>
				</Section>
			</SJumbotron>
			<SAccounts>
				<Section padding={30}>
					<Grid>
						<Q pos={[1, 1]}>
							<h3>Accounts</h3>
							<br />
							{Object.keys(account).length > 0 && (
								<div className="padding">
									<Media>
										<Avatar
											address={account.address.toLowerCase()}
										/>
										<Media.Body>
											<b className="mono">
												{account.address.toLowerCase()}
											</b>
											<div className="mono">
												{parseBalance(account.balance)}
											</div>
										</Media.Body>
									</Media>
								</div>
							)}
						</Q>
					</Grid>
				</Section>
			</SAccounts>
		</SContent>
	);
};

export default Search;
