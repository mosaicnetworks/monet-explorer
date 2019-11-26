import React from 'react';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';

import { NomineeEntry } from '../client';
import { STable } from '../components/styles';

import GreenUp from '../assets/green-up.png';
import RedDown from '../assets/red-down.png';

type Props = {
	nominees: NomineeEntry[];
};

const Nominees: React.FC<Props> = props => {
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
						<th>Votes</th>
						<th>Moniker</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{props.nominees.map(n => (
						<tr key={n.address}>
							<td>
								<Avatar address={n.address} size={30} />
							</td>
							<td style={{ padding: '0 !important' }}>
								<Row noGutters={true}>
									<Col md={6}>
										<Image width={10} src={GreenUp} />
										{n.upVotes}
									</Col>
									<Col md={6}>
										<Image width={10} src={RedDown} />
										{n.downVotes}
									</Col>
								</Row>
							</td>
							<td>{n.moniker}</td>
							<td className="mono">{n.address}</td>
						</tr>
					))}
				</tbody>
			</STable>
		</>
	);
};

export default Nominees;
