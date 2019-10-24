import React from 'react';

import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import BlocksTable from '../components/Blocks';
import Loader from '../components/Loader';

import { SContent } from '../components/styles';

import { selectBlocksLoading } from '../selectors';

const Blocks: React.FC<RouteComponentProps<{}>> = props => {
	const loading = useSelector(selectBlocksLoading);
	return (
		<Container fluid={false}>
			<Row noGutters={true}>
				<Col>
					<SContent>
						<span>Blocks</span>
						<BlocksTable
							onClickHandler={v => () => {
								console.log(v);
								props.history.push(`/block/${v.id}`);
							}}
						/>
						{loading && (
							<p className="text-center">
								<Loader loading={loading} size={40} />
							</p>
						)}
					</SContent>
				</Col>
			</Row>
		</Container>
	);
};

export default Blocks;
