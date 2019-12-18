import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Media from 'react-bootstrap/Media';

import Avatar from './Figure';

import GreenUp from '../assets/green-up.png';
import RedDown from '../assets/red-down.png';

import { selectNominees } from '../selectors';
import { capitalize } from '../utils';

type Props = {};

const SEvictees = styled.div`
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
const Nominees: React.FC<Props> = props => {
	const evictees: any[] = [];

	return (
		<SEvictees>
			{evictees.length === 0 && (
				<div style={{ color: 'var(--orange)' }}>
					There currently no evictees.
				</div>
			)}
			{evictees.map(n => (
				<Media key={n.address}>
					<Avatar
						address={n.address}
						size={40}
						className="mr-3 "
						key={n.address}
					/>
					<Media.Body>
						<b>{capitalize(n.moniker)}</b>
						<p className="small mono">{n.address}</p>
					</Media.Body>
					<div className="d-none d-md-block align-self-center mr-5">
						<b>{n.upVotes}</b>
						<div className="small">
							<Image width={10} src={GreenUp} />
						</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-5">
						<b>{n.downVotes}</b>
						<div className="small">
							<Image width={10} src={RedDown} />
						</div>
					</div>
				</Media>
			))}
		</SEvictees>
	);
};

export default Nominees;
