import React, { useEffect, useState } from 'react';

import Node from 'evm-lite-core';
import styled from 'styled-components';

import { IConfigState, IStore } from '@monetexplorer/redux';
import { Babble, IBabbleBlock } from 'evm-lite-consensus';
import { useSelector } from 'react-redux';
import { Message, Pagination, PaginationProps } from 'semantic-ui-react';

import { IMonetInfo } from '../monet';

import BlocksTable from '../components/BlocksTable';
import Box from '../components/Box';

const Pages = styled(Pagination)`
	margin: 10px !important;
	float: right;
`;

const Blocks: React.FC<{}> = () => {
	const blocksPerPage = 50;

	const config = useSelector<IStore, IConfigState>(store => store.config);

	// component scoped node
	const b = new Babble(config.host, config.port);
	const n = new Node(config.host, config.port, b);

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
			const i = await n.getInfo<IMonetInfo>();

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

			const response = await n.consensus!.getBlocks(start, bpp);

			setBlocks(response.reverse());
		} catch (e) {
			setError(e.toString());
		}
	};

	useEffect(() => {
		fetchBlocks();
	}, [activePage]);

	return (
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
			<BlocksTable blocks={blocks} />
		</Box>
	);
};

export default Blocks;
