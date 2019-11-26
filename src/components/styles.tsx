import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

export const SContent = styled.div`
	.padding {
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
