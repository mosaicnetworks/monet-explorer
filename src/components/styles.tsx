import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

export const SContent = styled.div`
	div.padding {
		border-radius: 5px !important;
		margin-bottom: 30px !important;
		border: 1px solid #eee !important;
		word-wrap: break-word !important;
	}

	table {
		background: white;
	}

	h3 {
		margin-bottom: 30px;
	}
`;

export const STable = styled(Table)`
	font-size: 15px;

	td {
		a {
			color: #444 !important;
			text-decoration: none !important;
		}

		a:hover {
			color: #000 !important;
		}
	}
`;

export const SJumbotron = styled.div`
	padding: 30px 0px !important;
	background: var(--blue) !important;
	background-size: cover;
	color: white !important;
	border: none !important;
	box-shadow: none !important;
	margin-bottom: 0px !important;
	border-radius: 0 !important;

	.alert-heading {
		margin-top: 0px !important;
	}

	& input {
		font-size: 14px;
		border: none !important;
		color: #fff !important;
		background: rgba(60, 120, 208, 0.3) !important;
	}

	& input::placeholder {
		color: #888;
	}

	a {
		color: #f26630 !important;
		font-weight: bold;
	}
`;

export const SSection = styled.div`
	margin-top: 50px;
`;
