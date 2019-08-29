import React, { useEffect, useState } from 'react';

import { Babble, IBabbleBlock } from 'evm-lite-consensus';
import { Container, Form, Grid, Input } from 'semantic-ui-react';

import Box from '../components/Box';

const Explorer: React.FC<{}> = () => {
	const [index, setIndex] = useState(0);
	const [block, setBlock] = useState<IBabbleBlock>({} as IBabbleBlock);
	const [socket, setSocket] = useState('95.179.229.222:8080');

	const fetchBlock = async () => {
		const l = socket.split(':');
		const babble = new Babble(l[0], parseInt(l[1], 10));

		setBlock(await babble.getBlock(index));
	};

	useEffect(() => {
		try {
			fetchBlock();
		} catch (e) {
			console.log(e);
		}
	}, [index]);

	return (
		<Container>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<h1>Explorer</h1>
					<div>{JSON.stringify(block)}</div>
				</Grid.Column>
				<Grid.Column width={4}>
					<Box heading={'Setting'}>
						<Form>
							<Form.Field>
								<label>Node</label>
								<Input
									placeholder="host:port"
									defaultValue={socket}
									onChange={(_, { value }) =>
										setSocket(value)
									}
								/>
							</Form.Field>
							<Form.Field>
								<label>Block Index</label>
								<Input
									type="number"
									placeholder="Block Index"
									defaultValue={index}
									onChange={(_, { value }) =>
										setIndex(parseInt(value, 10))
									}
								/>
							</Form.Field>
						</Form>
					</Box>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Explorer;
