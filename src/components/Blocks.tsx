import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import Media from 'react-bootstrap/Media';

import { fetchNetworkBlocks } from '../modules/dashboard';
import { selectBlocks } from '../selectors';
import Avatar from './Avatar';
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

const Explore: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const fetchBlocks = () => dispatch(fetchNetworkBlocks());

	const blocks = useSelector(selectBlocks);

	useEffect(() => {
		fetchBlocks();
	}, []);

	return (
		<SBlocks>
			{blocks.slice(0, 7).map(b => (
				<Media key={b.index}>
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
						<div className="small">Tx Count</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-5">
						<b>{b.internal_transactions.length}</b>
						<div className="small">Internal Tx Count</div>
					</div>
				</Media>
			))}
		</SBlocks>
	);
};

export default Explore;
