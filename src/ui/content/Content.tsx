import React from 'react';

import styled from 'styled-components';

const SContent = styled.div`
	margin-bottom: 50px;

	@media (max-width: 575px) {
		margin-bottom: 30px;
	}
`;

const Content: React.FC<{}> = props => {
	return <SContent>{props.children}</SContent>;
};

export default Content;
