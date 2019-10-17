import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Table from 'react-bootstrap/Table';

import { useDispatch, useSelector } from 'react-redux';

import { fetchNextBlocks } from '../modules/dashboard';
import { networkBlocks } from '../selectors';
import { Block } from '../client';

const STable = styled(Table)`
	td {
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
	onClickHandler: (b: Block) => () => void;
};

const Blocks: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const blocks = useSelector(networkBlocks);

	const [loadMore, setLoadMore] = useState(false);

	const fetchMoreBlocks = () => dispatch(fetchNextBlocks());

	useEffect(() => {
		const table = document.getElementById('blocksTable');

		window.addEventListener('scroll', () => {
			if (
				window.scrollY + window.innerHeight >=
				table!.clientHeight + table!.offsetTop
			) {
				setLoadMore(true);
			} else {
				setLoadMore(false);
			}
		});

		return () =>
			window.removeEventListener('scroll', () => {
				// pass
			});
	}, []);

	useEffect(() => {
		if (loadMore) {
			fetchMoreBlocks();
		}
	}, [loadMore]);

	return (
		<>
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
						<th># Txs</th>
						<th># Sigs</th>
						<th className="d-none d-lg-table-cell">State Hash</th>
						<th className="d-none d-lg-table-cell">Peers Hash</th>
						<th className="d-none d-lg-table-cell">
							Round Received
						</th>
					</tr>
				</thead>
				<tbody>
					{blocks.map((b, i) => {
						return (
							<tr onClick={props.onClickHandler(b)} key={i}>
								<td>{b.index}</td>
								<td>{b.transactions.length}</td>
								<td>{b.signatures.length}</td>
								<td className="d-none d-lg-table-cell">
									{b.state_hash}
								</td>
								<td className="d-none d-lg-table-cell">
									{b.peers_hash}
								</td>
								<td className="d-none d-lg-table-cell">
									{b.round_received}
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
