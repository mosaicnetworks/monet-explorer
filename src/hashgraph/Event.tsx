import React from 'react';

import { Circle, Group, Line, Text } from 'react-konva';

import { CONSTANTS, EventNode } from '.';

type Props = {
	node: EventNode;
};

const Event: React.FC<Props> = ({ node }) => {
	return (
		<Group>
			<Text
				x={node.x + CONSTANTS.EVENT_RADIUS}
				y={node.y + 5}
				text={`${node.event.Body.Index} (${node.round})`}
				fill={'black'}
			/>
			<Circle
				x={node.x}
				y={node.y}
				fill={'rgb(12, 51, 143)'}
				radius={CONSTANTS.EVENT_RADIUS}
			/>
			{node.parents
				.filter(p => p.peer.publicKey !== node.peer.publicKey)
				.map(parent => (
					<Line
						key={`edge${parent.hash}`}
						points={[parent.x, parent.y + 3, node.x, node.y - 3]}
						stroke={'rgb(12, 51, 143)'}
						strokeEnabled={true}
						strokeWidth={2}
					/>
				))}
		</Group>
	);
};

export default Event;
