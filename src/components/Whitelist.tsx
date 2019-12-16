import React from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Media from 'react-bootstrap/Media';

import Avatar from './Avatar';

import { selectWhitelist } from '../selectors';

type Props = {};

const SWhitelist = styled.div`
	.media {
		background: var(--light-grey);
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

const Whitelist: React.FC<Props> = props => {
	const whitelist = useSelector(selectWhitelist);

	return (
		<SWhitelist>
			{whitelist.map(wle => (
				<Media key={wle.address}>
					<Avatar
						address={wle.address}
						size={40}
						className="mr-3 "
						key={wle.address}
					/>

					<Media.Body>
						<b> {wle.moniker}</b>
						<p className="small mono">{wle.address}</p>
					</Media.Body>
				</Media>
			))}
		</SWhitelist>
	);
};

export default Whitelist;
