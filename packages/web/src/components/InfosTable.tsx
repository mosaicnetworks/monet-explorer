import React from 'react';

import { Table } from 'semantic-ui-react';

import { IMonetInfo } from '../monet';

interface IProps {
	infos: IMonetInfo[];
}

const InfosTable: React.FC<IProps> = props => {
	const renderInfos = () => {
		return props.infos.map(i => {
			return (
				<Table.Row key={i.moniker}>
					<Table.Cell>{i.moniker}</Table.Cell>
					<Table.Cell>{i.last_block_index}</Table.Cell>
					<Table.Cell>{i.consensus_transactions}</Table.Cell>
					<Table.Cell>{i.state}</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<>
			<Table celled={true} fixed={true} striped={true}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Moniker</Table.HeaderCell>
						<Table.HeaderCell>Last Block</Table.HeaderCell>
						<Table.HeaderCell>Consensus Txs</Table.HeaderCell>
						<Table.HeaderCell>State</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{renderInfos()}</Table.Body>
			</Table>
		</>
	);
};

export default InfosTable;
