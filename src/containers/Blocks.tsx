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
	font-size: 15px !important;
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
						<Col md={8}>
							<h1>
								Block Explorer
								<SBadge variant="success">Live*</SBadge>
							</h1>
							<p>
								Camille testnet was released late September
								2019.
							</p>
						</Col>
						<Col>
							<h2>Blocks</h2>
							<h4>{lastBlockIndex}</h4>
						</Col>
						<Col>
							<h2>Blocks/s</h2>
							<h4>0</h4>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
			<Container fluid={true}>
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
		</>
	);
};

export default Blocks;
