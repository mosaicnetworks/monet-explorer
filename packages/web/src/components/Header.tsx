import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';
import {
	Button,
	Container,
	Dropdown,
	Image,
	Input,
	Menu,
	Icon
} from 'semantic-ui-react';

const SHeader = styled.div`
	position: fixed !important;
	height: 65px;
	line-height: 65px;
	color: #fff;
	box-shadow: 0 4px 20px -10px #111 !important;
	background-color: rgba(28, 63, 148, 0.95);
	z-index: 100;
	width: 100%;
`;

const SLogo = styled.div`
	float: left;
	font-size: 20px;
	margin-top: 23px;

	& a {
		color: #eee;
	}

	& a:hover {
		color: #fff;
	}
`;

const SIcon = styled(Link)`
	color: #d15222 important;
	margin-left: 20px;

	& a {
		color: #d15222 important;
	}
`;

const SSearch = styled.div`
	float: left !important;
	margin-left: 50px;

	& input {
		color: #fff !important;
		background: rgba(60, 120, 208, 0.7) !important;
		width: 400px;
	}
`;

const SNav = styled.div`
	float: right;
`;

const SSpacer = styled.div`
	height: 85px;
`;

const options = [
	{ key: 1, text: 'Choice 1', value: 1 },
	{ key: 2, text: 'Choice 2', value: 2 },
	{ key: 3, text: 'Choice 3', value: 3 }
];

const Header: React.FC<{}> = () => {
	return (
		<>
			<SHeader>
				<Container fluid={true}>
					<SLogo>
						<Link to={'/'}>
							<Image
								src={
									'https://monet.network/app/images/logo.svg'
								}
								width={160}
							/>
						</Link>
					</SLogo>
					<SSearch>
						<Input placeholder="Search..." />
					</SSearch>

					<SNav>
						<Link to={'/blocks'}>
							<Button color="orange" content={'Blocks'} />
						</Link>
						<Link to={'/network'}>
							<Button color="orange" content={'Network'} />
						</Link>
						<SIcon to={'/config'}>
							<Icon name={'cog'} content={'Settings'} />
						</SIcon>
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
			<SSpacer />
		</>
	);
};

export default Header;
