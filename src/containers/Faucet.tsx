import React from 'react';

import Container from 'react-bootstrap/Container';

import FaucetComponent from '../components/Faucet';

import { SContent } from '../components/styles';

const Faucet: React.FC<{}> = props => {
	return (
		<>
			<Container>
				<SContent>
					<span>Faucet</span>
					<p>
						If you are interested in participating in our testnet,
						use the form to receive 100T (Tenom) to your address.
						You can find libraries and tools on our{' '}
						<a href="https://github.com/mosaicnetworks">GitHub</a>.
						If you do not have an address yet, you can easily create
						one using{' '}
						<a href="https://github.com/mosaicnetworks/monetcli">
							MonetCLI
						</a>
						.
						<br />
						<br />
						<FaucetComponent />
					</p>
				</SContent>
			</Container>
		</>
	);
};

export default Faucet;
