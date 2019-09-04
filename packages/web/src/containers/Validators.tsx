import React, { useState, useEffect } from 'react';

import Node from 'evm-lite-core';
// import styled from 'styled-components';

import { Babble, IBabblePeer } from 'evm-lite-consensus';
import { Container, Grid, Table } from 'semantic-ui-react';

import Box from '../components/Box';

import { HOST, PORT } from '../const';

const Validators: React.FC<{}> = () => {
	// component scoped node
	const b = new Babble(HOST, PORT);
	const n = new Node(HOST, PORT, b);

	const [peers, setPeers] = useState<IBabblePeer[]>([]);

	const fetchPeers = async () => {
		try {
			const p = await n.consensus.getPeers();
			setPeers(p);
		} catch (e) {
			console.log(e);
		}
	};

	const renderPeers = () => {
		return peers.map(peer => {
			return (
				<Table.Row key={peer.Moniker}>
					<Table.Cell textAlign={'center'}>{peer.Moniker}</Table.Cell>
					<Table.Cell>{peer.NetAddr}</Table.Cell>
					<Table.Cell>{peer.PubKeyHex}</Table.Cell>
				</Table.Row>
			);
		});
	};

	useEffect(() => {
		fetchPeers();
	}, []);

	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<Box padding={false} heading={'Peers'}>
						<Table celled={true} fixed={true} striped={true}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell
										textAlign={'center'}
										width={2}
									>
										Moniker
									</Table.HeaderCell>
									<Table.HeaderCell width={3}>
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
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Validators;
