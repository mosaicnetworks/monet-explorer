import React from 'react';

import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

// scroll to top after react-dom Link
import Top from './utils/Top';

const SWrapper = styled.div`
	min-height: 90vh;
`;

const Wrapper: React.FC<{}> = props => {
	return (
		<>
			<Top />
			<SWrapper>
				<Header />
				{props.children}
			</SWrapper>
			<Footer />
		</>
	);
};

export default Wrapper;
