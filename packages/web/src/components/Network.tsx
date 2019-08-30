import React, { useEffect, useState } from 'react';

import { Table } from 'semantic-ui-react';

import Client from 'evm-lite-client';

interface IInfo {
	consensus_events: string;
	consensus_transactions: string;
	events_per_second: string;
	id: string;
	last_block_index: string;
	last_consensus_round: string;
	moniker: string;
	num_peers: string;
	rounds_per_second: string;
	round_events: string;
	state: string;
	sync_rate: string;
	transaction_pool: string;
	type: string;
	undetermined_events: string;
}

const Network: React.FC<{}> = () => {
	const sockets: string[] = [
		'95.179.229.222:8080',
		'95.179.229.222:8080',
		'95.179.229.222:8080',
		'95.179.229.222:8080'
	];

	const [infos, setInfos] = useState<IInfo[]>([]);

	const renderRow = (info: any) => {
		return (
			<Table.Row>
				<Table.Cell>{info.id}</Table.Cell>
				<Table.Cell>{info.moniker}</Table.Cell>
				<Table.Cell>{info.last_block_index}</Table.Cell>
				<Table.Cell>{info.num_peers}</Table.Cell>
				<Table.Cell>{info.transaction_pool}</Table.Cell>
				<Table.Cell>{info.state}</Table.Cell>
			</Table.Row>
		);
	};

	const fetchInfos = async () => {
		const nodeInfos: IInfo[] = [];

		for (const socket of sockets) {
			const l = socket.split(':');
			const c = new Client(l[0], parseInt(l[1], 10));

			try {
				nodeInfos.push(await c.getInfo());
			} catch (e) {
				console.log(e);
			}
		}

		setInfos(nodeInfos);
	};

	useEffect(() => {
		fetchInfos();
	}, []);

	return (
		<>
			<Table celled={true} fixed={true} singleLine={true}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Moniker</Table.HeaderCell>
						<Table.HeaderCell>Last Block</Table.HeaderCell>
						<Table.HeaderCell>Peers</Table.HeaderCell>
						<Table.HeaderCell>Tx Pool</Table.HeaderCell>
						<Table.HeaderCell>State</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{infos.map(renderRow)}</Table.Body>
			</Table>
		</>
	);
};

export default Network;
