import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled, { ThemeProvider } from 'styled-components';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Store } from '../store';

import { Network } from '../client';
import { fetchNetworks, selectNetwork } from '../modules/dashboard';
import { networksSelector, selectedNetwork } from '../selectors';

import Logo from '../assets/monet.svg';

const SNavbar = styled(Navbar)`
	transition: background 0.3s cubic-bezier(1, 1, 1, 1);

	${props =>
		props.theme.enable &&
		`box-shadow: 0 1px 50px rgba(151, 164, 175, 1) !important;`}
`;

const SNetwork = styled.div`
	color: white;
	text-transform: capitalize;
	font-weight: 300 !important;
	font-size: 18px;
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
	const dispatch = useDispatch();

	const scrollToggleHeight = 0;
	const [stickyHeader, setStickyHeader] = useState(false);

	const [search, setSearch] = useState('');

	const networks = useSelector(networksSelector);
	const selected = useSelector(selectedNetwork);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > scrollToggleHeight) {
				setStickyHeader(true);
			}

			if (window.scrollY <= scrollToggleHeight) {
				setStickyHeader(false);
			}
		});
	}, []);

	useEffect(() => {
		if (networks.length) {
			const camille = networks[0];
			dispatch(selectNetwork(camille.id));
		}
	}, [networks]);

	const theme = {
		enable: stickyHeader
	};

	return (
		<ThemeProvider theme={theme}>
			<SNavbar
				bg={'dark'}
				expand="lg"
				variant="dark"
				className="justify-content-between"
				sticky={stickyHeader ? 'top' : undefined}
			>
				<Container>
					<Navbar.Brand href="/">
						<Image
							width={140}
							src={Logo}
							className="d-inline-block align-middle"
						/>
					</Navbar.Brand>
					<SNetwork>
						<b>{selected && selected.name}</b>
					</SNetwork>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end"
					>
						<SNav activeKey="/">
							<Nav.Item>
								<Nav.Link href="/faucet">Get Tokens!</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href="/" eventKey="link-2">
									Dashboard
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href="/blocks">
									Block Explorer
								</Nav.Link>
							</Nav.Item>
						</SNav>
						<SSearch className="justify-content-end">
							<Form.Control
								type="text"
								placeholder="Search"
								onChange={(e: any) => setSearch(e.target.value)}
								onKeyDown={(ev: any) => {
									if (ev.key === 'Enter') {
										window.location.href =
											'/search/' + search;
										ev.preventDefault();
									}
								}}
								className="mr-sm-2"
							/>
						</SSearch>
					</Navbar.Collapse>
				</Container>
			</SNavbar>
		</ThemeProvider>
	);
};

export default Header;
