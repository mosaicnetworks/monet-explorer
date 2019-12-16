import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import Media from 'react-bootstrap/Media';

import Avatar from './Avatar';

import { fetchNetworkBlocks } from '../modules/dashboard';
import { selectBlocks } from '../selectors';
import { pubKeyToAddress } from '../utils';

const SBlocks = styled.div`
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

const Explore: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const fetchBlocks = () => dispatch(fetchNetworkBlocks());

	const blocks = useSelector(selectBlocks);

	useEffect(() => {
		fetchBlocks();
	}, []);

	return (
		<SBlocks>
			{blocks.map(b => (
				<Media key={b.index}>
					<SBlockAvatar className="align-self-center mr-3">
						#{b.index}
					</SBlockAvatar>
					<Media.Body>
						<p className="small">Signatures</p>
						<p className="">
							{b.signatures.map(s => (
								<Avatar
									key={s.signature}
									address={pubKeyToAddress(
										s.validator.public_key
									)}
									size={35}
								/>
							))}
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

export default Explore;
