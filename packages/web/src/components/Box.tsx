import React from 'react';

import styled, { ThemeProvider } from 'styled-components';

const SBox = styled.div`
	background: #fff;
	color: #111;
	margin-bottom: 20px;
	border: none !important;
	/* box-shadow: 0 4px 20px -18px #111 !important; */
`;

const SHeading = styled.div`
	background: rgba(31, 66, 146, 0.9) !important;
	padding: 10px 20px;
	font-size: 15px;
	color: #fff !important;
	& span {
		padding-left: 15px;
		font-size: 11px;
	}
`;

const SContent = styled.div`
	padding: ${props => props.theme.padding};
`;

interface IProps {
	heading: string;
	extra?: string;
	padding: boolean;
}

const Login: React.FC<IProps> = props => {
	const theme = {
		padding: props.padding ? '20px' : '0'
	};

	return (
		<ThemeProvider theme={theme}>
			<SBox>
				<SHeading>
					{props.heading}
					<span>{props.extra}</span>
				</SHeading>
				<SContent>{props.children}</SContent>
			</SBox>
		</ThemeProvider>
	);
};

export default Login;
