import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { selectBlock } from '../selectors';

type ReactRouterProps = {
	id: string;
};

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

	div {
		padding: 20px;
		padding-bottom: 10px;
	}
`;

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const block = useSelector(selectBlock(Number(props.match.params.id)));

	return (
		<Container fluid={false}>
			<Row noGutters={true}>
				<Col>
					<SContent>
						<span>Block {(block && block.index) || 0}</span>
						<div>
							<code>
								<pre>{JSON.stringify(block, null, 4)}</pre>
							</code>
						</div>
					</SContent>
				</Col>
			</Row>
		</Container>
	);
};

export default Validator;
