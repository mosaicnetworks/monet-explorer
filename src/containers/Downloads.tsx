import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import Loader from '../components/Loader';

import { SContent } from '../components/styles';

import ExplorerAPIClient, { Application } from '../client';
import { capitalize } from '../utils';

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
	color: var(--orange);
	height: 100px;
`;

const Transactions: React.FC<{}> = () => {
	const c = new ExplorerAPIClient();

	const [os, setOS] = useState(['linux', 'mac', 'windows']);
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
				<Row>
					<Col>
						<SContent>
							<SBlue>
								<Row>
									<Col md={10}>
										<img src={Logo} />
									</Col>
									<Col>
										<h4>Downloads</h4>
									</Col>
								</Row>
							</SBlue>
							<div className="padding">
								If you need direct links to the downloads:
								<br />
								<br />
								<p>
									<pre>
										<code>
											https://dashboard.monet.network/api/downloads/[REPO_NAME]/?os=['linux'|'mac'|'windows']
										</code>
									</pre>
								</p>
							</div>
						</SContent>
					</Col>
				</Row>
				<Row>
					{applications.map((app, i) => (
						<Col md={6} key={i}>
							<SContent>
								<span>{parseAppName(app.repository_name)}</span>
								<div className="padding">
									<Media>
										<img
											src="https://image.flaticon.com/icons/svg/919/919847.svg"
											width={54}
											height={54}
											className="text-center mr-4"
										/>
										<Media.Body>
											<h5 className="mr-4">
												{parseAppName(
													app.repository_name
												)}{' '}
												<Badge
													as="div"
													variant="secondary"
												>
													Latest
												</Badge>
											</h5>
											<p className="text-muted mono">
												{app.repository_name}
											</p>
											<p
												dangerouslySetInnerHTML={{
													__html: app.description
												}}
											/>
											<hr />
											<p>
												{os.map((o, i) => (
													<Button
														href={`https://dashboard.monet.network/api/downloads/${app.repository_name}/?os=${o}`}
														key={`${o}/${i}`}
														className="mr-1"
														variant="primary"
													>
														{capitalize(o)}
													</Button>
												))}
											</p>
										</Media.Body>
									</Media>
								</div>
							</SContent>
						</Col>
					))}
				</Row>
			</Container>
		</SContainer>
	);
};

export default Transactions;
