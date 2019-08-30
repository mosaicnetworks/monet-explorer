import React from 'react';

import styled from 'styled-components';

const SBox = styled.div`
	background: #fff;
	color: #111;
	margin-bottom: 20px;
	box-shadow: 0 4px 20px -18px #111 !important;
`;

const SHeading = styled.div`
	background: rgba(28, 63, 148, 0.9);
	padding: 10px 20px;
	font-size: 15px;
	color: #fff !important;

	& span {
		padding-left: 15px;
		font-size: 11px;
	}
`;

const SContent = styled.div`
	padding: 20px;
`;

interface IProps {
	heading: string;
	extra?: string;
}

const Login: React.FC<IProps> = props => {
	return (
		<SBox>
			<SHeading>
				{props.heading}
				<span>{props.extra}</span>
			</SHeading>
			<SContent>{props.children}</SContent>
		</SBox>
	);
};

export default Login;
