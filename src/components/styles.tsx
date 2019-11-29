import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

export const SContent = styled.div`
	h3 {
		font-size: 25px;
		margin-bottom: 20px;
	}

	.v-center {
		display: flex;
		align-items: center;
	}
`;

export const STable = styled(Table)`
	border-radius: 3px !important;

	th {
		padding: 10px 0 !important;
	}

	th + th {
		padding: 10px !important;
	}

	td + td {
		padding: 17px 10px !important;
	}

	td {
		padding: 17px 0 !important;
		/* padding: 15px 10px !important; */

		a {
			color: #444 !important;
			text-decoration: none !important;
		}

		a:hover {
			color: #000 !important;
		}
	}

	tfoot {
		text-align: center;
		font-weight: 700;
		border-bottom: 1px solid #EEE;
		background: #fafafa;
		font-size: 13px;

		td {
			padding: 10px 0 !important;
			border-radius: 3px !important;
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
