import React from 'react';

import utils from 'evm-lite-utils';

import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';

import Avatar from '../components/Avatar';

import { Validator } from '../client';
import { pubKeyToAddress } from '../utils';

import GreenDot from '../assets/green-dot.png';
import RedDot from '../assets/red-dot.png';

type Props = {
	validator: Validator;
};

const ValidatorAvatar: React.FC<Props> = props => {
	const address = pubKeyToAddress(props.validator.public_key || '');

	return (
		<Media>
			<Avatar address={address} />

			<Media.Body>
				<h5>
					{props.validator.moniker} {' - '}
					<code>{props.validator.host}</code>
					{'  '}
					{props.validator.reachable ? (
						<Image src={GreenDot} width="10" />
					) : (
						<Image src={RedDot} width="10" />
					)}
				</h5>
				<div className="mono">{utils.cleanAddress(address)}</div>
			</Media.Body>
		</Media>
	);
};

export default ValidatorAvatar;
