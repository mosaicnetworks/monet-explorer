import React, { Suspense, useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Block from '../../components/Block';
import Blocks from '../../components/Blocks';

import UnderHeader from './UnderHeader';

import Section from '../../ui';
import Content from '../../ui/content/Content';

import { useSelector } from 'react-redux';
import { selectBlocks } from '../../selectors';

const SBlue = styled.div`
	background: var(--light-blue);
	padding: 20px;
	border-radius: 3px;
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
			<UnderHeader active={'blocks'} />
			<Section padding={50}>
				<Container fluid={true}>
					<Row>
						<Col md={7} className="pr-5">
							<Content>
								<SBlue className="mb-5">
									<h3 className="preheader">
										Block Explorer
									</h3>

									<Row className="align-items-center">
										<Col md={7}>
											<Form.Control
												onChange={(e: any) => {
													setBlockIndex(
														Number(e.target.value)
													);
												}}
												type="number"
												placeholder="Block Index"
												value={blockIndex.toString()}
											/>
										</Col>
										<Col className="text-center">
											<Button
												onClick={handleBack}
												variant="outline-dark"
												className="mr-2"
											>
												Back
											</Button>
											<Button
												variant="outline-dark"
												onClick={handleForward}
											>
												Next
											</Button>
										</Col>
									</Row>
								</SBlue>
								<div className="mt-4">
									<Suspense fallback={<>Loading block...</>}>
										<Block blockIndex={blockIndex} />
									</Suspense>
								</div>
							</Content>
						</Col>
						<Col md={5}>
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
