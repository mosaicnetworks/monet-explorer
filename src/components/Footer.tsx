import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Background from '../assets/bg.svg';
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
		color: #f26630 !important;
		font-weight: 500 !important;
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
							Camille is a public test version of the{' '}
							<a href="https://monet.network/faq.html">
								MONET Hub
							</a>
							, which is an important part of the{' '}
							<a href="https://monet.network/about.html">
								MONET project
							</a>
							. This is a dashboard to monitor the status of the
							test network.
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
								<a href={'https://monet.network'}>Monet</a>
							</dd>
							<dd>
								<a href="https://mosaicnetworks.io">
									Mosaic Networks
								</a>
							</dd>
							<dd>
								<a href="http://docs.monet.network">
									Documentation
								</a>
							</dd>
							<dd>
								<a href="https://github.com/mosaicnetworks">
									Github
								</a>
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
						<h5>Contact</h5>
						<SLinks className="nav-list">
							<dl className="contact-list">
								<dd>
									<b>Email</b>
									<div>
										<a
											target="_top"
											href="mailto:ping@monet.network"
										>
											ping@monet.network
										</a>
									</div>
								</dd>
								<dd>
									<b>Other</b>
									<div>
										<a
											target="_blank"
											href="https://babbleio.slack.com"
										>
											Slack
										</a>
									</div>
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
