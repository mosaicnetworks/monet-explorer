import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Logo from '../assets/monet.svg';

const SNetwork = styled.div`
	color: white;
	text-transform: uppercase;
	font-size: 13px;
`;

const SNav = styled(Nav)`
	a {
		color: #ddd !important;
	}

	a:hover {
		color: white !important;
		text-decoration: none;
	}
`;

const Header: React.FC<{}> = () => {
	const scrollToggleHeight = 300;
	const [stickyHeader, setStickyHeader] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > scrollToggleHeight) {
				setStickyHeader(true);
			}

			if (window.scrollY <= scrollToggleHeight) {
				setStickyHeader(false);
			}
		});
	});

	return (
		<>
			<Navbar
				bg={'dark'}
				expand="lg"
				variant="dark"
				sticky={stickyHeader ? 'top' : undefined}
			>
				<Navbar.Brand href="/">
					<Image
						width={150}
						src={Logo}
						className="d-inline-block align-middle"
					/>
				</Navbar.Brand>
				<Navbar.Collapse id="basic-navbar-nav">
					<SNav activeKey="/">
						<Nav.Item>
							<Nav.Link href="/" eventKey="link-2">
								Dashboard
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="/blocks">Block Explorer</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link-2">Addresses</Nav.Link>
						</Nav.Item>
					</SNav>
				</Navbar.Collapse>
				<SNetwork>
					<b>Camille</b>
				</SNetwork>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
			</Navbar>
		</>
	);
};

export default Header;
