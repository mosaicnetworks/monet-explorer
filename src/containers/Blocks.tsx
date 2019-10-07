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
	margin-bottom: 20px;
`;

const Blocks: React.FC<{}> = () => {
	const [lastBlockIndex, setLastBlockIndex] = useState(0);

	return (
		<>
			<Jumbotron>
				<Container fluid={true}>
					<Row>
						<Col md={10}>
							<h1>Block Explorer</h1>
							<p>
								Camille testnet was released late September
								2019.
							</p>
						</Col>
						<Col>
							<h2>Blocks</h2>
							<h3>{lastBlockIndex || '---'}</h3>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
			<Row noGutters={true}>
				<Col>
					<SBox>
						<Container fluid={true}>
							<BlocksTable
								lastBlockIndexIncreaseHook={setLastBlockIndex}
							/>
						</Container>
					</SBox>
				</Col>
			</Row>
		</>
	);
};

export default Blocks;
