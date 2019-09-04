import React from 'react';

import { Container, Grid } from 'semantic-ui-react';

import Box from '../components/Box';

const Index: React.FC<{}> = () => {
	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<h1>Index</h1>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Index;
