import styled from 'styled-components';

export const SContent = styled.div`
	background: #fff !important;
	border-radius: 5px !important;
	margin-bottom: 30px !important;
	box-shadow: 0 1px 20px rgba(31, 66, 146, 0.07);
	border: 1px solid #f3f3f3 !important;
	word-wrap: break-word !important;

	span {
		background: #f9f9f9 !important;
		display: block;
		border-radius: inherit !important;
		padding: 10px 10px;
		font-size: 0.8125rem;
		font-weight: 600;
		margin-bottom: 0;
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
		border-bottom: 1px solid #eee !important;
	}

	div {
		/* overflow: auto !important; */
	}

	div.padding {
		padding: 10px !important;
	}
`;
