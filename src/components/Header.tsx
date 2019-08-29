import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';

const SHeader = styled.div`
	height: 65px;
	line-height: 65px;
	color: #fff;
	box-shadow: 0 4px 20px -20px #111 !important;
	background-color: rgba(28, 63, 148, 1);
	margin-bottom: 40px;
`;

const SLogo = styled.div`
	float: left;
	font-size: 20px;

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
const Header: React.FC<{}> = () => {
	return (
		<SHeader>
			<Container fluid={true}>
				<SLogo>
					<Link to={'/'}>Monet Explorer</Link>
				</SLogo>
				<SNav>
					<Link to={'/explorer'}>
						<Button color={'orange'} content={'Network'} />
					</Link>
				</SNav>
			</Container>
		</SHeader>
	);
};

export default Header;
