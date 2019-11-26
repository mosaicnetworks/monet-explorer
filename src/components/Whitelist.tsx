import React from 'react';

import Avatar from '../components/Avatar';

import { WhitelistEntry } from '../client';
import { STable } from '../components/styles';

type Props = {
	whitelist: WhitelistEntry[];
};

const Whitelist: React.FC<Props> = props => {
	return (
		<>
			<STable
				id="blocksTable"
				bordered={false}
				responsive={true}
				striped={true}
				cellPadding={'1px'}
			>
				<thead>
					<tr>
						<th>Profile</th>
						<th>Moniker</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{props.whitelist.map(wle => (
						<tr key={wle.address}>
							<td>
								<Avatar address={wle.address} size={30} />
							</td>
							<td>{wle.moniker}</td>
							<td className="mono">{wle.address}</td>
						</tr>
					))}
				</tbody>
			</STable>
		</>
	);
};

export default Whitelist;
