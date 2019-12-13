import React, { useEffect } from 'react';

import { Currency } from 'evm-lite-utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import styled from 'styled-components';

import Avatar from '../components/Avatar';
import Table from '../components/Table';

import { fetchNetworkBlocks, fetchTransactions } from '../modules/dashboard';
import {
	selectBlocks,
	selectBlocksLoading,
	selectTransactions,
	selectTxsLoading
} from '../selectors';
import { commaSeperate } from '../utils';

import Section, { Grid, Q } from '../ui';

const SBlock = styled.div`
	transition: background 0.2s ease-out;
	border-bottom: 1px solid #eee;
	/* padding-bottom: 5px; */
	display: block;
	/* padding: 15px; */
	cursor: pointer;

	a:hover {
		text-decoration: none !important;
	}

	:hover {
		background: #f9f9f9 !important;
	}

	.active {
		background: var(--blue) !important;
		color: white !important;
		text-decoration: none !important;
	}

	.badge {
		/* background: var(--blue); */
		/* display: block !important; */
		/* margin: 5px; */
		/* border-radius: 0; */
		margin: 0;
		font-size: 12px;
		padding: 5px 7px;
	}

	.badge + .badge {
		margin: 5px;
	}
`;

type Props = {};

const Transaction: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const transactions = useSelector(selectTransactions);

	const fetchTxs = () => dispatch(fetchTransactions());
	useEffect(() => {
		fetchTxs();
	}, []);

	return (
		<SBlock>
			<Table>
				<thead>
					<tr>
						<th>From</th>
						<th>To</th>
						<th>Value</th>
						<th>Gas</th>
						<th>Gas Price</th>
						<th className="text-center">Contract Call?</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map(t => (
						<tr key={t.data}>
							<td>
								<Avatar address={t.sender} size={35} />
							</td>
							<td>
								<Avatar address={t.to} size={35} />
							</td>
							<td className="mono">
								{new Currency(
									t.amount === '0' ? 0 : t.amount + 'a'
								).format('T')}
							</td>
							<td className="mono">{commaSeperate(t.gas)}</td>
							<td className="mono"> {t.gas_price}</td>
							<td className="text-center">
								{(t.payload.length > 0 && (
									<img
										src="https://image.flaticon.com/icons/svg/1828/1828640.svg"
										width={20}
									/>
								)) ||
									'-'}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</SBlock>
	);
};

export default Transaction;
