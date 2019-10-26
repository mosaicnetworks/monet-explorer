import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Background from '../assets/bg.png';
import Logo from '../assets/monet.svg';

const SFooter = styled.div`
	background: url(${Background});
	background-size: cover;
	/* background: rgba(31, 66, 146, 1); */
	color: #fff;
	/* border-top: 1px solid #333; */
	margin-top: 100px;
	box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.2) !important;

	min-height: 35vh;
	display: flex;
	align-items: center;

	@media (max-width: 575px) {
		padding: 50px 20px;
	}

	.brand {
		margin-bottom: 20px !important;
	}

	a {
		color: #fff !important;
	}
`;

const SLinks = styled.ul`
	list-style: none !important;
	text-indent: none !important;
	padding: 0 !important;
`;

const Footer: React.FC<{}> = props => {
	return (
		<SFooter>
			<Container>
				<Row>
					<Col xs={12} md={4} xl={5}>
						<a className="brand" href="index.html">
							<Image src={Logo} width={200} />
						</a>
						<br />
						<br />
						<p>
							MONET is an open network architecture for mobile
							blockchains on demand.
						</p>
						<p className="rights">
							{/* <span>© </span> */}
							{/* <b className="copyright-year"></b>{' '} */}
							<b>Monet Explorer</b>
							{/* <span>. </span> */}
							{/* <b>All Rights Reserved.</b> */}
						</p>
					</Col>
					<Col md={3}>
						<h5>Links</h5>
						<dl className="contact-list">
							<dd>
								<Link to={'/blocks'}>Blocks</Link>
							</dd>
							<dd>
								<Link to="/history">Validator History</Link>
							</dd>
							<dd>
								<Link to="/faucet">Faucet</Link>
							</dd>
						</dl>
						{/* <dl className="contact-list">
							<dt>Telegram:</dt>
							<dd>
								<a href="mailto:#">info@appmaven.io</a>
							</dd>
						</dl> */}
					</Col>
					<Col md={4} xl={3}>
						<h5>Github Links</h5>
						<SLinks className="nav-list">
							<dl className="contact-list">
								<dd>
									<a
										target="_blank"
										href="https://github.com/mosaicnetworks/monetd"
									>
										Monetd
									</a>
								</dd>
								<dd>
									<a
										target="_blank"
										href="https://github.com/mosaicnetworks/monetcli"
									>
										MonetCLI
									</a>
								</dd>
							</dl>
						</SLinks>
					</Col>
				</Row>
			</Container>
		</SFooter>
	);
};

export default Footer;
