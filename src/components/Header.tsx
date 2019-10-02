import React from 'react';

import styled from 'styled-components';

import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

import Logo from '../assets/monet.svg';

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
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav activeKey="/home">
						<Nav.Item>
							<Nav.Link href="/home">Dashboard</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link-1">Blocks</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link-2">Transactions</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link-2">Network</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default Header;
