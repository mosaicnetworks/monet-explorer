import React, { useEffect } from 'react';

import { Currency } from 'evm-lite-utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import styled from 'styled-components';

import Media from 'react-bootstrap/Media';

import Avatar from './Figure';
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

const STransactions = styled.div`
	.media {
		background: #fff;
		padding: 15px 20px;
		border: 1px solid #eee;
		margin-bottom: 5px;
		border-radius: 3px !important;

		p {
			margin-bottom: 0 !important;
		}
	}

	.media-body {
		min-width: 200px;
	}
`;

const STransferText = styled.div`
	color: var(--green);
	font-weight: 600 !important;
`;

const SContractText = styled.div`
	color: var(--purple);
	font-weight: 600 !important;
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
		<STransactions>
			{transactions.map((t, i) => (
				<Media key={`transaction-${i}`}>
					<Avatar
						className="mr-5"
						address={t.sender}
						size={40}
						caption={'From'}
					/>
					<Avatar
						className="mr-5"
						address={t.sender}
						size={40}
						caption={'To'}
					/>
					<div className="d-none d-md-block align-self-center mr-5">
						{new Currency(
							t.amount === '0' ? 0 : t.amount + 'a'
						).format('T')}
						<div className="small">Tenom</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-5">
						{commaSeperate(t.gas)}
						<div className="small">Gas</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-5">
						{t.gas_price}
						<div className="small">Gas Price</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-5" />
					<div className="d-none d-md-block align-text-end align-self-center mr-2">
						{(t.payload.length > 0 && (
							<>
								<SContractText className="small">
									Contract Call
								</SContractText>
							</>
						)) || (
							<STransferText className="small">
								Transfer
							</STransferText>
						)}
					</div>
				</Media>
			))}
		</STransactions>
	);
};

export default Transaction;
