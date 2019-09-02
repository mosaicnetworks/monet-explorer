import React, { useEffect, useState } from 'react';

import Node from 'evm-lite-core';

import { Babble, IBabbleBlock } from 'evm-lite-consensus';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Message, Pagination, PaginationProps } from 'semantic-ui-react';
import { Container, Grid, Table } from 'semantic-ui-react';

import { blocks as a, IStore } from '@monetexplorer/redux';

import Box from '../components/Box';

import { HOST, PORT } from '../const';

const Index: React.FC<{}> = () => {
	const blocksPerPage = 50;

	// dispatch
	const dispatch = useDispatch();

	// component scoped node
	const b = new Babble(HOST, PORT);
	const n = new Node(HOST, PORT, b);

	const [error, setError] = useState('');
	const [lastBlockIndex, setLastBlockIndex] = useState(0);
	const [activePage, setActivePage] = useState(1);

	const blocks = useSelector<IStore, IBabbleBlock[]>(
		store => store.blocks.all
	);

	const getLastBlockIndex = async () => {
		const res = await n.getInfo();

		setLastBlockIndex(res.last_block_index);
	};

	const fetchBlocks = async (start: number, end: number) =>
		dispatch(a.fetch(start, end - start));

	useEffect(() => {
		getLastBlockIndex().then(() => fetchBlocks(0, 10));
	}, []);

	/** Pagination Start */
	const totalPages = Math.ceil(lastBlockIndex / blocksPerPage);
	const onChangePage = (_: any, data: PaginationProps) => {
		setActivePage(Number(data.activePage || 1));
	};

	const renderBlocks = () => {
		const start = (activePage - 1) * blocksPerPage;
		const end = activePage * blocksPerPage + 1;

		const pageBlocks = blocks.reverse().slice(start, end);

		return pageBlocks.map(block => {
			return (
				<Table.Row key={block.Body.Index}>
					<Table.Cell textAlign={'center'} selectable={true}>
						<Link to={`/block/${block.Body.Index}`}>
							{block.Body.Index}
						</Link>
					</Table.Cell>
					<Table.Cell selectable={true}>
						<Link to={`/block/${block.Body.Index}`}>
							{block.Body.StateHash}
						</Link>
					</Table.Cell>
					<Table.Cell selectable={true}>
						<Link to={`/block/${block.Body.Index}`}>
							{block.Body.PeersHash}
						</Link>
					</Table.Cell>
					<Table.Cell selectable={true}>
						<Link to={`/block/${block.Body.Index}`}>
							{block.Body.Transactions.length}
						</Link>
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<Box padding={false} heading={'Blocks'}>
						{error && (
							<Message negative={true}>
								<Message.Header>
									Looks like something went wrong!
								</Message.Header>
								<p>{error}</p>
							</Message>
						)}
						{totalPages !== 1 && (
							<Pagination
								boundaryRange={0}
								defaultActivePage={1}
								ellipsisItem={null}
								firstItem={null}
								lastItem={null}
								siblingRange={1}
								totalPages={totalPages}
								onPageChange={onChangePage}
								disabled={totalPages === 1}
							/>
						)}
						<Table celled={true} fixed={true} striped={true}>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell
										textAlign={'center'}
										width={1}
									>
										Index
									</Table.HeaderCell>
									<Table.HeaderCell>
										State Hash
									</Table.HeaderCell>
									<Table.HeaderCell>
										Peers Hash
									</Table.HeaderCell>
									<Table.HeaderCell>
										No. of Txs
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>{renderBlocks()}</Table.Body>
						</Table>
					</Box>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Index;
