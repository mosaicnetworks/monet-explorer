import React, { useEffect, useState } from 'react';

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
import ReactTooltip from 'react-tooltip';

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

	const [loading, setLoading] = useState<boolean>(false);
	const [applications, setApplications] = useState<Application[]>([]);
	const [releases, setReleases] = useState<any>({});

	const fetchApps = async () => {
		setLoading(true);
		setApplications(await c.applications());
	};

	const fetchReleases = async () => {
		const r: any = {};

		for (const app of applications) {
			const release = await c.getLatestRelease(
				app.owner,
				app.repository_name
			);

			r[app.repository_name] = release;
		}

		setReleases(r);
		setLoading(false);
	};

	useEffect(() => {
		fetchApps();
	}, []);

	useEffect(() => {
		fetchReleases();
	}, [applications]);

	const getAssetName = (asset: string) => {
		if (asset.includes('mac') || asset.includes('darwin')) {
			return 'Mac';
		}

		if (asset.includes('win') || asset.includes('windows')) {
			return 'Windows';
		}

		if (asset.includes('linux') || asset.includes('lin')) {
			return 'Linux';
		}

		return asset;
	};

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

	const getDescription = (name: string) => {
		const app = applications.find(
			a => a.repository_name === name.toLowerCase()
		);

		if (app) {
			return app.description;
		} else {
			return 'None';
		}
	};

	// console.log(
	// 	document
	// 		.createRange()
	// 		.createContextualFragment(getDescription('monetd')).
	// );
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
						{Object.keys(releases).map(appname => (
							<Card key={appname}>
								<Card.Body>
									<Card.Title>
										{parseAppName(appname)}
									</Card.Title>
									<Card.Subtitle className="mb-2 text-muted mono">
										{releases[appname].tag_name} -{' '}
										{new Date(
											releases[appname].created_at
										).toDateString()}
									</Card.Subtitle>
									<Card.Text
										dangerouslySetInnerHTML={{
											__html: getDescription(appname)
										}}
									>
										{}
									</Card.Text>
									<br />
									{releases[appname].assets.map(
										(a: any, i: any) => {
											ReactTooltip.rebuild();
											return (
												<Card.Link
													data-tip={`Download ${parseAppName(
														appname
													)} - ${getAssetName(
														a.name
													)}`}
													key={`${appname}/asset/${i}/`}
													href={
														a.browser_download_url
													}
												>
													{' '}
													{getAssetName(a.name)}
												</Card.Link>
											);
										}
									)}
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
