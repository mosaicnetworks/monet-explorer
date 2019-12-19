import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Media from 'react-bootstrap/Media';

import Avatar from './Figure';

import { Validator } from '../client';
import { pubKeyToAddress } from '../utils';

type Props = {
	validator: Validator;
	signature: string;
};

const SSignature = styled.div`
	.media {
		margin-bottom: 20px;
		border-radius: 3px !important;

		p {
			margin-bottom: 0 !important;
		}
	}

	.media-body {
		min-width: 150px;
	}
`;

const Signature: React.FC<Props> = props => {
	const address = pubKeyToAddress(props.validator.public_key || '');

	return (
		<SSignature>
			<Media>
				<Link
					data-tip={`View Validator`}
					to={`/validator/${props.validator.public_key}`}
					className={'align-self-center mr-3'}
				>
					<Avatar address={address} size={40} />
				</Link>
				<Media.Body>
					<h6>
						{props.validator.moniker} {'  '}
						<div
							className="mono"
							style={{
								marginLeft: '10px',
								display: 'inline-block'
							}}
						>
							{props.validator.host}
						</div>
					</h6>
					<div
						style={{ wordWrap: 'break-word' }}
						className="small pr-5"
					>
						<code>{props.signature}</code>
					</div>
				</Media.Body>
			</Media>
		</SSignature>
	);
};

export default Signature;
