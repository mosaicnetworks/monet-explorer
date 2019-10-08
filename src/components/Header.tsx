import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import Logo from '../assets/monet.svg';

const SNavbar = styled(Navbar)`
	transition: background 0.3s cubic-bezier(1, 1, 1, 1);
`;

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

const SSearch = styled.div`
	margin-left: 20px;

	@media (max-width: 575px) {
		margin-left: 0;
		width: auto !important;
		margin: 10px 0;
	}

	& input {
		font-size: 14px;
		border: none !important;
		color: #fff !important;
		background: rgba(60, 120, 208, 0.7) !important;
	}

	& input::placeholder {
		color: #fff;
	}
`;

const Header: React.FC<{}> = () => {
	const scrollToggleHeight = 300;
	const [stickyHeader, setStickyHeader] = useState(false);

	const [search, setSearch] = useState('');

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

	const handleSearchKeyPress = (e: any) => {
		console.log(e);
		if (e.charCode === 13) {
			alert('hello');
		}
	};

	return (
		<>
			<SNavbar
				bg={'dark'}
				expand="lg"
				variant="dark"
				className="justify-content-between"
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
						{/* <Nav.Item>
							<Nav.Link eventKey="link-2">Addresses</Nav.Link>
						</Nav.Item> */}
					</SNav>
					<SSearch className="justify-content-end">
						<Form.Control
							type="text"
							placeholder="Search"
							onChange={(e: any) => setSearch(e.target.value)}
							onKeyDown={(ev: any) => {
								if (ev.key === 'Enter') {
									window.location.href = '/search/' + search;
									ev.preventDefault();
								}
							}}
							className="mr-sm-2"
						/>
					</SSearch>
				</Navbar.Collapse>
				<SNetwork>
					<b>Camille</b>
				</SNetwork>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
			</SNavbar>
		</>
	);
};

export default Header;
