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

import {
	fetchAll,
	selectNetwork as selectNetworkAction
} from '../modules/dashboard';
import {
	selectAllNetworks,
	selectNetwork,
	selectShowFaucetAlert
} from '../selectors';

import Logo from '../assets/monet2.png';

const SNavbar = styled(Navbar)`
	transition: background 0.2s cubic-bezier(1, 1, 1, 1);
	${props =>
		props.theme.enable &&
		`box-shadow: 0 1px 50px rgba(151, 164, 175, 0.3) !important;`}

	${props =>
		!props.theme.enable && `border-bottom: 1px solid #f3f3f3;`}


	#dropdownn {
		color: #333 !important;
	}

	.c {
		font-family: monospace !important;
		color: #333 !important;
	}
`;

const SNetwork = styled.div`
	color: #000;
	text-transform: capitalize;
	font-weight: 300 !important;
	font-size: 18px;

	small {
		text-transform: none !important;
	}
`;

const SNav = styled(Nav)`
	.nav-link a {
		color: #666 !important;
		font-weight: 500 !important;
	}
	.nav-link {
		color: #222 !important;
	}

	.nav-link a:hover {
		color: #000 !important;
		text-decoration: none;
	}
`;

const SSearch = styled.div`
	margin-left: 10px;

	@media (max-width: 575px) {
		margin-left: 0;
		width: auto !important;
		margin: 10px 0;
	}

	& input {
		font-size: 14px;
		border: none !important;
		color: #222 !important;
		background: rgba(60, 120, 208, 0.1) !important;
	}

	& input::placeholder {
		color: #666;
	}
`;

const SBrand = styled(Navbar.Brand)`
	a {
		color: #000 !important;
	}

	a:hover {
		text-decoration: none !important;
	}
`;

const Header: React.FC<{}> = () => {
	const dispatch = useDispatch();

	const scrollToggleHeight = 0;
	const [stickyHeader, setStickyHeader] = useState(false);

	const [search, setSearch] = useState('');

	const networks = useSelector(selectAllNetworks);
	const selected = useSelector(selectNetwork);
	const showFaucet = useSelector(selectShowFaucetAlert);

	const fetchAllData = () => dispatch(fetchAll());

	let interval: any;

	useEffect(() => {
		// interval = setInterval(() => {
		// 	fetchAllData();
		// 	console.log('(5s) Fetching data...');
		// }, 5000);

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
		};
	}, []);

	useEffect(() => {
		if (networks.length) {
			dispatch(selectNetworkAction(networks[0].name));
		}
	}, [networks]);

	const theme = {
		enable: stickyHeader
	};

	return (
		<ThemeProvider theme={theme}>
			<SNavbar
				bg={'light'}
				expand="lg"
				variant="light"
				className="justify-content-between"
				sticky={stickyHeader ? 'top' : undefined}
			>
				<Container>
					<SBrand>
						<Link to={'/'}>
							<span className="monetfont">Monet</span>{' '}
							{/* <span className="monetfont2 ">Testnet</span> */}
							{/* <span className="monetfont">Explorer</span> */}
						</Link>
					</SBrand>
					<SNetwork>
						<b>
							{selected && selected.name.split('-')[0]} v
							{selected && selected.name.split('-')[1]}
						</b>
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
									<Link to={'/blocks'}>Blocks</Link>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link as="span">
									<Link to={'/downloads'}>Downloads</Link>
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
						{!showFaucet && (
							<Nav.Item>
								<Nav.Link as="span" eventKey="link-2">
									<Link to={'/faucet'}>
										<Image
											src={
												'https://monet.network/app/images/products/tenom.svg'
											}
											width={30}
										/>
									</Link>
								</Nav.Link>
							</Nav.Item>
						)}
					</Navbar.Collapse>
				</Container>
			</SNavbar>
		</ThemeProvider>
	);
};

export default Header;
