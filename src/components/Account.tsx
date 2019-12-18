import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IEVMAccount, Monet } from 'evm-lite-core';
import { useSelector } from 'react-redux';

import Media from 'react-bootstrap/Media';

import Avatar from './Avatar';

import CoreAPI from '../client';

import { selectNetwork } from '../selectors';
import { capitalize, parseBalance } from '../utils';
import { IBaseAccount } from 'evm-lite-client';
import { Currency } from 'evm-lite-utils';

type Props = {
	address: string;
};

const SAccount = styled.div`
	p {
		padding: 0;
		margin-bottom: 0;
	}
`;

const Account: React.FC<Props> = ({ address }) => {
	const n = new CoreAPI();
	const network = useSelector(selectNetwork);

	const [account, setAccount] = useState({} as IBaseAccount);

	useEffect(() => {
		if (address.length === 42 && network) {
			n.fetchAccount(address, network.name.toLowerCase())
				.then(setAccount)
				.catch(() => console.log('Something went wrong.'));
		}
	}, [address, network]);

	return (
		(Object.keys(account) && (
			<SAccount>
				<Media key={account.address}>
					<Avatar
						className="mr-3"
						address={account.address}
						size={40}
					/>
					<Media.Body>
						<b className="mono">
							{parseBalance(new Currency(account.balance))} +{' '}
							<span className="orange">100T</span>
						</b>
						<p className="mono small">{account.address}</p>
					</Media.Body>
				</Media>
			</SAccount>
		)) || <></>
	);
};

export default Account;
