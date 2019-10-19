import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

import { fetchAll, selectNetwork } from '../modules/dashboard';
import { networksSelector, selectedNetwork } from '../selectors';

import Logo from '../assets/monet.svg';

const SNavbar = styled(Navbar)`
	${props =>
		props.theme.enable &&
		`box-shadow: 0 1px 50px rgba(151, 164, 175, 2) !important;`}

	#dropdownn {
		color: #ddd !important;
	}

	.c {
		font-family: monospace !important;
		color: white !important;
	}
`;

const SNetwork = styled.div`
	color: white;
	text-transform: capitalize;
	font-weight: 300 !important;
	font-size: 18px;
`;

const SNav = styled(Nav)`
	.nav-link a {
		color: #ddd !important;
	}
	.nav-link {
		color: #ddd !important;
	}

	.nav-link a:hover {
		color: white !important;
		text-decoration: none;
	}
`;

const SSearch = styled.div`
	margin-right: 20px;
	margin-left: 10px;

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
	const [counter, setCounter] = useState(5);

	const networks = useSelector(networksSelector);
	const selected = useSelector(selectedNetwork);

	const fetchAllData = () => dispatch(fetchAll());

	let interval: any;
	let counterInterval: any;

	useEffect(() => {
		// interval = setInterval(() => {
		// 	fetchAllData();
		// 	console.log('(5s) Fetching data...');
		// }, 5000);

		counterInterval = setInterval(() => {
			setCounter(c => {
				if (c <= 0) {
					return 5;
				} else {
					return c - 1;
				}
			});
		}, 1000);

		window.addEventListener('scroll', () => {
			if (window.scrollY > scrollToggleHeight) {
				setStickyHeader(true);
			}

			if (window.scrollY <= scrollToggleHeight) {
				setStickyHeader(false);
			}
		});

		return () => {
			clearInterval(interval);
			clearInterval(counterInterval);
		};
	}, []);

	useEffect(() => {
		if (networks.length) {
			dispatch(selectNetwork(networks[0].id));
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
					<Navbar.Brand as="span">
						<Link to={'/'}>
							<Image
								width={140}
								src={Logo}
								className="d-inline-block align-middle"
							/>
						</Link>
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
								<Nav.Link as="span" eventKey="link-2">
									<Link to={'/'}>Dashboard</Link>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link as="span">
									<Link to={'/blocks'}>Block Explorer</Link>
								</Nav.Link>
							</Nav.Item>
							{/* <NavDropdown title="Networks" id="dropdownn">
								{networks.map(n => (
									<NavDropdown.Item
										onClick={onClickNetworkBind(n.id)}
										key={n.id}
										href="#"
									>
										{n.name}
									</NavDropdown.Item>
								))}
							</NavDropdown> */}
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
						<span className="c" id="5">
							{counter}
						</span>
					</Navbar.Collapse>
				</Container>
			</SNavbar>
		</ThemeProvider>
	);
};

export default Header;
