import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Loader from '../components/Loader';

import { SContent } from '../components/styles';

import ExplorerAPIClient, { Application } from '../client';

import Background from '../assets/bg.svg';
import Logo from '../assets/monet.svg';

const Std = styled.td`
	li {
		list-style: none;
		padding-bottom: 10px !important;
	}

	li a {
		/* padding: 10px !important; */
		background: #f3f3f3;
		border-radius: 5px;
	}

	img {
		margin-right: 4px;
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

	return (
		<>
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
						<Table>
							<thead>
								<th>Created</th>
								<th>Name</th>
								<th>Version</th>
								<th>Assets</th>
							</thead>
							<tbody>
								<Loader loading={loading} />
								{Object.keys(releases).map(k => {
									return (
										<tr key={k}>
											<td>
												{new Date(
													releases[k].created_at
												).toDateString()}
											</td>
											<td>
												<a href={releases[k].html_url}>
													<code className="mono">
														<pre>{k}</pre>
													</code>
												</a>
											</td>
											<td className="mono">
												{releases[k].tag_name}
											</td>
											<Std>
												{releases[k].assets.map(
													(a: any, i: any) => {
														return (
															<li
																className="mono"
																key={i}
															>
																<a
																	href={
																		a.browser_download_url
																	}
																>
																	{a.content_type ===
																		'application/octet-stream' ||
																	a ? (
																		<img
																			src="http://www.icons101.com/icon_png/size_256/id_82559/Terminal.png"
																			width={
																				20
																			}
																		/>
																	) : (
																		''
																	)}{' '}
																	{a.name}
																</a>
															</li>
														);
													}
												)}
											</Std>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</SContent>
			</Container>
		</>
	);
};

export default Transactions;
