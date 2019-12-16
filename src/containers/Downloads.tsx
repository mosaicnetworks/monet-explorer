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

const SMonet = styled.div`
	background: white;
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
		<>
			<Section padding={30}>
				<Grid fluid={true}>
					<Q pos={[1, 1]}>
						<h1 className="mt-3">The Monet Toolchain</h1>
						<p>
							The software to run and interact with the Monet
							distributed smart-contract platform
						</p>
					</Q>
					<Q pos={[1, 2]} md={2}>
						<img width={100} src={HUB} />
					</Q>
				</Grid>
			</Section>
			<SMonet>
				<Section>
					<Grid fluid={true}>
						<Q pos={[1, 1]}>
							<h3>Monet Daemon</h3>
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
							<img src={MONETD} />
						</Q>
					</Grid>
				</Section>
			</SMonet>
			<Section>
				<Grid fluid={true}>
					<Q pos={[1, 1]} className="mr-5">
						<h3>Monet Wallet</h3>
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
					<Q pos={[1, 2]} className="text-center zero-padding mr-5">
						<img src={WALLET} />
					</Q>
				</Grid>
			</Section>
			<SMonet>
				<Section>
					<Grid fluid={true}>
						<Q pos={[1, 1]}>
							<h3>Monet CLI</h3>
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
							<img src={MONETCLI} />
						</Q>
					</Grid>
				</Section>
			</SMonet>
		</>
	);
};

export default Downloads;
