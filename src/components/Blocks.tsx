import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import Media from 'react-bootstrap/Media';

import Avatar from './Avatar';

import { fetchNetworkBlocks } from '../modules/dashboard';
import { selectBlocks } from '../selectors';
import { pubKeyToAddress } from '../utils';
import { Block } from '../client';

const SBlocks = styled.div`
	.media {
		background: var(--light-grey);
		padding: 15px 20px;
		border: 1px solid #eee;
		margin-bottom: 10px;
		border-radius: 3px !important;

		p {
			margin-bottom: 0 !important;
		}
	}

	.media-body {
		min-width: 200px;
	}
`;

const SBlockAvatar = styled.div`
	transition: background 0.2s ease-out;
	/* font-size: 15px; */
	background: #eee;
	padding: 18px 15px;
	border-radius: 5px !important;
	color: black !important;
	text-decoration: none !important;
	cursor: pointer;
	font-weight: 700;
	text-align: center !important;
	height: 100%;
	font-size: 14px;
	align-items: center;
`;

type Props = {
	blocks?: Block[];
};

const Blocks: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const fetchBlocks = () => dispatch(fetchNetworkBlocks());

	let blocks = useSelector(selectBlocks);

	if (props.blocks) {
		blocks = props.blocks;
	}

	useEffect(() => {
		if (props.blocks !== undefined) {
			fetchBlocks();
		}
	}, []);

	return (
		<SBlocks>
			{blocks.length === 0 && 'No blocks to display.'}
			{blocks.map(b => (
				<Media key={b.index}>
					<SBlockAvatar className="align-self-center mr-3">
						#{b.index}
					</SBlockAvatar>
					<Media.Body>
						<p className="small">Signatures</p>
						<p className="">
							{b.signatures.slice(0, 4).map(s => (
								<Avatar
									key={s.signature}
									address={pubKeyToAddress(
										s.validator.public_key
									)}
									size={35}
								/>
							))}{' '}
							<b className="orange bold">
								{' '}
								+ {b.signatures.length - 4}
							</b>
						</p>
					</Media.Body>
					<div className="d-none d-md-block align-self-center mr-5">
						<b>{b.transactions.length}</b>
						<div className="small">Transactions</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-2">
						<b>{b.internal_transactions.length}</b>
						<div className="small">Internal Tx</div>
					</div>
				</Media>
			))}
		</SBlocks>
	);
};

export default Blocks;
