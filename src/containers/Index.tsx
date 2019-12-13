import React from 'react';

import styled from 'styled-components';

import Button from 'react-bootstrap/Button';

import Await from '../components/utils/Await';
import Loader from '../components/utils/Loader';
import Nominees from '../components/Nominees';
import Blocks from '../components/Blocks';
import Statistics from '../components/Statistics';
import Transactions from '../components/Transactions';
import Validators from '../components/Validators';
import Whitelist from '../components/Whitelist';

import Section, { Grid, Q } from '../ui';

import Image from 'react-bootstrap/Image';
import TENOM from '../assets/tenom.svg';

const SJumbotron = styled.div``;

const SValidators = styled.div`
	background: #fff;
`;

const SPOA = styled.div`
	background: #fff;
`;

const SUnderHeader = styled.div`
	background: #fff;
`;

const Index: React.FC<{}> = () => {
	return (
		<>
			<SJumbotron>
				<Section padding={30}>
					<Grid verticalAlign={false} fluid={true}>
						<Q pos={[1, 1]} md={7}>
							<h3 className="preheader">Validators</h3>
							<Validators />
						</Q>
						<Q pos={[1, 2]} md={5}>
							<h3 className="preheader">Whitelist</h3>
							<Whitelist />
						</Q>
					</Grid>
				</Section>
			</SJumbotron>
			<Section>
				<Grid verticalAlign={false} fluid={true}>
					<Q pos={[1, 1]} md={6}>
						<h4>Blocks</h4>
						<Blocks />
					</Q>
					<Q pos={[1, 2]} md={6}>
						<h4>Transactions</h4>
						<br /> <Transactions />
					</Q>
				</Grid>
			</Section>{' '}
		</>
	);
};

export default Index;
