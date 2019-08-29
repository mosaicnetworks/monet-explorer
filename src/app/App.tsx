import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from '../components/Wrapper';

import Explorer from '../containers/Explorer';
import Index from '../containers/Index';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Wrapper>
				<Route exact={true} path="/" component={Index} />
				<Route exact={true} path="/explorer" component={Explorer} />
			</Wrapper>
		</BrowserRouter>
	);
};

export default App;
