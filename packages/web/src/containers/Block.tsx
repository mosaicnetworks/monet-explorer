import React, { useEffect, useState } from 'react';

import { IBabbleBlock } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import { Container, Grid } from 'semantic-ui-react';

import { IConfigState, IStore } from '@monetexplorer/redux';

import BlockDetailTable from '../components/BlockDetailTable';
import Box from '../components/Box';

interface IProps {
	block?: string;
}

const Block: React.FC<RouteComponentProps<IProps>> = props => {
	const index = Number(props.match.params.block);

	const [block, setBlock] = useState<IBabbleBlock>({} as IBabbleBlock);

	const config = useSelector<IStore, IConfigState>(store => store.config);

	const fetchBlock = async () => {
		const n = new Monet(config.host, config.port);

		try {
			const b = await n.consensus!.getBlocks(index);

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
					<Box padding={true} heading={`Details`}>
						<BlockDetailTable block={block} />
					</Box>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Block;
