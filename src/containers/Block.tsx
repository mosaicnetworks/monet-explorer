import React from 'react';

import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { SContent } from '../components/styles';

import { selectBlock } from '../selectors';

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const block = useSelector(selectBlock(Number(props.match.params.id)));

	return (
		<Container fluid={false}>
			<Row noGutters={true}>
				<Col>
					<SContent>
						<span>Block {(block && block.index) || 0}</span>
						<div className="padding">
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
