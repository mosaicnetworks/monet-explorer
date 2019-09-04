import React, { useEffect, useState } from 'react';

import Node from 'evm-lite-core';
import styled from 'styled-components';

import { Babble, IBabbleBlock } from 'evm-lite-consensus';
import { Link } from 'react-router-dom';
import { Message, Pagination, PaginationProps } from 'semantic-ui-react';
import { Container, Grid, Table } from 'semantic-ui-react';

import Box from '../components/Box';

import { HOST, PORT } from '../const';

const Pages = styled(Pagination)`
	margin: 10px !important;
	float: right;
`;

const IndexCell = styled(Table.Cell)``;

const Blocks: React.FC<{}> = () => {
	const blocksPerPage = 50;

	// component scoped node
	const b = new Babble(HOST, PORT);
	const n = new Node(HOST, PORT, b);

	const [lastBlockIndex, setLastBlockIndex] = useState(0);
	const [activePage, setActivePage] = useState(1);
	const [error, setError] = useState('');
	const [blocks, setBlocks] = useState<IBabbleBlock[]>([]);

	/** Pagination Start */
	const totalPages = Math.ceil(lastBlockIndex / blocksPerPage);
	const onChangePage = (_: any, data: PaginationProps) => {
		setActivePage(Number(data.activePage || 1));
	};

	const getCurrentPageBlockIndex = (l: number): number => {
		const end = l - activePage * blocksPerPage;

		return end < 0 ? 0 : end;
	};

	const fetchBlocks = async () => {
		let l: number = 0;
		try {
			const i = await n.getInfo();

			l = parseInt(i.last_block_index, 10);

			setLastBlockIndex(l);
		} catch (e) {
			setError(e.toString());
		}

		const start = getCurrentPageBlockIndex(l);

		try {
			let bpp = blocksPerPage;

			if (totalPages === activePage) {
				bpp = lastBlockIndex - (totalPages - 1) * blocksPerPage;
			}

			const response = await n.consensus.getBlocks(start, bpp);

			setBlocks(response.reverse());
		} catch (e) {
			setError(e.toString());
		}
	};

	useEffect(() => {
		fetchBlocks();
	}, [activePage]);

	const renderBlocks = () => {
		return blocks.map(block => {
			return (
				<Table.Row selectable={true} key={block.Body.Index}>
					<IndexCell textAlign={'center'} selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							<b>{block.Body.Index}</b>
						</Link>
					</IndexCell>
					<Table.Cell textAlign={'center'} selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							{block.Body.Transactions.length}
						</Link>
					</Table.Cell>
					<Table.Cell textAlign={'center'} selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							{Object.keys(block.Signatures).length}
						</Link>
					</Table.Cell>
					<Table.Cell selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							{block.Body.StateHash}
						</Link>
					</Table.Cell>
					<Table.Cell selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							{block.Body.PeersHash}
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
								<Message.Header>Oops!</Message.Header>
								<p>{error}</p>
							</Message>
						)}
						{totalPages !== 1 && !error && (
							<Pages
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
									<Table.HeaderCell
										textAlign={'center'}
										width={1}
									>
										No. of Txs
									</Table.HeaderCell>
									<Table.HeaderCell
										textAlign={'center'}
										width={1}
									>
										No. of Sigs
									</Table.HeaderCell>
									<Table.HeaderCell>
										State Hash
									</Table.HeaderCell>
									<Table.HeaderCell>
										Peers Hash
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

export default Blocks;
