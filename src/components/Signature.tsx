import React from 'react';

import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';

import Avatar from '../components/Avatar';

import { Validator } from '../client';
import { pubKeyToAddress } from '../utils';

import GreenDot from '../assets/green-dot.png';
import RedDot from '../assets/red-dot.png';

type Props = {
	validator: Validator;
	signature: string;
};

const Signature: React.FC<Props> = props => {
	const address = pubKeyToAddress(props.validator.public_key || '');

	return (
		<Media>
			<Link
				data-tip={`View Validator`}
				to={`/validator/${props.validator.public_key}`}
			>
				<Avatar address={address} size={30} />
			</Link>
			<Media.Body>
				<h6>
					{props.validator.moniker} {'  '}
					<div
						className="mono"
						style={{ marginLeft: '10px', display: 'inline-block' }}
					>
						{props.validator.host}
					</div>
				</h6>
				<div className="mono" style={{ wordWrap: 'break-word' }}>
					<code>{props.signature}</code>
				</div>

				<br />
			</Media.Body>
		</Media>
	);
};

export default Signature;
