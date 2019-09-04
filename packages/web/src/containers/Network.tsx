import React, { useEffect, useState } from 'react';

import Node from 'evm-lite-core';
import styled from 'styled-components';

import { Babble, IBabblePeer } from 'evm-lite-consensus';
import { JsonToTable } from 'react-json-to-table';
import { useSelector } from 'react-redux';
import { Container, Grid, Table } from 'semantic-ui-react';

import { IConfigState, IStore } from '@monetexplorer/redux';

import Box from '../components/Box';

const SSelectableRow = styled(Table.Row)`
	&:hover {
		cursor: pointer !important;
	}
`;

const Network: React.FC<{}> = () => {
	const config = useSelector<IStore, IConfigState>(store => store.config);

	// component scoped node
	const b = new Babble(config.host, config.port);
	const n = new Node(config.host, config.port, b);

	const [peers, setPeers] = useState<IBabblePeer[]>([]);
	const [info, setInfo] = useState<any>();
	const [infos, setInfos] = useState<any[]>([]);

	const fetchPeers = async () => {
		try {
			const p = await n.consensus!.getPeers();
			setPeers(p);
		} catch (e) {
			console.log(e);
		}
	};

	const fetchInfo = async (peer: IBabblePeer) => {
		try {
			const l = peer.NetAddr.split(':');
			const node = new Node(l[0], 8080);

			const i = await node.getInfo();

			setInfo(i);
		} catch (e) {
			console.log(e);
		}
	};

	const fetchInfos = async () => {
		const list: any[] = [];

		for (const peer of peers) {
			try {
				const l = peer.NetAddr.split(':');
				const node = new Node(l[0], 8080);

				const i = await node.getInfo();

				list.push(i);
			} catch (e) {
				console.log(e);
			}
		}

		setInfos(list);
	};

	const renderPeers = () => {
		return peers.map(peer => {
			const fn = () => fetchInfo(peer);

			return (
				<SSelectableRow onClick={fn} key={peer.Moniker}>
					<Table.Cell>{peer.Moniker}</Table.Cell>
					<Table.Cell>{peer.NetAddr}</Table.Cell>
					<Table.Cell>{peer.PubKeyHex}</Table.Cell>
				</SSelectableRow>
			);
		});
	};

	const renderInfos = () => {
		return infos.map(i => {
			return (
				<Table.Row key={i.moniker}>
					<Table.Cell>{i.moniker}</Table.Cell>
					<Table.Cell>{i.last_block_index}</Table.Cell>
					<Table.Cell>{i.consensus_transactions}</Table.Cell>
					<Table.Cell>{i.state}</Table.Cell>
				</Table.Row>
			);
		});
	};

	useEffect(() => {
		fetchPeers();
	}, []);

	useEffect(() => {
		fetchInfos();
	}, [peers]);

	const onPeerClick = () => {
		// pass
	};

	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<Box padding={false} heading={'Peers'}>
						<Table celled={true} fixed={true} striped={true}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Moniker</Table.HeaderCell>
									<Table.HeaderCell>
										Last Block
									</Table.HeaderCell>
									<Table.HeaderCell>
										Consensus Txs
									</Table.HeaderCell>
									<Table.HeaderCell>State</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>{renderInfos()}</Table.Body>
						</Table>
					</Box>
				</Grid.Column>
				<Grid.Column width={6}>
					<Box padding={false} heading={'Peers'}>
						<Table celled={true} fixed={true} striped={true}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell width={3}>
										Moniker
									</Table.HeaderCell>
									<Table.HeaderCell width={4}>
										NetAddr
									</Table.HeaderCell>
									<Table.HeaderCell>
										Public Key
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>{renderPeers()}</Table.Body>
						</Table>
					</Box>
					<Box padding={false} heading={'Detail'}>
						<JsonToTable json={info} />
					</Box>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Network;
