import React, { useEffect, useState } from 'react';

import { Babble, IBabbleBlock } from 'evm-lite-consensus';
import { JsonToTable } from 'react-json-to-table';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import { Container, Grid, Table } from 'semantic-ui-react';

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

const Block: React.FC<RouteComponentProps<IProps>> = props => {
	const index = Number(props.match.params.block);

	const [block, setBlock] = useState<IBabbleBlock>({} as IBabbleBlock);

	const fetchBlock = async () => {
		const n = makeMonet();

		try {
			const b = await n.consensus.getBlocks(index);
			if (b.length === 1) {
				setBlock(b[0]);
			}
		} catch (e) {
			console.log('ERROR: ', e);
		}
	};

	useEffect(() => {
		fetchBlock();
	}, []);

	const renderBody = () => {
		if (Object.keys(block).length) {
			return Object.keys(block.Body).map(k => {
				// @ts-ignore
				const val = block.Body[k];

				return (
					<Table.Row key={block.Body.Index}>
						<Table.Cell>{k}</Table.Cell>
						<Table.Cell>{val}</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	const renderSignatures = () => {
		if (Object.keys(block).length) {
			return Object.keys(block.Signatures).map(k => {
				// @ts-ignore
				const val = block.Body[k];

				return (
					<Table.Row key={block.Body.Index}>
						<Table.Cell>{k}</Table.Cell>
						<Table.Cell>{val}</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	return (
		<Container fluid={true}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<Breadcrumb size={'huge'}>
						<Breadcrumb.Section link={true}>
							<Link to={'/blocks'}>Blocks</Link>
						</Breadcrumb.Section>
						<Breadcrumb.Divider />
						<Breadcrumb.Section>{index}</Breadcrumb.Section>
					</Breadcrumb>
					<br />
					<br />
					{/* <h2>Block {index}</h2> */}
					<Box padding={true} heading={`Details`}>
						<JsonToTable json={block} />
					</Box>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Block;
