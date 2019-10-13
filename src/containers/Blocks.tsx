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

const SBox = styled.div`
	background: #fff;
`;

const Blocks: React.FC<{}> = () => {
	const [lastBlockIndex, setLastBlockIndex] = useState(0);

	return (
		<Container fluid={false}>
			<Row noGutters={true}>
				<Col>
					<SBox>
						<BlocksTable
							lastBlockIndexIncreaseHook={setLastBlockIndex}
						/>
					</SBox>
				</Col>
			</Row>
		</Container>
	);
};

export default Blocks;
