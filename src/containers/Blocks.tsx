import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { RouteComponentProps } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import BlocksTable from '../components/Blocks';

import { SContent } from '../components/styles';

import Promo from '../assets/promo.svg';

const SBadge = styled(Badge)`
	font-size: 12px !important;
	margin-left: 10px;
`;

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
