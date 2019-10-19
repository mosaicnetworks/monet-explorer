import React, { useState } from 'react';

import utils from 'evm-lite-utils';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import ExplorerAPIClient from '../client';

const SError = styled.div`
	color: red;
`;

const SSuccess = styled.div`
	color: darkgreen;
	font-size: 35px;
	text-align: center;
`;

const Faucet: React.FC<{}> = () => {
	const c = new ExplorerAPIClient();

	const [loading, setLoading] = useState(false);
	const [recaptcha, setRecaptcha] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [address, setAddress] = useState('');

	function onChange() {
		setRecaptcha(true);
	}

	const onSubmit = async () => {
		setError('');
		setLoading(true);

		if (utils.cleanAddress(address).length !== 42) {
			setError('Invalid address');
			setLoading(false);
			return;
		}

		if (recaptcha) {
			const data = await c.submitFaucetTx(address);

			if (data.status === 1) {
				setSuccess(`We've transferred you 100 Tenom!`);
			} else {
				setError('Something went wrong. Please try again later.');
			}
		} else {
			setError('Must complete the ReCAPTCHA!');
		}

		setLoading(false);
	};

	return (
		<Form>
			{success.length ? (
				<Form.Group>
					<SSuccess>{success}</SSuccess>
				</Form.Group>
			) : (
				<>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Address</Form.Label>
						<Form.Control
							onChange={(e: any) => setAddress(e.target.value)}
							type="text"
							placeholder="0xbca3ec820659ff257c0cc134bce65b2c429017d9"
						/>
					</Form.Group>
					<Form.Group>
						<ReCAPTCHA
							type="image"
							onChange={onChange}
							theme={'light'}
							sitekey="6LdoMh4UAAAAAMSK7FUAUtfmkkLuLfyjC-5mxuNE"
						/>
					</Form.Group>
					<Form.Group>
						<SError>{error}</SError>
					</Form.Group>

					<Form.Group>
						<Button
							disabled={loading}
							onClick={onSubmit}
							variant="warning"
						>
							Receive Tokens
						</Button>
					</Form.Group>
				</>
			)}
		</Form>
	);
};

export default Faucet;
