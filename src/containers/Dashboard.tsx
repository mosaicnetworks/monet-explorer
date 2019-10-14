import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nominees from '../components/Nominees';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import { networkBlocks, networkValidators } from '../selectors';

const SIndex = styled.div`
	h4 {
		margin-top: 30px;
		color: rgba(31, 66, 146, 1) !important;
	}
`;

const SContentPadded = styled.div`
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
	padding: 10px;
	background: #fff;
	text-align: center;
	margin-bottom: 15px;
	border-radius: 5px;
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

const Index: React.FC<{}> = () => {
	const validators = useSelector(networkValidators);
	const blocks = useSelector(networkBlocks);

	return (
		<SIndex>
			<Container fluid={false}>
				<Row>
					<Col xs={6} md={3}>
						<SContentPadded>
							<h1>{blocks.length && blocks[0].index}</h1>
							<div>Block Height</div>
						</SContentPadded>
					</Col>
					<Col xs={6} md={3}>
						<SContentPadded>
							<h1>---</h1>
							<div>Total Transactions</div>
						</SContentPadded>
					</Col>
					<Col xs={6} md={3}>
						<SContentPadded>
							<h1>{validators.length}</h1>
							<div>Validators</div>
						</SContentPadded>
					</Col>
					<Col xs={6} md={3}>
						<SContentPadded>
							<h1>---</h1>
							<div>Current Nominees</div>
						</SContentPadded>
					</Col>
				</Row>
			</Container>
			<Container fluid={false}>
				<Row>
					<Col xs={12}>
						<SContent>
							<span>Current Validators</span>
							<Validators />
						</SContent>
					</Col>
				</Row>
			</Container>
			<Container fluid={false}>
				<Row>
					<Col xs={12} md={12} lg={12} xl={6}>
						<SContent>
							<span>Whitelist</span>
							<Whitelist />
						</SContent>
					</Col>
					<Col xs={12} md={12} lg={12} xl={6}>
						<SContent>
							<span>Nominees</span>
							<Nominees />
						</SContent>
					</Col>
				</Row>
			</Container>
		</SIndex>
	);
};

export default Index;
