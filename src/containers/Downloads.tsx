import React, { useEffect, useState } from 'react';

import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Loader from '../components/Loader';

import { SContent } from '../components/styles';

import ExplorerAPIClient, { Application } from '../client';

import Background from '../assets/bg.svg';
import Logo from '../assets/monet.svg';

const SContainer = styled.div`
	.card {
		margin-bottom: 20px !important;
	}

	a.card-link {
		background: var(--orange) !important;
		color: white !important;
		font-weight: 600 !important;
		background: red;
		padding: 6px 10px;
		border-radius: 5px;
	}

	.card-link + .card-link {
		margin-left: 10px;
	}

	.card-title {
		font-size: 25px;
		margin-bottom: 20px !important;
	}
`;

const SBlue = styled.div`
	background: url(${Background});
	padding: 40px 15px;
	color: white;
`;

const Transactions: React.FC<{}> = () => {
	const c = new ExplorerAPIClient();

	const [os, setOS] = useState(['linux', 'mac']);
	const [applications, setApplications] = useState<Application[]>([]);

	const fetchApps = async () => {
		setApplications(await c.getApplications());
	};

	useEffect(() => {
		fetchApps();
	}, []);

	const parseAppName = (name: string) => {
		switch (name) {
			case 'monetd':
				return 'Monet Daemon';
			case 'monetcli':
				return 'Monet CLI';
			case 'monet-wallet':
				return 'Monet Wallet';
			default:
				return name;
		}
	};

	return (
		<SContainer>
			<Container>
				<SContent>
					<SBlue>
						<Row>
							<Col md={10}>
								<img src={Logo} />
							</Col>
						</Row>
					</SBlue>
					<div className="padding">
						{applications.map(app => (
							<Card key={app.repository_name}>
								<Card.Body>
									<Card.Title>
										{parseAppName(app.repository_name)}
									</Card.Title>

									<Card.Text
										dangerouslySetInnerHTML={{
											__html: app.description
										}}
									>
										{}
									</Card.Text>
									<br />
									{os.map((o: any, i: any) => {
										ReactTooltip.rebuild();

										return (
											<Card.Link
												data-tip={`Download ${parseAppName(
													app.repository_name
												)}`}
												key={`${app.repository_name}/asset/${o}/`}
												href={`https://dashboard.monet.network/api/downloads/applications/${app.repository_name}/?os=${o}`}
											>
												{o}
											</Card.Link>
										);
									})}
								</Card.Body>
							</Card>
						))}
					</div>
				</SContent>
			</Container>
		</SContainer>
	);
};

export default Transactions;
