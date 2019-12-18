import React from 'react';

import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

import ScrollTop from './utils/ScrollTop';

const SWrapper = styled.div`
	min-height: 100vh;
`;

const Wrapper: React.FC<{}> = props => {
	return (
		<>
			<ScrollTop />
			<Header />
			<SWrapper>{props.children}</SWrapper>
			<Footer />
		</>
	);
};

export default Wrapper;
