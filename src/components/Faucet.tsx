import React, { useCallback, useEffect, useState } from 'react';

import utils from 'evm-lite-utils';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Account from './Account';

import Loader from './utils/Loader';

import CoreAPI from '../client';

const SError = styled.div`
	color: var(--light-orange);
	display: inline-block;
	font-weight: 600;
`;

const SSuccess = styled.div`
	color: white;
	font-size: 35px;
	text-align: center;
`;

const Faucet: React.FC<{}> = () => {
	const c = new CoreAPI();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [address, setAddress] = useState('');

	const onSubmit = useCallback(async () => {
		setError('');
		setLoading(true);

		if (utils.cleanAddress(address).length !== 42) {
			setError('Monet addresses are 42 characters long (inc 0x)');
			setLoading(false);

			return;
		}

		try {
			const data = await c.submitFaucetTx(utils.cleanAddress(address));

			if (data.success) {
				setSuccess(`We've transferred you 100 Tenom!`);
			} else {
				setError('Something went wrong. Please try again later.');
			}
		} catch (e) {
			setError(e.toString());
		}

		setLoading(false);
	}, [address]);

	useEffect(() => {
		if (address.length === 0) {
			setError('');
		}

		if (address.length > 0 && utils.cleanAddress(address).length !== 42) {
			setError('Monet addresses are 42 characters long (inc 0x)');
		}
	}, [address]);

	return (
		<>
			{!error && <div className="preheader">Faucet</div>}
			{error && <SError className="mb-4">{error}</SError>}
			{<Account address={address} />}

			{address.length === 42 && (
				<div className="mt-4 mb-4">
					{!success && (
						<a href="#" onClick={(e: any) => setAddress('')}>
							Change Account
						</a>
					)}
					{!success && (
						<p className="no-padding">
							Make sure the above account is correct!
						</p>
					)}
				</div>
			)}

			{success && <SSuccess className="preheader">{success}</SSuccess>}

			{!success && (
				<Form>
					{address.length !== 42 && (
						<Form.Group
							className="pr-md-5"
							controlId="exampleForm.ControlInput1"
						>
							<Form.Control
								onChange={(e: any) =>
									setAddress(e.target.value)
								}
								type="text"
								placeholder="Enter your address"
							/>
						</Form.Group>
					)}
					<Form.Group>
						<Button
							disabled={loading}
							variant="warning"
							className="bigger"
							onClick={onSubmit}
						>
							Receive Tokens
						</Button>{' '}
						<Loader loading={loading} />
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default Faucet;
