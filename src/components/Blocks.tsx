import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { IBabbleBlock } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';

import { IMonetInfo } from '../monet';

import Block from './Block';

const config = {
	host: 'camille.monet.network',
	port: 8080
};

const STable = styled(Table)`
	td {
		font-family: 'Fira Code', monospace;
		font-size: 14px;
	}

	tr {
		transition: background 0.2s ease-in;
	}

	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.02);
	}

	tbody tr:nth-of-type(odd):hover {
		background: rgba(226, 110, 64, 0.1) !important;
	}

	tbody tr:hover {
		cursor: pointer;
		background: rgba(226, 110, 64, 0.1) !important;
	}
`;

const Blocks: React.FC<{}> = () => {
	const blocksPerPage = 50;

	// component scoped node
	const n = new Monet(config.host, config.port);

	const [loadMore, setLoadMore] = useState(false);

	const [lastFetchedBlockIndex, setLastFetchedBlockIndex] = useState(0);
	const [blocks, setBlocks] = useState<IBabbleBlock[]>([]);

	const fetchBlocks = async () => {
		if (lastFetchedBlockIndex === -1) {
			return;
		}

		// Get last block index
		const i = await n.getInfo<IMonetInfo>();
		const l = lastFetchedBlockIndex || parseInt(i.last_block_index, 10);

		// Fetch blocks
		let count = blocksPerPage;
		let start = l - blocksPerPage;

		if (l < blocksPerPage) {
			count = l;
			start = 0;
		}

		const bks = await n.consensus!.getBlocks(start, count);

		// set states
		setLastFetchedBlockIndex(start || -1);
		setBlocks([...blocks, ...bks.reverse()]);
	};

	useEffect(() => {
		fetchBlocks();

		const table = document.getElementById('blocksTable');
		window.addEventListener('scroll', () => {
			if (
				window.scrollY + window.innerHeight >=
				table!.clientHeight + table!.offsetTop
			) {
				setLoadMore(true);
			}
		});
		return () =>
			window.removeEventListener('scroll', () => {
				// pass
			});
	}, []);

	useEffect(() => {
		if (loadMore) {
			console.log('HELLo');
			fetchBlocks();
		}

		setLoadMore(false);
	}, [loadMore]);

	// Polling
	// let poller: any;
	// useEffect(() => {
	// 	poller = setInterval(() => {
	// 		fetchBlocks().then(() => console.log('Fetching blocks every 10s'));
	// 	}, 1000);

	// 	return () => clearInterval(poller);
	// });

	// Select block
	const [selectedBlock, setSelectedBlock] = useState<IBabbleBlock>(
		{} as IBabbleBlock
	);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const onBlockClickBind = (block: IBabbleBlock) => (e: any) => {
		setSelectedBlock(block);
		handleShow();
	};

	return (
		<>
			{Object.keys(selectedBlock).length > 0 && (
				<Modal
					size={'lg'}
					centered={true}
					show={show}
					onHide={handleClose}
				>
					<Modal.Header closeButton={true}>
						<Modal.Title>
							Block {selectedBlock.Body.Index}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Block block={selectedBlock} />
					</Modal.Body>
				</Modal>
			)}
			<STable
				id="blocksTable"
				bordered={false}
				responsive={true}
				striped={true}
				cellPadding={'1px'}
			>
				<thead>
					<tr>
						<th>#</th>
						<th># of Txs</th>
						<th># of Sigs</th>
						<th className="d-none d-lg-table-cell">State Hash</th>
						<th className="d-none d-lg-table-cell">Peers Hash</th>
						<th className="d-none d-lg-table-cell">
							Round Received
						</th>
					</tr>
				</thead>
				<tbody>
					{blocks.map(bl => {
						return (
							<tr
								onClick={onBlockClickBind(bl)}
								key={bl.Body.Index}
							>
								<td>{bl.Body.Index}</td>
								<td>{bl.Body.Transactions.length}</td>
								<td>{Object.keys(bl.Signatures).length}</td>
								<td className="d-none d-lg-table-cell">
									{bl.Body.StateHash}
								</td>
								<td className="d-none d-lg-table-cell">
									{bl.Body.PeersHash}
								</td>
								<td className="d-none d-lg-table-cell">
									{bl.Body.RoundReceived}
								</td>
							</tr>
						);
					})}
				</tbody>
			</STable>
		</>
	);
};

export default Blocks;
