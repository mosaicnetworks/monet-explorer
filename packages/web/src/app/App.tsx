import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from '../components/Wrapper';

import Block from '../containers/Block';
import Index from '../containers/Index';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Wrapper>
				<Route exact={true} path="/" component={Index} />
				<Route exact={true} path="/block/:block" component={Block} />
			</Wrapper>
		</BrowserRouter>
	);
};

export default App;
