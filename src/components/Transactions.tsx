import React, { useEffect } from 'react';

import { Currency } from 'evm-lite-utils';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import Media from 'react-bootstrap/Media';

import Figure from './Figure';

import { Transaction as TTransaction } from '../client';
import { fetchTransactions } from '../modules/dashboard';
import { selectTransactions } from '../selectors';
import { commaSeperate, parseBalance } from '../utils';

const STransactions = styled.div`
	.media {
		background: var(--light-grey);
		padding: 15px 20px;
		border: 1px solid var(--border-color);
		margin-bottom: 10px;
		border-radius: var(--border-radius) !important;
		align-items: center;

		p {
			margin-bottom: 0 !important;
		}
	}

	.media-body {
		min-width: 130px;
	}

	.purpleasd {
	}
`;

const SCallType = styled.div`
	transition: all 0.2s ease-out;
	padding: 4px 0px;
	min-width: 50px;
	border-radius: var(--border-radius) !important;
	text-decoration: none !important;
	border: 3px solid;
	border-color: transparent;
	cursor: pointer;
	text-align: center !important;
	height: 100%;
	font-size: 13px;
	align-items: center;
	min-width: 60px;
`;

const SPOA = styled(SCallType)`
	border-color: var(--purple) !important;
	font-weight: 600 !important;
`;

const STransfer = styled(SCallType)`
	background-color: var(--green) !important;
	font-weight: 600 !important;
	color: white;
`;

type Props = {
	transactions?: TTransaction[];
};

const Transaction: React.FC<Props> = props => {
	const dispatch = useDispatch();

	let transactions = useSelector(selectTransactions);

	if (props.transactions) {
		transactions = props.transactions;
	}

	const fetchTxs = () => dispatch(fetchTransactions());
	useEffect(() => {
		if (props.transactions === undefined) {
			fetchTxs();
		}
	}, []);

	return (
		<STransactions>
			{transactions.length === 0 && (
				<div className="orange">No transactions.</div>
			)}
			{transactions.map((t, i) => (
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
					<Figure
						className="align-items-center mr-5"
						address={t.sender}
						size={35}
						caption={'Sender'}
					/>
					<Figure
						className="mr-5"
						address={t.to}
						size={35}
						caption={'To'}
					/>
					<Media.Body className="">
						<b>
							{commaSeperate(t.gas)} x {t.gas_price}a
						</b>
						<p className="small mono">Transaction Fee</p>
					</Media.Body>
					<div className="align-self-center mr-2">
						<h5 className="">
							{parseBalance(
								new Currency(
									t.amount === '0' ? 0 : t.amount + 'a'
								)
							)}
						</h5>
					</div>
				</Media>
			))}
		</STransactions>
	);
};

export default Transaction;
