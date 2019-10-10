import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { IBabbleBlock } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';
import { Spring } from 'react-spring/renderprops';

import { config, MonetInfo } from '../monet';

import Block from './Block';

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

type Props = {
	lastBlockIndexIncreaseHook: (index: number) => any;
};

const Blocks: React.FC<Props> = props => {
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
		const i = await n.getInfo<MonetInfo>();
		const l = lastFetchedBlockIndex || parseInt(i.last_block_index, 10);

		// callback
		if (!lastFetchedBlockIndex) {
			props.lastBlockIndexIncreaseHook(parseInt(i.last_block_index, 10));
		}

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
				console.log('true');
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
			fetchBlocks();
		}

		setLoadMore(false);
	}, [loadMore]);

	// Polling
	let poller: any;

	const fetchNewBlocks = async () => {
		const info = await n.getInfo<MonetInfo>();

		const nowLastBlockIndex = Number(info.last_block_index);
		const lastBlockIndex = blocks[0].Body.Index;

		if (nowLastBlockIndex > lastBlockIndex) {
			// callback
			props.lastBlockIndexIncreaseHook(nowLastBlockIndex);

			const newBlocks = await n.consensus!.getBlocks(
				lastBlockIndex + 1,
				nowLastBlockIndex - lastBlockIndex - 1
			);

			const all = [...newBlocks.reverse(), ...blocks];

			setBlocks(all);
		}
	};

	useEffect(() => {
		poller = setInterval(() => {
			fetchNewBlocks().then(() => console.log('(5s) Fetching Blocks...'));
		}, 5000);

		return () => clearInterval(poller);
	});

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
							<Spring
								from={{ opacity: 0 }}
								to={{ opacity: 1 }}
								key={bl.Body.Index + 'y'}
							>
								{style => (
									<tr
										style={style}
										onClick={onBlockClickBind(bl)}
										key={bl.Body.Index + 'x'}
									>
										<td>{bl.Body.Index}</td>
										<td>{bl.Body.Transactions.length}</td>
										<td>
											{Object.keys(bl.Signatures).length}
										</td>
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
								)}
							</Spring>
						);
					})}
				</tbody>
			</STable>
		</>
	);
};

export default Blocks;
