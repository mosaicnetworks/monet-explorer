import React from 'react';

import styled from 'styled-components';

const SBody = styled.div`
	padding: 20px;
	display: block;
	border: 1px solid #eee;
	background: var(--light-grey);
	border-radius: 3px;

	p {
		margin-bottom: 0;
	}
`;

type Props = {
	className?: string;
};

const Body: React.FC<Props> = props => {
	return <SBody className={props.className}>{props.children}</SBody>;
};

export default Body;
