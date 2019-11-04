import React from 'react';

import { Circle, Group, Line, Text } from 'react-konva';

import { CONSTANTS, EventNode } from '.';

type Props = {
	node: EventNode;
};

const Event: React.FC<Props> = ({ node }) => {
	const event = node.data;

	return (
		<Group>
			<Text
				x={node.x + CONSTANTS.EVENT_RADIUS}
				y={node.y + 5}
				text={`${event.Body.Index}`}
				fill={'black'}
			/>
			<Circle
				x={node.x}
				y={node.y}
				fill={'rgb(12, 51, 143)'}
				radius={CONSTANTS.EVENT_RADIUS}
			/>
			{node.parents.map(parent => (
				<Line
					key={`edge${parent.hash}`}
					points={[parent.x, parent.y, node.x, node.y]}
					stroke={'rgb(12, 51, 143)'}
					strokeEnabled={true}
					strokeWidth={3}
				/>
			))}
		</Group>
	);
};

export default Event;
