import React, { useCallback, useEffect, useState } from 'react';

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
	background: var(--blue);
	padding: 20px 0;
	color: white;
	/* border-radius: var(--border-radius); */
	border-top: 1px solid var(--blue-divider);

	& input {
		font-size: 14px;
		border: none !important;
		color: #fff !important;
		background: rgba(60, 120, 208, 0.3) !important;
	}

	& input::placeholder {
		color: #888;
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

	const onRecentBlockClick = (index: number) => () => {
		setBlockIndex(index);
	};

	return (
		<>
			<UnderHeader active={'blocks'} />
			<SBlue className="">
				<Container fluid={true}>
					<Row className="align-items-center">
						<Col md={2}>
							<Form.Control
								onChange={(e: any) => {
									setBlockIndex(Number(e.target.value));
								}}
								type="number"
								placeholder="Block Index"
								value={blockIndex.toString()}
							/>
						</Col>
						<Col className="">
							<Button
								onClick={handleBack}
								variant="outline-light"
								className="mr-2"
							>
								Back
							</Button>
							<Button
								variant="outline-light"
								onClick={handleForward}
							>
								Next
							</Button>
						</Col>
					</Row>
				</Container>
			</SBlue>
			<Section padding={50}>
				<Container fluid={true}>
					<Row>
						<Col md={7} className="pr-md-5">
							<Content>
								<Block blockIndex={blockIndex} />
							</Content>
						</Col>
						<Col md={5}>
							<Content>
								<h3 className="preheader">Latest Blocks</h3>
								<Blocks onClickHandler={onRecentBlockClick} />
							</Content>
						</Col>
					</Row>
				</Container>
			</Section>
		</>
	);
};

export default Index;
