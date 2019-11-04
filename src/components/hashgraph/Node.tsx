import React from 'react';

import utils from 'evm-lite-utils';

import { Rect } from 'react-konva';

import { pubKeyToAddress } from '../../utils';

import { CONSTANTS } from '.';

type Props = {
	publicKey: string;
	x: number;
	y: number;
};

const Node: React.FC<Props> = props => {
	const address = pubKeyToAddress(props.publicKey);
	const img = new window.Image(40, 40);

	img.src = `https://s.gravatar.com/avatar/${utils.trimHex(
		address
	)}?size=100&default=retro`;

	const sideLength = 40;

	return (
		<Rect
			fillPatternImage={img}
			fillPatternScaleX={CONSTANTS.NODE_WIDTH / 100}
			fillPatternScaleY={CONSTANTS.NODE_HEIGHT / 100}
			x={props.x}
			y={props.y}
			height={CONSTANTS.NODE_HEIGHT}
			width={CONSTANTS.NODE_WIDTH}
		/>
	);
};

export default Node;
