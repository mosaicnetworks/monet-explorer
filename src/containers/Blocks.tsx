import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import BlocksTable from '../components/Blocks';

import Promo from '../assets/promo.svg';

const SBox = styled.div`
	background: #fff;
	margin-bottom: 20px;
`;

const Blocks: React.FC<{}> = () => {
	const [showTopButton, setShowTopButton] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 600) {
				if (!showTopButton) {
					setShowTopButton(true);
				}
			}
		});
		return () =>
			window.removeEventListener('scroll', () => {
				// pass
			});
	}, []);

	const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<>
			<Jumbotron>
				<Container fluid={true}>
					<Row>
						<Col md={8}>
							<h1>Block Explorer</h1>
							<p>
								Camille testnet was released late September
								2019.
							</p>
						</Col>
						<Col>
							<h2>Blocks</h2>
							<h4>637</h4>
						</Col>
						<Col>
							<h2>Blocks/s</h2>
							<h4>23</h4>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
			<Container fluid={true}>
				<Row noGutters={true}>
					<Col>
						<SBox>
							<BlocksTable />
						</SBox>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Blocks;
