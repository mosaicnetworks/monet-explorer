import React from 'react';

import { Container, Grid } from 'semantic-ui-react';

import Box from '../components/Box';

const Validators: React.FC<{}> = () => {
	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<Box padding={false} heading={'Validators'}>
						Validators
					</Box>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Validators;
