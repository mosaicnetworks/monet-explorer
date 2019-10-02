import React from 'react';

import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const SBox = styled.div`
	background: #fff;
	margin-bottom: 20px;
`;

const Index: React.FC<{}> = () => {
	return (
		<>
			<Container fluid={true}>
				<Row>
					<Col>
						<h4>Blocks</h4>
						<SBox>
							<Table striped={true} hover={true}>
								<thead>
									<tr>
										<th>#</th>
										<th># of Tx</th>
										<th># of Sigs</th>
										<th>State Hash</th>
										<th>Peers Hash</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>Mark</td>
										<td>Otto</td>
										<td>@mdo</td>
									</tr>
								</tbody>
							</Table>
						</SBox>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Index;
