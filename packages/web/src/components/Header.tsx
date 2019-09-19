import React from 'react';

import styled from 'styled-components';

import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

const Header: React.FC<{}> = () => {
	return (
		<>
			<Navbar bg="dark" variant="dark" sticky={'top'}>
				<Navbar.Brand href="#home">
					<img
						width={160}
						src={'https://monet.network/app/images/logo.svg'}
						className="d-inline-block align-middle"
					/>
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						Network: <a href="#login">Mainnet</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default Header;
