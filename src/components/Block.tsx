import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import { Block as TBlock } from '../client';

const SBlock = styled.div`
	/* border-bottom: 1px solid #eee; */
	padding-bottom: 20px;
	display: inline-block;

	a:hover {
		text-decoration: none !important;
	}

	.active {
		background: var(--blue) !important;
		color: white !important;
		text-decoration: none !important;
	}
`;

const SBlockAvatar = styled.div`
	transition: background 0.2s ease-out;
	font-size: 20px;
	background: #eee;
	padding: 15px;
	border-radius: 5px !important;
	color: black !important;
	text-decoration: none !important;
	cursor: pointer;

	&:hover {
		background: var(--blue) !important;
		color: white !important;
		text-decoration: none !important;
	}
`;

type Props = {
	block: TBlock;
	active: boolean;
	onClick: () => void;
};

const Block: React.FC<Props> = props => {
	let classNames = 'mr-2 align-items-center';

	if (props.active) {
		classNames += ' active';
	}

	return (
		<SBlock>
			<SBlockAvatar onClick={props.onClick} className={classNames}>
				#{props.block.index}
			</SBlockAvatar>
		</SBlock>
	);
};

export default Block;
