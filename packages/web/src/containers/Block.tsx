import React, { useEffect, useState } from 'react';

import { Babble, IBabbleBlock } from 'evm-lite-consensus';
import { JsonToTable } from 'react-json-to-table';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import Node from 'evm-lite-core';

import Box from '../components/Box';

import { HOST, PORT } from '../const';

interface IProps {
	block?: string;
}

const makeMonet = () => {
	const b = new Babble(HOST, PORT);
	const n = new Node(HOST, PORT, b);

	return n;
};

const Index: React.FC<RouteComponentProps<IProps>> = props => {
	const index = Number(props.match.params.block);

	const [block, setBlock] = useState<IBabbleBlock>({} as IBabbleBlock);

	const fetchBlock = async () => {
		const n = makeMonet();

		try {
			const b = await n.consensus.getBlocks(index);

			if (!Array.isArray(b)) {
				setBlock(b);
			}
		} catch (e) {
			console.log('ERROR: ', e);
			// pass
		}
	};

	useEffect(() => {
		fetchBlock();
	}, []);

	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<Box padding={true} heading={`Block - ${index}`}>
						<JsonToTable json={block} />
					</Box>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Index;
