import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import FaucetComponent from '../components/Faucet';

import { SContent } from '../components/styles';

const Faucet: React.FC<{}> = props => {
	return (
		<>
			<Container>
				<SContent>
					<span>Faucet</span>
					<Row>
						<Col>
							<div className="padding">
								If you are interested in participating in our
								testnet, use the form to receive 100T (Tenom) to
								your address. You can find libraries and tools
								on our{' '}
								<a href="https://github.com/mosaicnetworks">
									GitHub
								</a>
								. If you do not have an address yet, you can
								easily create one using{' '}
								<a href="https://github.com/mosaicnetworks/monetcli">
									MonetCLI
								</a>
								.
								<br />
								<br />
								<FaucetComponent />
							</div>
						</Col>
						<Col className="d-none d-sm-block text-center" md={4}>
							<div className="padding">
								<Image
									src="https://monet.network/app/images/illustrations/pages/token_sale.svg"
									width={180}
								/>
							</div>
						</Col>
					</Row>
				</SContent>
			</Container>
		</>
	);
};

export default Faucet;
