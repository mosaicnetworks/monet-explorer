import React, { useEffect, useState } from 'react';

import Node from 'evm-lite-core';

import { Babble, IBabbleBlock } from 'evm-lite-consensus';
import { Container, Form, Grid, Input, Table } from 'semantic-ui-react';

import { HOST, PORT } from '../const';

import Box from '../components/Box';

const Index: React.FC<{}> = () => {
	// component scoped node
	const b = new Babble(HOST, PORT);
	const n = new Node(HOST, PORT, b);

	const [lastBlockIndex, setLastBlockIndex] = useState(0);
	const [blocks, setBlocks] = useState<IBabbleBlock[]>([] as IBabbleBlock[]);

	const getLastBloxkIndex = async () => {
		const res = await n.getInfo();

		setLastBlockIndex(res.last_block_index);
	};

	const fetchBlocks = async (start: number, end: number) => {
		const d = end - start;
		const all: IBabbleBlock[] = [];

		for (let i = start; i <= end; i++) {
			const b = await n.consensus.getBlock(i);

			all.push(b);
		}

		setBlocks(all);
	};

	useEffect(() => {
		getLastBloxkIndex();
	}, []);

	useEffect(() => {
		fetchBlocks(0, lastBlockIndex);
	}, [lastBlockIndex]);

	const renderBlock = (b: IBabbleBlock) => {
		return (
			<Table.Row>
				<Table.Cell textAlign={'center'}>{b.Body.Index}</Table.Cell>
				<Table.Cell>{b.Body.StateHash}</Table.Cell>
				<Table.Cell>{b.Body.PeersHash}</Table.Cell>
			</Table.Row>
		);
	};

	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<h1>Blocks</h1>
					<Table celled={true} fixed={true} striped={true}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell
									textAlign={'center'}
									width={1}
								>
									Index
								</Table.HeaderCell>
								<Table.HeaderCell>State Hash</Table.HeaderCell>
								<Table.HeaderCell>Peers Hash</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>{blocks.map(renderBlock)}</Table.Body>
					</Table>
				</Grid.Column>
				{/* <Grid.Column width={4}>
					<Box heading={'Setting'}>{lastBlockIndex}</Box>
				</Grid.Column> */}
			</Grid>
		</Container>
	);
};

export default Index;
