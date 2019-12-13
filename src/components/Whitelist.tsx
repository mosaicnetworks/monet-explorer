import React from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Figure from 'react-bootstrap/Figure';

import Avatar from '../components/Avatar';

import { selectWhitelist } from '../selectors';

type Props = {};

const SWhitelist = styled.div`
	.figure {
		margin-right: 20px;
	}
`;

const Whitelist: React.FC<Props> = props => {
	const whitelist = useSelector(selectWhitelist);

	return (
		<SWhitelist>
			{whitelist.map(wle => (
				<Figure key={wle.moniker}>
					<Figure.Image
						height={44}
						width={44}
						src={`https://s.gravatar.com/avatar/${utils.trimHex(
							wle.address
						)}?size=100&default=retro`}
					/>
				</Figure>
			))}
		</SWhitelist>
	);
};

export default Whitelist;
