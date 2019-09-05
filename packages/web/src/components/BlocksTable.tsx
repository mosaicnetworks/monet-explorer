import React from 'react';

import { IBabbleBlock } from 'evm-lite-consensus';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

interface IProps {
	// blocks to render
	blocks: IBabbleBlock[];

	// animating
	style?: any;
}

const Blocks: React.FC<IProps> = props => {
	const renderBlocks = () => {
		return props.blocks.map(block => {
			return (
				<Table.Row key={block.Body.Index}>
					<Table.Cell textAlign={'center'} selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							<b>{block.Body.Index}</b>
						</Link>
					</Table.Cell>
					<Table.Cell textAlign={'center'} selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							{block.Body.Transactions.length}
						</Link>
					</Table.Cell>
					<Table.Cell textAlign={'center'} selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							{Object.keys(block.Signatures).length}
						</Link>
					</Table.Cell>
					<Table.Cell selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							{block.Body.StateHash}
						</Link>
					</Table.Cell>
					<Table.Cell selectable={true}>
						<Link to={`/blocks/${block.Body.Index}`}>
							{block.Body.PeersHash}
						</Link>
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<>
			<Table
				style={props.style}
				celled={true}
				fixed={true}
				striped={true}
			>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell textAlign={'center'} width={1}>
							Index
						</Table.HeaderCell>
						<Table.HeaderCell textAlign={'center'} width={1}>
							No. of Txs
						</Table.HeaderCell>
						<Table.HeaderCell textAlign={'center'} width={1}>
							No. of Sigs
						</Table.HeaderCell>
						<Table.HeaderCell>State Hash</Table.HeaderCell>
						<Table.HeaderCell>Peers Hash</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{renderBlocks()}</Table.Body>
			</Table>
		</>
	);
};

export default Blocks;
