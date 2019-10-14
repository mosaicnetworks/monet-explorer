import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import BlocksTable from '../components/Blocks';

import Promo from '../assets/promo.svg';

const SBadge = styled(Badge)`
	font-size: 12px !important;
	margin-left: 10px;
`;

const SContent = styled.div`
	background: #fff !important;
	border-radius: 5px !important;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
	margin-bottom: 15px !important;

	span {
		background: #eee;
		display: block;
		border-radius: inherit !important;
		background: #fff;
		padding: 10px 10px;
		/* color: #4a4f55; */
		font-size: 0.8125rem;
		font-weight: 600;
		margin-bottom: 0;
		border-bottom: 1px solid #eee;
	}
`;

const Blocks: React.FC<{}> = () => {
	return (
		<Container fluid={false}>
			<Row noGutters={true}>
				<Col>
					<SContent>
						<span>Blocks</span>
						<BlocksTable />
					</SContent>
				</Col>
			</Row>
		</Container>
	);
};

export default Blocks;
