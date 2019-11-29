import React from 'react';

import Avatar from '../components/Avatar';
import Table from '../components/Table';

import { WhitelistEntry } from '../client';

type Props = {
	whitelist: WhitelistEntry[];
};

const Whitelist: React.FC<Props> = props => {
	return (
		<>
			<Table>
				<thead>
					<tr>
						<th></th>
						<th>Moniker</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{props.whitelist.map(wle => (
						<tr key={wle.address}>
							<td>
								<Avatar address={wle.address} size={33} />
							</td>
							<td>
								<b>{wle.moniker}</b>
							</td>
							<td className="mono">{wle.address}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default Whitelist;
