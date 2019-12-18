import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IEVMAccount, Monet } from 'evm-lite-core';
import { useSelector } from 'react-redux';

import Media from 'react-bootstrap/Media';

import Avatar from './Avatar';

import { selectNetwork } from '../selectors';
import { capitalize, parseBalance } from '../utils';

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
	const network = useSelector(selectNetwork);

	const [account, setAccount] = useState({} as IEVMAccount);

	useEffect(() => {
		if (address.length === 42 && network) {
			const n = new Monet(network.host, 8080);

			n.getAccount(address)
				.then(setAccount)
				.catch(() => console.log('Something went wrong.'));
		}
	}, [address, network]);

	return (
		(Object.keys(account).length > 0 && (
			<SAccount>
				<Media key={account.address}>
					<Avatar className="mr-3" address={address} size={40} />
					<Media.Body>
						<b className="mono">
							{parseBalance(account.balance)} +{' '}
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
