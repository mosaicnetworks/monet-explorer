import React from 'react';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import Image from 'react-bootstrap/Image';

const SAvatar = styled(Image)`
	/* border-radius: 100px; */
	margin-right: 10px;
`;

type Props = {
	address: string;
	size: number;
};

const Avatar: React.FC<Props> = props => {
	return (
		<SAvatar
			src={`https://s.gravatar.com/avatar/${utils.trimHex(
				props.address
			)}?size=100&default=retro`}
			width={props.size}
		/>
	);
};

export default Avatar;
