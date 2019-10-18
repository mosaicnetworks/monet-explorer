import React from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import { useSelector } from 'react-redux';

import Avatar from '../components/Avatar';

import { selectNominees } from '../selectors';

import GreenUp from '../assets/green-up.png';
import RedDown from '../assets/red-down.png';

const STable = styled(Table)`
	margin-bottom: 0 !important;

	td {
		font-size: 14px;
	}

	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.02);
	}
`;

const Nominees: React.FC<{}> = () => {
	const nominees = useSelector(selectNominees);

	// Polling
	// let poller: any;

	// useEffect(() => {
	// 	poller = setInterval(() => {
	// 		fetchNominees().then(() =>
	// 			console.log('(60s) Fetching Nominees...')
	// 		);
	// 	}, 60000);

	// 	return () => clearInterval(poller);
	// });

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
					{nominees.map(n => (
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
