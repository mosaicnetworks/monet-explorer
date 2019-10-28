import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Block from '../components/Block';
import Loader from '../components/Loader';

import { SContent } from '../components/styles';

import { fetchNetworkBlocks } from '../modules/dashboard';
import { selectBlocksLoading, selectNetworkBlocks } from '../selectors';

const Blocks: React.FC<{}> = props => {
	const dispatch = useDispatch();

	const loading = useSelector(selectBlocksLoading);
	const blocks = useSelector(selectNetworkBlocks);

	const fetchBlocks = () => dispatch(fetchNetworkBlocks());

	useEffect(() => {
		fetchBlocks();
	}, []);

	return (
		<Container fluid={false}>
			<Row>
				<Col md={12} xs={12}>
					<SContent>
						<span>Latest 10 Blocks</span>
						<div className="padding">
							{blocks.map(b => {
								return <Block key={b.index} block={b} />;
							})}
						</div>
						{loading && (
							<div className="padding text-center">
								<Loader loading={loading} size={50} />
							</div>
						)}
					</SContent>
				</Col>
			</Row>
		</Container>
	);
};

export default Blocks;
