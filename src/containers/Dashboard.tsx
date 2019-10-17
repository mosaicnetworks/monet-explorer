import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Nominees from '../components/Nominees';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import { SContent } from '../components/styles';

import { networkBlocks, networkValidators } from '../selectors';

const SIndex = styled.div`
	h4 {
		margin-top: 30px;
		color: rgba(31, 66, 146, 1) !important;
	}

	.float-right {
	}
`;

const SContentPadded = styled.div`
	padding: 10px;
	background: #fff;
	text-align: center;
	margin-bottom: 15px;
	border-radius: 5px;
	font-size: 14px !important;
	border: 1px solid #e5e5e5e5 !important;
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
							<h1>{blocks.length ? blocks[0].index : '-'}</h1>
							<div>Block Height</div>
						</SContentPadded>
					</Col>
					<Col xs={6} md={3}>
						<SContentPadded>
							<h1>-</h1>
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
							<h1>-</h1>
							<div>Current Nominees</div>
						</SContentPadded>
					</Col>
				</Row>
			</Container>
			<Container fluid={false}>
				<Row>
					<Col xs={12}>
						<SContent>
							<span>
								<Row>
									<Col xs={6}>Current Validators</Col>
									<Col className="align-content-end" xs={6}>
										<div className="float-right"></div>
									</Col>
								</Row>
							</span>
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
