import React from 'react';

import styled from 'styled-components';

import { RouteComponentProps } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import BlocksTable from '../components/Blocks';

import { SContent } from '../components/styles';

const Blocks: React.FC<RouteComponentProps<{}>> = props => {
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
					</SContent>
				</Col>
			</Row>
		</Container>
	);
};

export default Blocks;
