import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import { Block as TBlock } from '../client';

const SBlock = styled.div`
	border-bottom: 1px solid #eee;
	padding-bottom: 20px;
	margin-bottom: 20px;

	a:hover {
		text-decoration: none !important;
	}
`;

const SBlockAvatar = styled.div`
	font-size: 25px;
	background: #eee;
	padding: 20px;
	border-radius: 5px !important;
	color: black !important;
	text-decoration: none !important;

	&a:hover {
		text-decoration: none !important;
	}
`;

type Props = {
	block: TBlock;
};

const Block: React.FC<Props> = props => {
	return (
		<SBlock>
			<Media>
				<Link to={`/block/${props.block.index}`}>
					<SBlockAvatar className="mr-2">
						{props.block.index}
					</SBlockAvatar>
				</Link>
				<Media.Body>
					<h5>
						<Link to={`/block/${props.block.index}`}>
							{props.block.state_hash}
						</Link>
					</h5>
					<div className="">
						<Row>
							<Col xs={12} md={12}>
								<Badge variant="info" as="div">
									Tx: {props.block.transactions.length}
								</Badge>{' '}
								<Badge variant="info" as="div">
									Sig: {props.block.signatures.length}
								</Badge>
							</Col>
						</Row>
					</div>
				</Media.Body>
			</Media>
		</SBlock>
	);
};

export default Block;
