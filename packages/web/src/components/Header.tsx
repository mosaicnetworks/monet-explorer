import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const SHeader = styled.div`
	height: 65px;
	line-height: 65px;
	color: #fff;
	box-shadow: 0 4px 20px -20px #111 !important;
	background-color: rgba(28, 63, 148, 1);
	margin-bottom: 20px;
`;

const SLogo = styled.div`
	float: left;
	font-size: 20px;
	margin-top: 25px;

	& a {
		color: #eee;
	}

	& a:hover {
		color: #fff;
	}
`;

const SNav = styled.div`
	float: right;
`;

const options = [
	{ key: 1, text: 'Choice 1', value: 1 },
	{ key: 2, text: 'Choice 2', value: 2 },
	{ key: 3, text: 'Choice 3', value: 3 }
];

const Header: React.FC<{}> = () => {
	return (
		<SHeader>
			<Container fluid={true}>
				<SLogo>
					<Link to={'/'}>
						<Image
							src={'https://monet.network/app/images/logo.svg'}
							width={160}
						/>
					</Link>
				</SLogo>
				<SNav>
					{/* <Menu
						compact={true}
						color={'orange'}
						style={{ color: '#FFF !important' }}
					>
						<Dropdown
							text="Networks"
							options={options}
							item={true}
						/>
					</Menu> */}
				</SNav>
			</Container>
		</SHeader>
	);
};

export default Header;
