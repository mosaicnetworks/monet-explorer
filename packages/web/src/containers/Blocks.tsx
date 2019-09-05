import React from 'react';

import { Container, Grid } from 'semantic-ui-react';

import BlocksWidget from '../widgets/Blocks';

const Blocks: React.FC<{}> = () => {
	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<BlocksWidget />
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Blocks;
