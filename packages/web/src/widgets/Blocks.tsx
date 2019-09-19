import React, { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';

import Node from 'evm-lite-core';

import { IConfigState, IStore } from '@monetexplorer/redux';
import { Babble, IBabbleBlock } from 'evm-lite-consensus';
import { useSelector } from 'react-redux';

import { IMonetInfo } from '../monet';

const Blocks: React.FC<{}> = () => {
	const blocksPerPage = 50;

	const config = useSelector<IStore, IConfigState>(store => store.config);

	// component scoped node
	const b = new Babble(config.host, config.port);
	const n = new Node(config.host, config.port, b);

	const [loading, setLoading] = useState(true);
	const [lastBlockIndex, setLastBlockIndex] = useState(0);
	const [activePage, setActivePage] = useState(1);
	const [error, setError] = useState('');
	const [blocks, setBlocks] = useState<IBabbleBlock[]>([]);

	/** Pagination Start */
	const totalPages = Math.ceil(lastBlockIndex / blocksPerPage);

	const getCurrentPageBlockIndex = (l: number): number => {
		const end = l - activePage * blocksPerPage;

		return end < 0 ? 0 : end;
	};

	const fetchBlocks = async () => {
		setLoading(true);

		// await sleeper(2000);

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

		setLoading(false);
	};

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			return;
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		fetchBlocks();
	}, [activePage]);

	// Polling
	let poller: any;

	useEffect(() => {
		poller = setInterval(() => {
			fetchBlocks().then(() => console.log('Fetching blocks every 10s'));
		}, 1000);

		return () => clearInterval(poller);
	});

	return (
		<>
			<Table responsive={true} striped={true}>
				<thead>
					<tr>
						<th>Index</th>
						<th># of Txs</th>
						<th># of Sigs</th>
						<th>State Hash</th>
						<th>Peers Hash</th>
					</tr>
				</thead>
				<tbody>
					{blocks.map(bl => {
						return (
							<tr key={bl.Body.Index}>
								<td>{bl.Body.Index}</td>
								<td>{bl.Body.Transactions.length}</td>
								<td>{Object.keys(bl.Signatures).length}</td>
								<td>{bl.Body.StateHash}</td>
								<td>{bl.Body.PeersHash}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
};

export default Blocks;
