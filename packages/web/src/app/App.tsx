import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from '../components/Wrapper';

import Block from '../containers/Block';
import Blocks from '../containers/Blocks';
import Index from '../containers/Index';
import Validators from '../containers/Validators';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Wrapper>
				<Route exact={true} path="/" component={Index} />
				<Route exact={true} path="/blocks" component={Blocks} />
				<Route exact={true} path="/blocks/:block" component={Block} />
				<Route exact={true} path="/validators" component={Validators} />
			</Wrapper>
		</BrowserRouter>
	);
};

export default App;
