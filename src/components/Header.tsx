import React from 'react';

import styled from 'styled-components';

import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';

import Logo from '../assets/monet.svg';

const SNetwork = styled.div`
	color: white;

	b {
		letter-spacing: -1px;
	}
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
	return (
		<>
			<Navbar bg="dark" expand="lg" variant="dark" sticky={'top'}>
				<Navbar.Brand href="#home">
					<Image
						width={150}
						src={Logo}
						className="d-inline-block align-middle"
					/>
				</Navbar.Brand>
				<Navbar.Collapse id="basic-navbar-nav">
					<SNav activeKey="/">
						<Nav.Item>
							<Nav.Link eventKey="link-2">
								<Link to={'/'}>Network</Link>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link>
								<Link to={'/blocks'}>Blocks</Link>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link-2">Transactions</Nav.Link>
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
