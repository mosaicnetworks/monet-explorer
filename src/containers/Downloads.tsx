import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import { Application, DownloadsAPI } from '../client';
import { capitalize } from '../utils';

import Section, { Grid, Q } from '../ui';

import WALLET from '../assets/monet-wallet.png';
import MONETD from '../assets/monetd.png';
import MONETCLI from '../assets/monetcli.png';
import HUB from '../assets/hub.png';
import COMPS from '../assets/computers.png';
import LIBRARY from '../assets/library.png';

const SWrapper = styled.div`
	img {
		border-radius: 3px;
	}
`;

const SGrey = styled.div`
	background: var(--light-grey);
	@media (max-width: 575px) {
		padding: 50px 0;
	}
`;

const SBlue = styled.div`
	background: var(--blue);
	color: white;

	@media (max-width: 575px) {
		padding: 50px 0;
	}
`;

const SLink = styled.a`
	display: inline-block;
	padding: 10px 20px;
	border: 1px solid #eee;
	padding-right: 30px;
	background: var(--light-blue);
	font-size: 16px;
	font-weight: 600;
	margin-right: 10px;
	margin-bottom: 10px;

	img {
		margin-right: 10px;
	}
`;

const Downloads: React.FC<{}> = () => {
	const c = new DownloadsAPI();

	const [os] = useState(['linux', 'mac', 'windows']);
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
		<SWrapper>
			<SBlue>
				<Section padding={60}>
					<Grid
						fluid={true}
						className="align-items-center ml-md-5 mr-md-5"
					>
						<Q pos={[1, 1]} xs={12} md={4}>
							<h1 className="mt-3 mb-4">The Monet Toolchain</h1>
							<p className="pr-5">
								The software to run and interact with the Monet
								distributed smart-contract platform
							</p>
							<p className="mt-4">
								<Button
									href="http://bit.ly/monet-whitepaper"
									variant="outline-light"
									className=" mr-2"
								>
									Whitepaper
								</Button>
								<Button
									href="https://monetd.readthedocs.io/en/latest/"
									variant="warning"
								>
									Docs
								</Button>
							</p>
						</Q>
						<Q pos={[1, 2]} className="d-none d-lg-block">
							<img width={'100%'} src={LIBRARY} />
						</Q>
					</Grid>
				</Section>
			</SBlue>
			<Section>
				<Grid fluid={true}>
					<Q pos={[1, 1]} className="mr-lg-2" md={4}>
						<div className="aboveheader">Latest</div>
						<h3 className="mb-2">Monet Daemon</h3>
						<div className="mb-4">
							<a
								href="https://github.com/mosaicnetworks/monetd"
								className="mr-2"
							>
								Github
							</a>
						</div>
						<div>
							Monetd is the daemon component of the Monet
							Toolchain; a distributed smart-contract platform
							based on EVM-Lite and Babble. The Monet Toolchain
							underpins the MONET Hub, but it is also available
							for use in other projects.
							<br />
							<br />
							You can read more about MONET in the whitepaper.
						</div>
						<div className="mt-4">
							<SLink href="https://dashboard.monet.network/api/downloads/monetd/?os=linux">
								<img
									width={25}
									src="https://img.icons8.com/color/48/000000/linux.png"
								/>
								Linux
							</SLink>
							<SLink href="https://dashboard.monet.network/api/downloads/monetd/?os=mac">
								<img
									width={25}
									src="https://img.icons8.com/color/48/000000/mac-os.png"
								/>
								Mac
							</SLink>
							<SLink href="https://dashboard.monet.network/api/downloads/monetd/?os=windows">
								<img
									width={25}
									src="https://img.icons8.com/color/48/000000/windows-10.png"
								/>
								Windows
							</SLink>
						</div>
					</Q>
					<Q pos={[1, 2]} className="ml-lg-5 text-center">
						<br />
						<img className="mt-xs-5" width={'100%'} src={MONETD} />
					</Q>
				</Grid>
			</Section>
			<SGrey>
				<Section>
					<Grid fluid={true}>
						<Q
							pos={[1, 2]}
							className="mr-5"
							xs={{
								span: 12,
								order: 1
							}}
							md={{
								span: 4,
								order: 2
							}}
						>
							<div className="aboveheader">Latest</div>
							<h3 className="mb-2">Monet Wallet</h3>
							<div className="mb-4">
								<a
									href="https://github.com/mosaicnetworks/monet-wallet"
									className="mr-2"
								>
									Github
								</a>
							</div>
							<div>A user interface to interact with Monet.</div>
							<div className="mt-4">
								<SLink href="https://dashboard.monet.network/api/downloads/monet-wallet/?os=linux">
									<img
										width={25}
										src="https://img.icons8.com/color/48/000000/linux.png"
									/>
									Linux
								</SLink>
								<SLink href="https://dashboard.monet.network/api/downloads/monet-wallet/?os=mac">
									<img
										width={25}
										src="https://img.icons8.com/color/48/000000/mac-os.png"
									/>
									Mac
								</SLink>
								{/* <SLink href="https://dashboard.monet.network/api/downloads/monet-wallet/?os=windows">
									<img
										width={25}
										src="https://img.icons8.com/color/48/000000/windows-10.png"
									/>
									Windows
								</SLink> */}
							</div>
						</Q>
						<Q
							pos={[1, 1]}
							xs={{
								span: 12,
								order: 2
							}}
							md={{
								span: true,
								order: 1
							}}
							className="mr-lg-5 text-center"
						>
							<br />
							<img
								className="mt-xs-5"
								width={'100%'}
								src={WALLET}
							/>
						</Q>
					</Grid>
				</Section>
			</SGrey>
			<Section>
				<Grid fluid={true}>
					<Q pos={[1, 1]} className="mr-lg-2" md={4}>
						<div className="aboveheader">Latest</div>
						<h3 className="mb-2">Monet CLI</h3>
						<div className="mb-4">
							<a
								href="https://github.com/mosaicnetworks/monetcli"
								className="mr-2"
							>
								Github
							</a>
						</div>
						<div>A CLI wallet to interact with the Monet Hub.</div>
						<div className="mt-4">
							<SLink href="https://dashboard.monet.network/api/downloads/monetcli/?os=linux">
								<img
									width={25}
									src="https://img.icons8.com/color/48/000000/linux.png"
								/>
								Linux
							</SLink>
							<SLink href="https://dashboard.monet.network/api/downloads/monetcli/?os=mac">
								<img
									width={25}
									src="https://img.icons8.com/color/48/000000/mac-os.png"
								/>
								Mac
							</SLink>
							<SLink href="https://dashboard.monet.network/api/downloads/monetcli/?os=windows">
								<img
									width={25}
									src="https://img.icons8.com/color/48/000000/windows-10.png"
								/>
								Windows
							</SLink>
						</div>
					</Q>
					<Q pos={[1, 2]} className="ml-lg-5 text-center">
						<br />
						<img
							className="mt-xs-5"
							width={'100%'}
							src={MONETCLI}
						/>
					</Q>
				</Grid>
			</Section>
		</SWrapper>
	);
};

export default Downloads;
