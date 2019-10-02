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

const STopButton = styled.div`
	position: fixed;
	border-radius: 100% !important;
	bottom: 50px;
	right: 70px;
	z-index: 10000000;
	background: #fafafa !important;
	color: black !important;
	border: 1px solid #ddd !important;
	padding: 10px;
	cursor: pointer;
`;

const SStatistic = styled.div`
	background: #fff;
	margin-bottom: 20px;
	box-shadow: 1px 0px 1px #eee !important;
	padding: 40px 40px;

	h1 {
		color: rgba(31, 66, 146, 1) !important;
	}
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
			{<STopButton onClick={toTop}>T</STopButton>}
			<Jumbotron>
				<Container fluid={true}>
					<Row>
						<Col md={8}>
							<h1>Block Explorer</h1>
							<p>
								This is a simple hero unit, a simple
								jumbotron-style component for calling extra
								attention to featured content or information.
							</p>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
			<Container fluid={true}>
				<Row>
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
