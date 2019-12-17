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

const SWrapper = styled.div`
	img {
		border-radius: 3px;
	}
`;

const SMonet = styled.div`
	/* background: var(--light-blue); */
`;

const SBlue = styled.div`
	background: var(--blue);
	color: white;
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
						<Q pos={[1, 1]}>
							<h1 className="mt-3 mb-3">The Monet Toolchain</h1>
							<p className="pr-5">
								The software to run and interact with the Monet
								distributed smart-contract platform
							</p>
							<p className="mt-4">
								<Button
									variant="outline-light"
									className=" mr-2"
								>
									Whitepaper
								</Button>
								<Button variant="warning">Docs</Button>
							</p>
						</Q>
						<Q pos={[1, 2]} className="text-center">
							<img
								width={350}
								src="https://monet.network/app/images/illustrations/ecosystem/Inter_blockchain.svg"
							/>
						</Q>
					</Grid>
				</Section>
			</SBlue>
			<SMonet>
				<Section>
					<Grid fluid={true}>
						<Q pos={[1, 1]} className="mr-5" md={4}>
							<div className="aboveheader">Latest</div>
							<h3 className="mb-2">Monet Daemon</h3>
							<div className="mb-4">
								<a href="" className="mr-2">
									Github
								</a>
								<a href="" className="mr-2">
									Docs
								</a>
							</div>
							<div>
								Monetd is the daemon component of the Monet
								Toolchain; a distributed smart-contract platform
								based on EVM-Lite and Babble. The Monet
								Toolchain underpins the MONET Hub, but it is
								also available for use in other projects.
								<br />
								<br />
								You can read more about MONET in the whitepaper.
							</div>
							<div className="mt-4">
								<Button className="mr-2">Linux</Button>
								<Button className="mr-2">Mac</Button>
								<Button className="mr-2">Windows</Button>
							</div>
						</Q>
						<Q pos={[1, 2]} className="text-center">
							<img width={'100%'} src={MONETD} />
						</Q>
					</Grid>
				</Section>
			</SMonet>
			<Section>
				<Grid fluid={true}>
					<Q pos={[1, 2]} className="mr-5" md={4}>
						<div className="aboveheader">Latest</div>
						<h3 className="mb-2">Monet Wallet</h3>
						<div className="mb-4">
							<a href="" className="mr-2">
								Github
							</a>
							<a href="" className="mr-2">
								Docs
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
							<Button className="mr-2">Linux</Button>
							<Button className="mr-2">Mac</Button>
							<Button className="mr-2">Windows</Button>
						</div>
					</Q>
					<Q pos={[1, 1]} className="text-center">
						<img width={'100%'} src={WALLET} />
					</Q>
				</Grid>
			</Section>
			<Section>
				<Grid fluid={true}>
					<Q pos={[1, 1]} className="mr-5" md={4}>
						<div className="aboveheader">Latest</div>
						<h3 className="mb-2">Monet CLI</h3>
						<div className="mb-4">
							<a href="" className="mr-2">
								Github
							</a>
							<a href="" className="mr-2">
								Docs
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
							<Button className="mr-2">Linux</Button>
							<Button className="mr-2">Mac</Button>
							<Button className="mr-2">Windows</Button>
						</div>
					</Q>
					<Q pos={[1, 2]} className="text-center">
						<img width={'100%'} src={MONETCLI} />
					</Q>
				</Grid>
			</Section>
		</SWrapper>
	);
};

export default Downloads;
