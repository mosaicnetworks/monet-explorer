import React from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Blocks from '../widgets/Blocks';

const Index: React.FC<{}> = () => {
	return (
		<>
			<Jumbotron>
				<h1>64,123 Blocks</h1>
				<p>
					This figure is from the mainnet launch in 12 Septemeber
					2019.
				</p>
			</Jumbotron>
			<Container fluid={true}>
				<Blocks />
			</Container>
		</>
	);
};

export default Index;
