import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import LOGO from '../assets/monet.svg';

import {
	fetchAll,
	selectNetwork as selectNetworkAction
} from '../modules/dashboard';
import { selectAllNetworks, selectNetwork } from '../selectors';

import { DEV } from '../CONSTANTS';

const SNavbar = styled(Navbar)`
	box-shadow: rgba(0, 0, 0, 0.0392157) 0px 0px 1px 0px !important;

	@media (min-width: 1190px) {
		padding-left: 0 !important;
	}
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
`;

const Header: React.FC<{}> = () => {
	const dispatch = useDispatch();

	const fetchAllData = () => dispatch(fetchAll());

	const network = useSelector(selectNetwork);
	const networks = useSelector(selectAllNetworks);

	useEffect(() => {
		if (networks.length) {
			dispatch(selectNetworkAction(networks[0].name));
		}
	}, [networks]);

	let interval: any;
	const scrollToggleHeight = 10;
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

		if (!DEV) {
			interval = setInterval(() => {
				fetchAllData();
				console.log('(5s) Fetching data...');
			}, 3000);
		}

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<SNavbar bg={'dark'} expand="lg" variant="dark">
			<Container fluid={true} className="">
				<Navbar.Brand>
					<span className="monet">
						<Link to={'/'}>
							<img src={LOGO} width={150} />
						</Link>
					</span>{' '}
					<SNetworkName className="ml-3">
						{network && network.name.split('-')[0]} V
						{network && network.name.split('-')[1]}
					</SNetworkName>
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
					</SNav>
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
