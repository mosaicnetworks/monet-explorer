import React from 'react';

import styled from 'styled-components';

import { Container, Grid, Table } from 'semantic-ui-react';

import Box from '../components/Box';
import Network from '../components/Network';

const SIndex = styled.div``;

const Index: React.FC<{}> = () => {
	return (
		<SIndex>
			<Container>
				<Grid stackable={true} columns={'equal'}>
					<Grid.Column>
						<h1>Network Info</h1>
						<Network />
					</Grid.Column>
					<Grid.Column width={4}>
						<Box heading={'Other Content'}>
							Suspendisse massa urna, sagittis vel commodo a,
							vestibulum vel mauris. Quisque et venenatis ex.
							Aenean ut neque pellentesque, commodo diam sit amet,
							pharetra velit. Nunc vitae maximus elit. In
							consequat eros diam, non laoreet libero lobortis ac.
							Sed efficitur, tellus eget lacinia faucibus, orci
							urna elementum nisi, nec tempus mauris est quis mi.
							Nam facilisis mollis ultrices. Ut blandit enim in
							condimentum tempor. Phasellus vitae hendrerit
							mauris, quis tristique odio. Morbi feugiat diam non
							sem rutrum porttitor. Praesent porttitor, elit quis
							malesuada tristique, nulla odio sollicitudin massa,
							eu consectetur erat turpis non nisi. Fusce facilisis
							eros nibh, posuere pellentesque enim viverra eget.
							Nam eu sem et arcu faucibus interdum. Pellentesque
							habitant morbi tristique senectus et netus et
							malesuada fames ac turpis egestas. Fusce vel sem
							neque.
						</Box>
					</Grid.Column>
				</Grid>
			</Container>
		</SIndex>
	);
};

export default Index;
