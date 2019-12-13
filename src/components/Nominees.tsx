import React from 'react';

import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Avatar from './Figure';
import Table from '../components/Table';

import GreenUp from '../assets/green-up.png';
import RedDown from '../assets/red-down.png';

import { selectNominees } from '../selectors';

type Props = {};

const Nominees: React.FC<Props> = props => {
	const nominees = useSelector(selectNominees);

	return (
		<>
			<Table>
				<thead>
					<tr>
						<th>Nominee</th>
						<th>Votes</th>
						<th>Moniker</th>
						<th>Address</th>
					</tr>
				</thead>
				<tbody>
					{nominees.map(n => (
						<tr key={n.address}>
							<td>
								<Avatar address={n.address} size={33} />
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
							<td>
								<b>{n.moniker}</b>
							</td>
							<td className="mono">{n.address}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default Nominees;
