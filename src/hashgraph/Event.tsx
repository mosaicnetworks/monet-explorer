import React, { useState } from 'react';

import styled from 'styled-components';

import { Circle, Group, Line, Text } from 'react-konva';

import { CONSTANTS, EventNode } from '.';

type Props = {
	node: EventNode;
	onClick: () => void;
	selected: boolean;
};

const SCircle = styled(Circle)`
	cursor: pointer !important;
`;

const Event: React.FC<Props> = ({ node, onClick, selected }) => {
	return (
		<Group>
			<Text
				onClick={onClick}
				x={node.x + CONSTANTS.EVENT_RADIUS}
				y={node.y + 5}
				text={`${node.event.Body.Index} (${node.round})`}
				fill={'black'}
			/>
			<SCircle
				onClick={onClick}
				x={node.x}
				y={node.y}
				strokeEnabled={!!node.event.Body.Transactions.length}
				stroke={'rgb(253, 118, 65)'}
				strokeWidth={3}
				fill={selected ? 'rgb(253, 118, 65)' : 'rgb(12, 51, 143)'}
				radius={CONSTANTS.EVENT_RADIUS}
			/>
			{node.parents.map(parent => (
				<Line
					onClick={onClick}
					key={`edge${parent.hash}`}
					points={[parent.x, parent.y, node.x, node.y]}
					stroke={selected ? 'rgb(253, 118, 65)' : 'rgb(12, 51, 143)'}
					strokeEnabled={true}
					strokeWidth={2}
				/>
			))}
		</Group>
	);
};

export default Event;
