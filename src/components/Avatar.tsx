import React, { useEffect } from 'react';

import ReactTooltip from 'react-tooltip';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import Image from 'react-bootstrap/Image';

const SAvatar = styled(Image)`
	border-radius: 3px !important;
	margin-right: 10px;
`;

type Props = {
	address: string;
	size?: number;
	className?: string;
};

const Avatar: React.FC<Props> = props => {
	useEffect(() => {
		ReactTooltip.rebuild();
	}, []);

	return (
		<SAvatar
			className={props.className + ' align-self-center'}
			data-tip={utils.cleanAddress(props.address)}
			src={`https://s.gravatar.com/avatar/${utils.trimHex(
				props.address
			)}?size=100&default=retro`}
			width={props.size || 50}
		/>
	);
};

export default Avatar;
