import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import { SContent } from '../components/styles';

const Faucet: React.FC<{}> = props => {
	return (
		<Container>
			<SContent>
				<span>Request Tokens</span>
				<p>
					<Form>
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>Your Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="0xbca3ec820659ff257c0cc134bce65b2c429017d9"
							/>
						</Form.Group>
						{/* <Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>
								What is your intended use of the tokens?
							</Form.Label>
							<Form.Control
								placeholder="Just testing"
								as="textarea"
								rows="3"
							/>
						</Form.Group> */}
						<Form.Group>
							<Button variant="warning">Receive Tokens</Button>
						</Form.Group>
					</Form>
				</p>
			</SContent>
		</Container>
	);
};

export default Faucet;
