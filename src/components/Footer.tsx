import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Background from '../assets/bg.svg';
import Logo from '../assets/monet.svg';

import Section, { Grid, Q } from '../ui';

const SFooter = styled.div`
	background: var(--blue);
	background-size: cover;
	color: #fff;
	/* border-top: 1px solid #333; */
	margin-top: 100px;
	box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.2) !important;

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
			<Section>
				<Grid fluid={true}>
					<Q pos={[1, 1]} md={4}>
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
					</Q>
					<Q pos={[1, 2]} md={3}>
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
					</Q>
					<Q pos={[1, 3]} md={3}>
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
					</Q>
					<Q pos={[1, 4]} md={2}>
						<img
							width={160}
							src="https://monet.network/app/images/products/tenom.svg"
						/>
					</Q>
				</Grid>
			</Section>
		</SFooter>
	);
};

export default Footer;
