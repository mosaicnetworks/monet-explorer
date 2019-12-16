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

	.purpleasd {
	}
`;

const SCallType = styled.div`
	transition: background 0.2s ease-out;
	padding: 18px 15px;
	min-width: 50px;
	border-radius: 5px !important;
	text-decoration: none !important;
	cursor: pointer;
	text-align: center !important;
	height: 100%;
	font-size: 13px;
	align-items: center;
	min-width: 60px;
`;

const SPOA = styled(SCallType)`
	background: var(--purple) !important;
	font-weight: 600 !important;
	color: white !important;
`;

const STransfer = styled(SCallType)`
	background: var(--green) !important;
	font-weight: 600 !important;
	color: white !important;
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
			{transactions.slice(0, 15).map((t, i) => (
				<Media key={`transaction-${i}`}>
					{t.payload.length > 0 ? (
						<SPOA className="purpleasd d-none d-md-block align-text-end align-self-center mr-4">
							<div>POA</div>
						</SPOA>
					) : (
						<STransfer className="purpleasd d-none d-md-block align-text-end align-self-center mr-4">
							<div>TX</div>
						</STransfer>
					)}

					<Avatar
						className="mr-5"
						address={t.sender}
						size={35}
						caption={'From'}
					/>
					<Avatar
						className="mr-5"
						address={t.to}
						size={35}
						caption={'To'}
					/>
					<div className="d-none d-md-block align-self-center mr-5">
						{commaSeperate(t.gas)}
						<div className="small">Gas</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-5">
						{t.gas_price}
						<div className="small">Gas Price</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-2">
						{new Currency(
							t.amount === '0' ? 0 : t.amount + 'a'
						).format('T')}
						<div className="small">Tenom</div>
					</div>
				</Media>
			))}
		</STransactions>
	);
};

export default Transaction;
