import React, { useEffect } from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import LOGO from '../assets/monet.svg';

import {
	fetchAll,
	selectNetwork as selectNetworkAction
} from '../modules/dashboard';
import { selectAllNetworks } from '../selectors';
import { capitalize, parseNetworkName } from '../utils';

const SNavbar = styled(Navbar)`
	box-shadow: rgba(0, 0, 0, 0.0392157) 0px 0px 1px 0px !important;
	/* border-bottom: 1px solid #f3f3f3; */
`;

const SNav = styled(Nav)`
	.nav-link {
		font-weight: 400 !important;
	}
`;

const SExplore = styled.div`
	margin-left: 10px;
`;

const SNetworkName = styled.span`
	font-weight: 600;
	color: white;
	/* text-transform: uppercase; */
	/* font-size: 15px; */
	/* letter-spacing: 2px; */
`;

const Header: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const fetchAllData = () => dispatch(fetchAll());

	const networks = useSelector(selectAllNetworks);

	useEffect(() => {
		if (networks.length) {
			dispatch(selectNetworkAction(networks[0].name));
			// fetchAllData();
		}
	}, [networks]);

	return (
		<SNavbar bg={'dark'} expand="lg" variant="dark">
			<Container fluid={true} className="">
				<Navbar.Brand>
					<span className="monet">
						<Link to={'/'}>
							<img src={LOGO} width={150} />
						</Link>
					</span>{' '}
					<SNetworkName className="ml-3">Camille V6</SNetworkName>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="basic-navbar-nav"
					className="justify-content-end"
				>
					<SNav activeKey="/">
						<Nav.Item>
							<Link to={'/downloads'}>
								<Nav.Link as="span">Downloads</Nav.Link>
							</Link>
						</Nav.Item>
						{/* <Nav.Item>
							<Nav.Link as="span">Hashgraph</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Link to={'/faucet'}>
								<Nav.Link as="span">Faucet</Nav.Link>
							</Link>
						</Nav.Item> */}
						{/* <NavDropdown title={'Camille V6'} id="nav-dropdown">
							{networks.map((n, i) => (
								<NavDropdown.Item key={`${n.name}-${i}`}>
									{parseNetworkName(n.name)}
								</NavDropdown.Item>
							))}
							<NavDropdown.Divider />
							<NavDropdown.Item eventKey="4.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown> */}
					</SNav>
					{/* <SExplore>
						<Link to={'/'}>
							<Button variant={'warning'} className="bigger">
								POA
							</Button>
						</Link>
					</SExplore> */}
					<SExplore>
						<Link to={'/explore'}>
							<Button variant={'warning'} className="bigger">
								Explore
							</Button>
						</Link>
					</SExplore>
				</Navbar.Collapse>
			</Container>
		</SNavbar>
	);
};

export default Header;
