import React, { useCallback, useState, useEffect, Suspense } from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Block from '../components/Block';
import Transactions from '../components/Transactions';
import Blocks from '../components/Blocks';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Section, { Grid, Q } from '../ui';
import Body from '../ui/content/Body';
import Content from '../ui/content/Content';

import { useSelector } from 'react-redux';
import { selectBlocks } from '../selectors';
import Stats from '../components/Statistics';

const SUnderHeader = styled.div`
	background: var(--blue);
	border-top: 1px solid #1a2d7a6c;
	padding: 15px 0;
	color: white;
`;

const SBlue = styled.div`
	background: var(--light-blue);
	padding: 20px;
	border-radius: 3px;
`;

const SLinks = styled.div`
	li {
		display: inline-block;
		font-weight: 500;
	}

	li a {
		padding: 30px;
		padding-left: 0;
	}

	li a:hover,
	.active {
		color: var(--orange) !important;
		cursor: pointer;
		text-decoration: none;
	}
`;

const Index: React.FC<{}> = () => {
	const blocks = useSelector(selectBlocks);
	const [blockIndex, setBlockIndex] = useState(0);

	useEffect(() => {
		if (blocks.length) {
			setBlockIndex(blocks[0].index);
		} else {
			setBlockIndex(1);
		}
	}, [blocks]);

	const handleBack = useCallback(() => {
		if (blockIndex <= 0) {
			return;
		}

		setBlockIndex(blockIndex - 1);
	}, [blockIndex]);

	const handleForward = useCallback(() => {
		if (blocks.length && blockIndex >= blocks[0].index) {
			return;
		} else {
			setBlockIndex(blockIndex + 1);
		}
	}, [blockIndex, blocks]);

	return (
		<>
			<SUnderHeader>
				<Grid fluid={true}>
					<Q pos={[1, 1]}>
						<SLinks>
							<li>
								<a className="active" href="">
									Overview
								</a>
							</li>
							<li>
								<a>Blocks</a>
							</li>
							<li>
								<a>Transactions</a>
							</li>
						</SLinks>
					</Q>
				</Grid>
			</SUnderHeader>
			{/* <Stats /> */}
			<Section padding={50}>
				<Container fluid={true}>
					<Row>
						<Col md={6} className="pr-md-5">
							<Content>
								<h3 className="preheader">
									Latest Transactions
								</h3>
								<Transactions />
							</Content>
						</Col>
						<Col md={6}>
							<Content>
								<h3 className="preheader">Latest Blocks</h3>
								<Blocks />
							</Content>
						</Col>
					</Row>
				</Container>
			</Section>
		</>
	);
};

export default Index;
